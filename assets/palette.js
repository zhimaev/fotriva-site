






 

(function () {
  'use strict';

  var MAIL = 'fotriva@yandex.ru';

   

  var COMMANDS = [];

  [
    ['marks', 'Три знака', 'бренд FO TRI VA · расшифровка'],
    ['features', 'Возможности', 'что умеет приложение'],
    ['how', 'Как работает', 'три шага'],
    ['compare', 'Сравнение', 'бумага · excel · fotriva'],
    ['audience', 'Кому подходит', 'свадьбы · портрет · бизнес'],
    ['tariff', 'Тариф', 'pro · бесплатно'],
    ['buy', 'Покупка', 'заявка · ключ'],
    ['faq', 'FAQ', 'вопросы и ответы'],
    ['download', 'Скачать', 'apk · android 8+']
  ].forEach(function (it) {
    COMMANDS.push({
      kind: 'Раздел',
      title: it[1],
      hint: it[2],
      keywords: it[1] + ' ' + it[2] + ' ' + it[0],
      run: function () { scrollTo_(it[0]); }
    });
  });

  [
    ['home', 'Главная', 'дашборд: съёмки, деньги, ближайшие даты'],
    ['clients', 'Клиенты', 'поиск, фильтры, история съёмок'],
    ['analytics', 'Аналитика', 'доход по месяцам, средний чек, доля полученного'],
    ['shoots', 'Съёмки', 'справочник видов съёмки'],
    ['calendar', 'Календарь', 'расписание съёмок'],
    ['tax', 'Налоги', 'НПД · УСН · ОСНО + НДС'],
    ['pro', 'FOTRIVA Pro', 'ключ и лимиты'],
    ['settings', 'Настройки', 'тема, приватный режим, резервные копии']
  ].forEach(function (it) {
    COMMANDS.push({
      kind: 'Экран',
      title: it[1],
      hint: it[2],
      keywords: it[1] + ' ' + it[2] + ' экран ' + it[0],
      run: function () {
        if (!window.FotrivaDemo) return;
        window.FotrivaDemo.goTo(it[0]);
        var phone = document.getElementById('fotriva-app');
        if (phone && window.matchMedia('(max-width: 959px)').matches) {
          phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

  COMMANDS.push({
    kind: 'Действие',
    title: 'Открыть поиск в прототипе',
    hint: 'свёрнут по умолчанию — как в приложении',
    keywords: 'поиск лупа search открыть найти',
    run: function () {
      if (!window.FotrivaDemo) return;
      window.FotrivaDemo.openSearch();
      var phone = document.getElementById('fotriva-app');
      if (phone && window.matchMedia('(max-width: 959px)').matches) {
        phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  COMMANDS.push({
    kind: 'Действие',
    title: 'Переключить тему',
    hint: 'день ↔ ночь — сайт и приложение вместе',
    keywords: 'тема ночь день светлая тёмная theme',
    run: function () {
      var btn = document.getElementById('theme-toggle');
      if (btn) btn.click();
    }
  });

  COMMANDS.push({
    kind: 'Действие',
    title: 'Скачать сборку',
    hint: 'APK для Android 8+',
    keywords: 'скачать apk установка android',
    run: function () { scrollTo_('download'); }
  });

  COMMANDS.push({
    kind: 'Действие',
    title: 'Написать письмо',
    hint: MAIL,
    keywords: 'почта письмо написать заявка купить ключ support email',
    run: function () { window.location.href = 'mailto:' + MAIL; }
  });

  COMMANDS.push({
    kind: 'Действие',
    title: 'Купить ключ FOTRIVA Pro',
    hint: 'разовая оплата — навсегда',
    keywords: 'купить pro ключ тариф цена',
    run: function () { scrollTo_('buy'); }
  });

  function scrollTo_(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    var focusable = el.querySelector('a[href], button, input, textarea, details > summary');
    if (focusable && !/^(A|BUTTON)$/.test(focusable.tagName)) focusable.focus();
  }

   

  var el = {
    backdrop: null, box: null, input: null, list: null, trigger: null
  };
  var results = [];
  var active = 0;
  var lastFocus = null;

  function build() {
    el.backdrop = document.getElementById('cmdk-backdrop');
    el.box = document.getElementById('cmdk');
    el.input = document.getElementById('cmdk-input');
    el.list = document.getElementById('cmdk-list');
    el.trigger = document.getElementById('cmdk-trigger');
    if (!el.box || !el.input || !el.list) return false;
    return true;
  }

  function matches(cmd, q) {
    if (!q) return true;
    var words = q.split(/\s+/);
    var hay = cmd.keywords.toLowerCase();
    var title = cmd.title.toLowerCase();
    for (var i = 0; i < words.length; i++) {
      if (hay.indexOf(words[i]) < 0 && title.indexOf(words[i]) < 0) return false;
    }
    return true;
  }

  function renderList() {
    var q = el.input.value.trim().toLowerCase();
    results = COMMANDS.filter(function (c) { return matches(c, q); });
    if (active >= results.length) active = Math.max(0, results.length - 1);

    if (!results.length) {
      el.list.innerHTML = '<li class="cmdk-empty">Ничего не нашлось. Попробуйте «налоги», «клиенты», «тема».</li>';
      return;
    }

    var html = '';
    var lastKind = '';
    results.forEach(function (c, i) {
      if (c.kind !== lastKind) {
        html += '<li class="cmdk-group" role="presentation">' + c.kind + '</li>';
        lastKind = c.kind;
      }
      html += '<li class="cmdk-item' + (i === active ? ' is-active' : '') + '" role="option" id="cmdk-item-' + i +
        '" aria-selected="' + (i === active) + '">' +
        '<span class="cmdk-item-title">' + c.title + '</span>' +
        '<span class="cmdk-item-hint">' + c.hint + '</span></li>';
    });
    el.list.innerHTML = html;

    var cur = el.list.querySelector('.cmdk-item.is-active');
    if (cur) {
      el.input.setAttribute('aria-activedescendant', cur.id);
      if (cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest' });
    }
  }

  function open() {
    if (!el.box || el.box.hidden === false) return;
    lastFocus = document.activeElement;
    el.box.hidden = false;
    el.backdrop.hidden = false;
    document.documentElement.classList.add('cmdk-open');
    el.input.value = '';
    active = 0;
    renderList();
    el.input.focus();
  }

  function close() {
    if (!el.box || el.box.hidden) return;
    el.box.hidden = true;
    el.backdrop.hidden = true;
    document.documentElement.classList.remove('cmdk-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function move(step) {
    if (!results.length) return;
    active = (active + step + results.length) % results.length;
    renderList();
  }

  function runActive() {
    var cmd = results[active];
    if (!cmd) return;
    close();
     
    window.setTimeout(function () { cmd.run(); }, 0);
  }

   

  function bind() {
    el.trigger.addEventListener('click', function () {
      if (el.box.hidden) open(); else close();
    });

    el.backdrop.addEventListener('click', close);

    var closeBtn = document.getElementById('cmdk-close');
    if (closeBtn) closeBtn.addEventListener('click', close);

    el.input.addEventListener('input', function () { active = 0; renderList(); });

    el.input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); runActive(); }
      else if (e.key === 'Escape') { e.preventDefault(); close(); }
    });

    el.list.addEventListener('click', function (e) {
      var item = e.target.closest('.cmdk-item');
      if (!item) return;
      active = Number(item.id.replace('cmdk-item-', ''));
      runActive();
    });

    el.list.addEventListener('mousemove', function (e) {
      var item = e.target.closest('.cmdk-item');
      if (!item) return;
      var i = Number(item.id.replace('cmdk-item-', ''));
      if (i !== active) { active = i; renderList(); }
    });

    document.addEventListener('keydown', function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '');
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (el.box.hidden) open(); else close();
        return;
      }
      if (e.key === '/' && !typing && el.box.hidden) {
        e.preventDefault();
        open();
        return;
      }
      if (e.key === 'Escape' && !el.box.hidden) close();
    });
  }

  function init() {
    if (!build()) return;
    bind();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
