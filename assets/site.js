





 

(function () {
  'use strict';

  var MAIL = 'fotriva@yandex.ru';
  
 
  var RUSTORE_URL = '';
  
 
  var APK_PATH = 'downloads/FOTRIVA-1.1.19.apk';
  
 
  var VERSIONS_URL = 'downloads/versions.json';

   

  function initMenu() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900 && nav.classList.contains('open')) setOpen(false);
    });
  }

   

  function initDemoButtons() {
    var buttons = document.querySelectorAll('[data-demo]');
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener('click', function () {
        var action = btn.getAttribute('data-demo');
        if (!window.FotrivaDemo) return;
        if (action === 'clients') window.FotrivaDemo.goTo('clients');
        if (action === 'search') window.FotrivaDemo.openSearch();
        if (action === 'analytics') window.FotrivaDemo.goTo('analytics');
        if (action === 'shoots') window.FotrivaDemo.goTo('shoots');
        if (action === 'calendar') window.FotrivaDemo.calendar();
        if (action === 'tax') window.FotrivaDemo.tax();
        if (action === 'new') window.FotrivaDemo.newProject();
        if (action === 'theme') {
          var night = document.documentElement.getAttribute('data-theme') === 'night';
          window.FotrivaDemo.setTheme(night ? 'day' : 'night');
          return;
        }
        var phone = document.getElementById('fotriva-app');
        if (phone && window.matchMedia('(max-width: 959px)').matches) {
          phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

   

  function initBuyForm() {
    var form = document.getElementById('buy-form');
    if (!form) return;

    var status = document.getElementById('buy-form-status');
    var mailto = form.getAttribute('data-mailto') || MAIL;
    var endpoint = (form.getAttribute('data-endpoint') || '').trim();

    
 
    if (endpoint) {
      var lead = form.querySelector('.buy-form-lead');
      if (lead) {
        lead.innerHTML = 'Заполните поля — заявка уйдёт прямо на '
          + '<a class="mail" href="mailto:' + mailto + '">' + mailto + '</a>. '
          + 'Почтовый клиент не нужен: письмо придёт сразу после отправки.';
      }
    }

    function letter(name, email, comment) {
      var lines = [
        'Здравствуйте!',
        '',
        'Хочу купить ключ FOTRIVA Pro (разовая оплата — навсегда).',
        '',
        'Имя: ' + name,
        'E-mail для ключа: ' + email
      ];
      if (comment) lines.push('', 'Комментарий: ' + comment);
      return lines.join('\n') + '\n';
    }

    function mailtoHref(name, email, comment) {
      return 'mailto:' + mailto
        + '?subject=' + encodeURIComponent('Покупка FOTRIVA Pro')
        + '&body=' + encodeURIComponent(letter(name, email, comment));
    }

    function manualBlock(name, email, comment) {
      return '<details class="form-manual"><summary>Скопировать письмо вручную</summary>'
        + '<textarea class="form-letter" readonly rows="7" aria-label="Текст письма"></textarea>'
        + '<a class="form-letter-mail" href="' + mailtoHref(name, email, comment) + '">Открыть почту на ' + mailto + '</a>'
        + '</details>';
    }

    function fail(name, email, comment, reason) {
      if (!status) return;
      status.className = 'form-status warn';
      status.innerHTML = reason + ' Отправьте письмо сами на <a href="mailto:' + mailto + '">' + mailto + '</a>:'
        + manualBlock(name, email, comment);
      var ta = status.querySelector('.form-letter');
      if (ta) ta.value = letter(name, email, comment);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.elements['name'].value.trim();
      var email = form.elements['email'].value.trim();
      var comment = form.elements['comment'].value.trim();

      if (!name) {
        if (status) { status.className = 'form-status warn'; status.textContent = 'Напишите, как к вам обращаться.'; }
        form.elements['name'].focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        if (status) { status.className = 'form-status warn'; status.textContent = 'Проверьте e-mail — на него придёт ключ.'; }
        form.elements['email'].focus();
        return;
      }

      if (!endpoint) {
        
 
        if (status) {
          status.className = 'form-status';
          status.innerHTML = 'Открываем почтовый клиент…' + manualBlock(name, email, comment);
          var ta = status.querySelector('.form-letter');
          if (ta) ta.value = letter(name, email, comment);
        }
        window.location.href = mailtoHref(name, email, comment);
        return;
      }

      if (status) { status.className = 'form-status'; status.textContent = 'Отправляем заявку…'; }

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          subject: 'Покупка FOTRIVA Pro',
          name: name,
          email: email,
          comment: comment,
          _subject: 'Покупка FOTRIVA Pro',
          _reply_to: email
        })
      })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json().catch(function () { return {}; });
        })
        .then(function () {
          if (status) {
            status.className = 'form-status ok';
            status.textContent = 'Заявка отправлена — ответим на ' + email + '.';
          }
          form.reset();
        })
        .catch(function (err) {
          fail(name, email, comment, 'Автоотправка не сработала (' + err.message + ').');
        });
    });
  }

   

  function initDownload() {
    var btn = document.getElementById('apk-btn');
    var rustore = document.getElementById('rustore-btn');
    var status = document.getElementById('apk-status');
    if (!status) return;

    if (rustore) {
      if (RUSTORE_URL) {
        rustore.href = RUSTORE_URL;
        rustore.hidden = false;
      } else {
        rustore.remove();
      }
    }

    if (!btn) return;

    
 
    fetch(VERSIONS_URL, { method: 'GET' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        var versions = (data && data.versions) || [];
        if (!versions.length) throw new Error('empty');
        setupVersionPicker(versions, btn, status);
      })
      .catch(function () {
        applyVersion({ version: '', file: APK_PATH, sizeBytes: 0 }, btn, status);
      });
  }

   
  function setupVersionPicker(versions, btn, status) {
    var select = document.getElementById('apk-version');
    var wrap = document.getElementById('apk-version-wrap');
    if (!select) {
      applyVersion(versions[0], btn, status);
      return;
    }

     
    var byFile = {};
    select.innerHTML = '';
    versions.forEach(function (v) {
      byFile[v.file] = v;
      var option = document.createElement('option');
      option.value = v.file;
      option.textContent = v.version + (v.current ? ' — актуальная' : '');
      select.appendChild(option);
    });

     
    var current = null;
    versions.forEach(function (v) { if (v.current) current = v; });
    if (!current) current = versions[0];
    select.value = current.file;

    if (wrap) wrap.hidden = false;
    select.addEventListener('change', function () {
      var picked = byFile[select.value] || current;
      applyVersion(picked, btn, status);
    });

    applyVersion(current, btn, status);
  }

   
  function applyVersion(version, btn, status) {
    var path = version.file;
    btn.textContent = path.split('/').pop();
    fetch(path, { method: 'HEAD' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        var size = Number(res.headers.get('content-length') || 0) || version.sizeBytes || 0;
        btn.href = path;
        btn.hidden = false;
        status.textContent = 'Сборка ' + (version.version || 'без номера') + ' готова к загрузке'
          + (size ? ' — ' + (size / 1048576).toFixed(1) + ' МБ' : '') + '.';
      })
      .catch(function () {
        status.textContent = 'Прямая ссылка на файл появится, когда сборка будет выложена. '
          + 'А пока — напишите, и мы пришлём APK на почту.';
      });
  }

  function init() {
    initMenu();
    initDemoButtons();
    initBuyForm();
    initDownload();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
