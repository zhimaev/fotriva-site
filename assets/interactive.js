








 

(function () {
  'use strict';

   

  var toastBox = null;
  var toastTimer = null;

  function showToast(text) {
    if (!toastBox) {
      toastBox = document.createElement('div');
      toastBox.className = 'site-toast';
      toastBox.setAttribute('role', 'status');
      toastBox.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastBox);
    }
    toastBox.textContent = text;
    toastBox.classList.add('is-on');
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastBox.classList.remove('is-on');
    }, 4200);
  }

   

  function showScreen(screen) {
    if (!window.FotrivaDemo || !screen) return;
    window.FotrivaDemo.goTo(screen);
    var phone = document.getElementById('fotriva-app');
    if (phone && window.matchMedia('(max-width: 959px)').matches) {
      phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function initScreenTriggers() {
    var nodes = document.querySelectorAll('[data-screen]');
    Array.prototype.forEach.call(nodes, function (node) {
      var screen = node.getAttribute('data-screen');
      node.addEventListener('click', function () { showScreen(screen); });
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showScreen(screen);
        }
      });
    });
  }

   

  function initWordmark() {
    var mark = document.querySelector('.wordmark');
    if (!mark) return;
    var clicks = 0;
    mark.addEventListener('click', function (e) {
       
      clicks++;
      if (clicks >= 3) {
        clicks = 0;
        showToast('FO · TRI · VA — фокус, три, ваши. Три плитки, три слоя учёта, ваши данные.');
      }
    });
  }

   

  function initPrototypeMark() {
    var root = document.getElementById('fotriva-app');
    if (!root) return;
    root.addEventListener('click', function (e) {
      var mark = e.target.closest('.app-logo, .app-toolbar svg');
      if (!mark) return;
      if (window.FotrivaDemo && window.FotrivaDemo.brand) window.FotrivaDemo.brand();
    });
  }

   

  function consoleGreeting() {
    if (!window.console || !console.log) return;
    var accent = '#C96442';
    console.log('%cFO · TRI · VA', 'font:600 15px/1.5 Onest, Segoe UI, sans-serif;color:' + accent);
    console.log('%cСъёмка, деньги, налоги — в одном журнале. И всё это живёт на вашем телефоне.%c%cCtrl/⌘+K — поиск по сайту, «/» — тоже.',
      'color:#6A6459', 'color:#6A6459', '');
  }

  function init() {
    initScreenTriggers();
    initWordmark();
    initPrototypeMark();
    consoleGreeting();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
