





 

(function () {
  'use strict';

  var ROOT = document.getElementById('fotriva-app');
  if (!ROOT) return;

  var STORE_KEY = 'fotriva-web-demo-v5';
  var THEME_KEY = 'fotriva-theme';

  



 
  var P = window.FotrivaPolicy || {};

   

   

   
  var ICON_ALIAS = {
    plus: 'add',
    gear: 'settings',
    trash: 'delete',
    cloud: 'backup',
    calendar: 'calendar',
    calendarFilled: 'calendarSolid'
  };

  function icon(name, cls) {
    var set = window.FotrivaIcons || {};
    var def = set[name] || set[ICON_ALIAS[name]];
    if (!def) return '';
    return '<svg class="' + (cls || '') + '" viewBox="' + def.vb + '" aria-hidden="true">' + def.body + '</svg>';
  }
   

  var SHOOT_TYPES = [
    { name: 'Свадьба', color: '#C0533D' },
    { name: 'Портрет', color: '#D08A2E' },
    { name: 'Корпоратив', color: '#7D9471' },
    { name: 'Love story', color: '#A2678A' },
    { name: 'Выпускной', color: '#5F8BA6' },
    { name: 'Праздник', color: '#9A6B4F' },
    { name: 'Новорождённые', color: '#D08FA6' },
    { name: 'Детская', color: '#6FA3A0' },
    { name: 'Репортаж', color: '#7E7EA6' },
    { name: 'Товарная', color: '#8F9445' }
  ];

  
 
  var AUTO_TYPE = { name: 'Без типа съёмки', color: '#8D8F93', auto: true };

  
 
  function seedTypes() {
    var list = SHOOT_TYPES.map(function (t) { return { name: t.name, color: t.color }; });
    list.push({ name: AUTO_TYPE.name, color: AUTO_TYPE.color, auto: true });
    return list;
  }

  var AVATAR_COLORS = ['#7A4A2E', '#8E3B32', '#3F5A78', '#4E6B3C', '#6B4A78', '#8A6A2E', '#3E6B68', '#7C3F58'];

  


 
  var DEMO_CONTACTS = [
    { id: 'd1', name: 'Анна Смирнова', phone: '+7 903 100-00-01' },
    { id: 'd2', name: 'Екатерина Лебедева', phone: '+7 928 160-00-15' },
    { id: 'd3', name: 'Артём Крылов', phone: '+7 916 220-00-09' },
    { id: 'd4', name: 'Мария Попова', phone: '+7 905 416-02-24' },
    { id: 'd5', name: 'ООО «Вектор Плюс»', phone: '+7 812 120-00-11' },
    { id: 'd6', name: 'Наталья Ильина', phone: '+7 926 330-00-18' },
    { id: 'd7', name: 'Сергей Титов', phone: '+7 903 777-00-02' },
    { id: 'd8', name: 'Ирина Маркова', phone: '+7 931 480-00-06' }
  ];

  
 
  var STATUS = {
    planned: { label: 'Планируется' },
    assigned: { label: 'Назначена' },
    in_progress: { label: 'В обработке' },
    montage: { label: 'В монтаже' },
    completed: { label: 'Завершена' },
    cancelled: { label: 'Отменена' }
  };
  var STATUS_ORDER = ['assigned', 'in_progress', 'montage', 'completed'];

  var SCREENS = {
    home: { title: 'FOTRIVA', logo: true },
    clients: { title: 'Клиенты' },
    analytics: { title: 'Аналитика' },
    shoots: { title: 'Съёмки' },
    calendar: { title: 'Календари', back: true },
    tax: { title: 'Налоги', back: true },
    pro: { title: 'FOTRIVA Pro', back: true },
    settings: { title: 'Настройки', back: true }
  };

   

  function seedState() {
     
    var clients = [
      { id: 'c1', name: 'Анна Смирнова', phone: '+7 903 100-00-01', email: 'anna.smirnova@mail.ru', type: 'individual' },
      { id: 'c2', name: 'Катерина Соколова', phone: '+7 921 300-00-03', email: 'k.sokolova@yandex.ru', type: 'individual' },
      { id: 'c3', name: 'ООО «Ромашка»', phone: '+7 812 700-00-07', email: 'office@romashka.ru', company: 'ООО «Ромашка»', type: 'company' },
      { id: 'c4', name: 'Ольга Крылова', phone: '+7 908 110-00-10', email: 'olga.krylova@mail.ru', type: 'individual' },
      { id: 'c5', name: 'Мария Попова', phone: '+7 905 500-00-05', email: 'm.popova@gmail.com', type: 'individual' },
      { id: 'c6', name: 'Игорь Волков', phone: '+7 981 600-00-06', email: '', type: 'individual' },
      { id: 'c7', name: 'Дарья Белова', phone: '+7 904 140-00-13', email: 'dasha.belova@ya.ru', type: 'individual' },
      { id: 'c8', name: 'ООО «Вектор Плюс»', phone: '+7 812 120-00-11', email: 'hr@vectorplus.ru', company: 'ООО «Вектор Плюс»', type: 'company' },
      { id: 'c9', name: 'Павел Захаров', phone: '+7 919 130-00-12', email: '', type: 'individual' },
      { id: 'c10', name: 'Екатерина Лебедева', phone: '+7 928 160-00-15', email: 'k.lebedeva@mail.ru', type: 'individual' }
    ];

    





 
    var projects = [
      p('p1', 'Свадьба Анны и Дмитрия', 'c1', 'Свадьба', 'Ресторан «Шато», Садовая 15', -26, 120000, 'completed', -23,
        'Съёмка 8 часов, обработка 3 недели. Клиенты довольны.',
        [['Предоплата', 50000, -32], ['Съёмка', 40000, -26], ['Фотокнига', 30000, -23]],
        [['receipt', 50000, -32, 'Карта', 0], ['receipt', 40000, -26, 'Карта', 1], ['receipt', 30000, -23, 'Наличные', 2]]),
      p('p2', 'Семейный портрет у озера', 'c2', 'Портрет', 'Озеро Сестрорецк, набережная', -14, 45000, 'completed', -11,
        '', [['Предоплата', 20000, -17], ['Остаток', 25000, -13]],
        [['receipt', 20000, -17, 'Перевод', 0], ['receipt', 25000, -13, 'Перевод', 1]]),
      p('p3', 'Выпускной в школе №5', 'c5', 'Выпускной', 'Школа №5, актовый зал', -9, 90000, 'completed', -6,
        'Съёмка 6 часов, 40 выпускников, фотоальбомы.',
        [['Предоплата', 40000, -16], ['Репортаж', 30000, -9], ['Альбомы', 20000, -6]],
        [['receipt', 40000, -16, 'Безнал РКО', 0], ['receipt', 30000, -9, 'Безнал РКО', 1], ['receipt', 20000, -6, 'Безнал РКО', 2]]),
      p('p4', 'Корпоратив «Ромашка»', 'c3', 'Корпоратив', 'Лофт «Красный Октябрь»', -5, 180000, 'completed', -3,
        '120 гостей, отчётный корпоратив. Оплата по счёту.',
        [['Предоплата', 80000, -17], ['Репортаж', 70000, -5], ['Фотокниги', 30000, -3]],
        [['receipt', 80000, -17, 'Безнал РКО', 0], ['receipt', 70000, -5, 'Безнал РКО', 1], ['refund', 10000, -4, 'Безнал РКО', -1]]),
      p('p5', 'Love story в парке', 'c4', 'Love story', 'Парк Горького, набережная', -3, 60000, 'completed', -1,
        '', [['Предоплата', 30000, -5], ['Остаток', 30000, -2]],
        [['receipt', 30000, -5, 'Карта', 0], ['receipt', 30000, -2, 'Наличные', 1]]),
      p('p6', 'Юбилей 50 лет в ресторане', 'c6', 'Праздник', 'Ресторан «Золотой», центр', -1, 120000, 'montage', null,
        'Съёмка прошла, материал в монтаже. Остаток будет после сдачи.',
        [['Предоплата', 80000, -30], ['Съёмка', 30000, -1], ['Остаток', 10000, 9]],
        [['receipt', 80000, -30, 'Карта', 0]]),
      p('p7', 'Рождение ребёнка в роддоме', 'c7', 'Новорождённые', 'Перинатальный центр', 1, 35000, 'in_progress', null,
        'Съёмка «лайфстайл»: утро семьи с новорождённым.',
        [['Предоплата', 15000, 0], ['Остаток', 20000, 4]],
        [['receipt', 15000, 0, 'Карта', 0]]),
      p('p8', 'Детская фотосессия в студии', 'c8', 'Детская', 'Студия «Кадр», Пресненская 12', 6, 60000, 'assigned', null,
        'Съёмка с декорациями, 2 часа, фотоальбом в подарок.',
        [['Предоплата', 20000, 3], ['Остаток', 40000, 7]],
        [['receipt', 20000, 3, 'Перевод', 0]]),
      p('p9', 'Репортаж IT-конференции', 'c9', 'Репортаж', 'Технопарк, конференц-зал', 8, 95000, 'assigned', null,
        '', [['Предоплата', 50000, -1], ['Репортаж', 45000, 9]],
        [['receipt', 50000, -1, 'Безнал РКО', 0]]),
      p('p10', 'Каталожная съёмка для каталога', 'c10', 'Товарная', 'Склад на Пресне, павильон 4', 14, 40000, 'assigned', null,
        'Каталожные фото 40 позиций, отбор 12 в ретушь.',
        [['Оплата после съёмки', 40000, 15]],
        [])
    ];

     
    projects[5].startTime = '10:00';
    projects[5].endTime = '15:00';
    projects[6].startTime = '09:30';
    projects[6].endTime = '12:30';
    projects[9].startTime = '14:00';

    return {
      clients: clients, projects: projects, demoCleared: false, pro: false,
      types: seedTypes(),
      taxProfiles: seedTaxProfiles()
    };
  }

  function p(id, title, clientId, type, location, shootOffset, budget, status, completedOffset, notes, stages, tx) {
    return {
      id: id, title: title, clientId: clientId, type: type, location: location,
      shootOffset: shootOffset, budget: budget, status: status, completedOffset: completedOffset,
      notes: notes || '', delivered: false, startTime: '', endTime: '',
      stages: (stages || []).map(function (it) { return { title: it[0], amount: it[1], offset: it[2] }; }),
      tx: (tx || []).map(function (it) {
        return { kind: it[0], amount: it[1], offset: it[2], method: it[3], stage: (it[4] === undefined ? -1 : it[4]) };
      })
    };
  }

   

  var state = {
    data: null,
    screen: 'home',
    stack: [],
    period: 'all',
    monthOffset: 0,
    clientFilter: 'all',
    clientQuery: '',
    projectQuery: '',
    
 
    searchOpen: false,
    

 
    filters: {
      active: true, completed: false, cancelled: false, undelivered: false,
      client: null, type: null
    },
    private: false,
    theme: 'day',
    calendarDay: null,
    taxProfileId: null,
     
    pendingTypeMove: null,
     
    analyticsPeriod: 'month',
    analyticsTypes: [],
    analyticsClient: null,
    analyticsClientType: 'all',
    
 
    importSel: {},
    importQuery: ''
  };

  function loadState() {
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { saved = null; }
    state.data = (saved && saved.projects && saved.clients) ? saved : seedState();
    
 
    if (!state.data.types || !state.data.types.length) {
      state.data.types = seedTypes();
    }
    var theme = null;
    try { theme = localStorage.getItem(THEME_KEY); } catch (e) { theme = null; }
     
    var forced = null;
    try {
      forced = new URLSearchParams(window.location.search).get('theme');
    } catch (e) { forced = null; }
    if (forced === 'day' || forced === 'night') {
      theme = forced;
    } else if (!theme) {
      theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'night' : 'day';
    }
    state.theme = theme;
  }

  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state.data)); } catch (e) {   }
  }

   

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {   }
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'night' ? 'Включить дневную тему' : 'Включить ночную тему');
      btn.setAttribute('aria-pressed', theme === 'night' ? 'true' : 'false');
    }
    if (state.data) render();
  }

   

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function addDays(date, days) { var d = new Date(date.getTime()); d.setDate(d.getDate() + days); return d; }
  function addMonths(date, months) {
    var d = new Date(date.getTime());
    var day = d.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth() + months);
    d.setDate(Math.min(day, 28));
    return d;
  }

  function shootDate(project) { return addDays(today(), project.shootOffset); }

  
 
  function txDate(project, tx) { return addDays(today(), tx.offset || 0); }
  function stageDate(project, stage) { return addDays(today(), stage.offset || 0); }

  
 
  function journalNet(project) {
    var net = 0;
    (project.tx || []).forEach(function (t) {
      net += (t.kind === 'refund' ? -t.amount : t.amount);
    });
    return net;
  }
  function receivedOf(project) { return journalNet(project); }
  function pendingOf(project) { return Math.max(0, project.budget - journalNet(project)); }

  function receiptsOf(project) {
    return (project.tx || []).filter(function (t) { return t.kind !== 'refund'; });
  }
  function refundsOf(project) {
    return (project.tx || []).filter(function (t) { return t.kind === 'refund'; });
  }

  function fmtMoney(value) {
    var n = Math.round(value);
    var s = String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (n < 0 ? '−' : '') + s + ' ₽';
  }
  function money(value) { return state.private ? '••• ₽' : fmtMoney(value); }

  
 
  function parseMoney(raw) {
    var text = P.normalizeMoney ? P.normalizeMoney(raw) : String(raw == null ? '' : raw).replace(/\s/g, '').replace(',', '.');
    var value = Number(text);
    return isFinite(value) ? value : 0;
  }

  var MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  var MONTHS_NOM = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  var MONTHS_SHORT = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  var WEEKDAYS = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

  function fmtDate(date) { return date.getDate() + ' ' + MONTHS_GEN[date.getMonth()] + ' ' + date.getFullYear(); }
  function sameDay(a, b) {
    return a && b && a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  }

  function plural(n, one, few, many) {
    var mod10 = n % 10, mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
  }

  function greeting() {
    var h = new Date().getHours();
    if (h < 5) return 'Доброй ночи';
    if (h < 12) return 'Доброе утро';
    if (h < 18) return 'Добрый день';
    return 'Добрый вечер';
  }

  function clientById(id) {
    var found = null;
    state.data.clients.forEach(function (c) { if (c.id === id) found = c; });
    return found;
  }
  function typeByName(name) {
    var list = state.data.types || [];
    var found = list[0] || { name: name, color: '#8D8F93' };
    list.forEach(function (t) { if (t.name === name) found = t; });
    return found;
  }
  
 
  function isAutoType(name) { return name === AUTO_TYPE.name; }
   
  function projectsOfType(name) {
    var t = typeByName(name);
    return state.data.projects.filter(function (pr) {
      if (t.auto) return !pr.type;
      return pr.type === name;
    });
  }
  function initials(name) {
    var parts = String(name).replace(/[«»]/g, '').split(/[\s-]+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  function avatarColor(id) {
    var n = 0;
    for (var i = 0; i < id.length; i++) n += id.charCodeAt(i);
    return AVATAR_COLORS[n % AVATAR_COLORS.length];
  }

   

   
  var ACTIVE_STATUSES = ['planned', 'assigned', 'in_progress', 'montage'];
  var EARN_STATUSES = ['planned', 'assigned', 'in_progress', 'montage', 'completed'];

  

 
  function filteredProjects() {
    var f = state.filters;
    var list = state.data.projects.filter(function (pr) {
      var st = pr.status;
      var shown = (f.active && ACTIVE_STATUSES.indexOf(st) >= 0) ||
        (f.completed && st === 'completed') ||
        (f.cancelled && st === 'cancelled');
      if (!shown) return false;
      if (f.undelivered && pr.delivered) return false;
      if (f.client && pr.clientId !== f.client) return false;
      if (f.type && pr.type !== f.type) return false;
      return true;
    });
    var q = (state.projectQuery || '').trim().toLowerCase();
    if (q) {
      list = list.filter(function (pr) {
        var c = clientById(pr.clientId);
        return (pr.title || '').toLowerCase().indexOf(q) >= 0 ||
          (pr.type || '').toLowerCase().indexOf(q) >= 0 ||
          (pr.location || '').toLowerCase().indexOf(q) >= 0 ||
          (c ? c.name : '').toLowerCase().indexOf(q) >= 0;
      });
    }
    return list;
  }

   
  function periodRange() {
    var t = today();
    switch (state.period) {
      case 'week': {
        var start = addDays(t, -((t.getDay() + 6) % 7));  
        return { start: start, end: addDays(start, 6) };
      }
      case 'month': {
        var base = addMonths(t, state.monthOffset);
        return {
          start: new Date(base.getFullYear(), base.getMonth(), 1),
          end: new Date(base.getFullYear(), base.getMonth() + 1, 0)
        };
      }
      case 'year':
        return { start: new Date(t.getFullYear(), 0, 1), end: new Date(t.getFullYear(), 11, 31) };
      case 'later':
        return { start: t, end: null };
      default:
        return { start: null, end: null };
    }
  }

  function projectsInPeriod() {
    var list = filteredProjects();
    var r = periodRange();
    if (!r.start && !r.end) return list;
    return list.filter(function (pr) {
      var d = shootDate(pr);
      if (r.start && d < r.start) return false;
      if (r.end && d > r.end) return false;
      return true;
    });
  }

  
 
  var GROUPS = [
    { id: 'today', title: 'Сегодня' },
    { id: 'tomorrow', title: 'Завтра' },
    { id: 'week', title: 'На этой неделе' },
    { id: 'later', title: 'Позже' },
    { id: 'overdue', title: 'Прошло, не завершено' },
    { id: 'closed', title: 'Завершённые и отменённые' }
  ];

  function classify(project) {
    if (ACTIVE_STATUSES.indexOf(project.status) < 0) return 'closed';
    var t = today();
    var d = shootDate(project);
    var endOfWeek = addDays(t, (7 - t.getDay()) % 7);  
    if (d < t) return 'overdue';
    if (sameDay(d, t)) return 'today';
    if (sameDay(d, addDays(t, 1))) return 'tomorrow';
    if (d <= endOfWeek) return 'week';
    return 'later';
  }

  function groupProjects(list) {
    var buckets = {};
    GROUPS.forEach(function (g) { buckets[g.id] = []; });
    list.forEach(function (pr) { buckets[classify(pr)].push(pr); });
    var groups = [];
    GROUPS.forEach(function (g) {
      if (!buckets[g.id].length) return;
      var items = buckets[g.id].slice().sort(function (a, b) {
        return shootDate(a).getTime() - shootDate(b).getTime();
      });
      if (g.id === 'closed') items.reverse();
      groups.push({ id: g.id, name: g.title, items: items });
    });
    return groups;
  }

   

   
  function isAtListEnd(body) {
    if (!body) return true;
    return body.scrollTop + body.clientHeight >= body.scrollHeight - 24;
  }

  function render() {
    var body = ROOT.querySelector('.app-body');
    var bar = ROOT.querySelector('.app-toolbar');
    var nav = ROOT.querySelector('.app-nav');
    var fab = ROOT.querySelector('.app-fab');

    renderToolbar(bar);
    renderNav(nav);

    var sub = state.screen !== 'home' && state.screen !== 'clients' && state.screen !== 'analytics' && state.screen !== 'shoots';
    nav.hidden = sub;
    
 
    if (state.screen === 'shoots') {
      fab.setAttribute('data-act', 'type-create');
      fab.setAttribute('aria-label', 'Новый вид съёмки');
    } else {
      fab.setAttribute('data-act', 'new-project');
      fab.setAttribute('aria-label', 'Новый проект');
    }
    

 
    fab.hidden = sub || state.screen === 'analytics' || state.screen === 'calendar' || state.screen === 'tax' ||
      (state.screen === 'shoots' && !isAtListEnd(body));

    if (state.screen === 'home') body.innerHTML = viewHome();
    else if (state.screen === 'clients') body.innerHTML = viewClients();
    else if (state.screen === 'analytics') body.innerHTML = viewAnalytics();
    else if (state.screen === 'shoots') body.innerHTML = viewShoots();
    else if (state.screen === 'calendar') body.innerHTML = viewCalendar();
    else if (state.screen === 'tax') body.innerHTML = viewTax();
    else if (state.screen === 'pro') body.innerHTML = viewPro();
    else body.innerHTML = viewSettings();
    body.scrollTop = 0;
  }

  function renderToolbar(bar) {
    var cfg = SCREENS[state.screen] || SCREENS.home;
    var left = '';
    if (cfg.back) {
      left = '<button class="app-icon-btn app-back" type="button" data-act="back" aria-label="Назад">' + icon('back') + '</button>';
    } else if (cfg.logo) {
      left = '<button class="app-icon-btn app-logo" type="button" data-act="brand" aria-label="FOTRIVA — о бренде">' +
        apertureMark(28) + '</button>';
    }
    var right = '';
    

 
    if (state.screen === 'home') {
      var searchLabel = state.searchOpen ? 'Скрыть поиск' : 'Поиск';
      right += '<button class="app-icon-btn" type="button" data-act="toggle-search" aria-label="' + searchLabel +
        '" title="' + searchLabel + '">' + icon(state.searchOpen ? 'close' : 'search') + '</button>';
      right += '<button class="app-icon-btn" type="button" data-act="go-settings" aria-label="Настройки">' + icon('gear') + '</button>';
    } else if (state.screen === 'shoots') {
      
 
      right += '<button class="app-icon-btn" type="button" data-act="go-calendar" aria-label="Календари">' + icon('calendar') + '</button>';
      right += '<button class="app-icon-btn" type="button" data-act="reference-menu" aria-label="Ещё">' + icon('expandMore') + '</button>';
    }
    bar.innerHTML = left + '<h2>' + esc(cfg.title) + '</h2>' + right;
  }

  function renderNav(nav) {
    var tabs = [
      { id: 'home', label: 'Главная', icon: 'dashboard' },
      { id: 'clients', label: 'Клиенты', icon: 'clients' },
      { id: 'analytics', label: 'Аналитика', icon: 'analytics' },
      { id: 'shoots', label: 'Съёмки', icon: 'reference' }
    ];
    nav.innerHTML = tabs.map(function (t) {
      var cur = state.screen === t.id ? ' aria-current="page"' : '';
      return '<button type="button" data-tab="' + t.id + '"' + cur + '>' + icon(t.icon) + '<span>' + t.label + '</span></button>';
    }).join('');
  }

   

  

 
  function financeSummary(list) {
    var earned = 0, pending = 0;
    list.forEach(function (pr) {
      var net = journalNet(pr);
      if (EARN_STATUSES.indexOf(pr.status) >= 0) earned += net;
      if (ACTIVE_STATUSES.indexOf(pr.status) >= 0) {
        pending += Math.max(0, pr.budget - net);
      }
    });
    return { earned: earned, pending: pending };
  }

   
  function progressPercent(earned, pending) {
    var total = earned + pending;
    if (total <= 0) return 0;
    var raw = earned / total * 100;
    if (!isFinite(raw)) return 0;
    return Math.max(0, Math.min(100, Math.round(raw)));
  }

   
  function sectionTitle() {
    var f = state.filters;
    var parts = [];
    if (f.active && f.completed) parts = ['Активные', 'Завершённые'];
    else {
      if (f.active) parts.push('Активные');
      if (f.completed) parts.push('Завершённые');
    }
    if (f.cancelled) parts.push('Отменённые');
    var statusPart;
    if (!parts.length) statusPart = 'Активные';
    else if (parts.length === 1) statusPart = parts[0];
    else if (f.active && f.completed && !f.cancelled) statusPart = 'Все проекты';
    else statusPart = parts.join(' + ');
    var periodPart = '';
    if (state.period === 'week') periodPart = ' · Неделя';
    else if (state.period === 'year') periodPart = ' · Год';
    else if (state.period === 'later') periodPart = ' · Предстоящие';
    else if (state.period === 'month') {
      var base = addMonths(today(), state.monthOffset);
      periodPart = ' · ' + MONTHS_NOM[base.getMonth()] + ' ' + base.getFullYear();
    }
    return statusPart + periodPart + (f.undelivered ? ' · не отправлено' : '');
  }

  function changedFilterCount() {
    var f = state.filters;
    return (f.active ? 0 : 1) + (f.completed ? 1 : 0) + (f.cancelled ? 1 : 0) + (f.undelivered ? 1 : 0);
  }

  function viewHome() {
    var list = projectsInPeriod();
    var summary = financeSummary(list);
    var activeCount = 0, montageCount = 0;
    list.forEach(function (pr) {
      if (pr.status === 'planned' || pr.status === 'assigned' || pr.status === 'in_progress') activeCount++;
      if (pr.status === 'montage') montageCount++;
    });
    var share = progressPercent(summary.earned, summary.pending);

    
 
    var html = '';
    if (state.searchOpen) {
      var clientName = '';
      if (state.filters.client) {
        var c = clientById(state.filters.client);
        clientName = c ? c.name : '';
      }
      html += '<div class="app-search">' + icon('search') +
        '<input type="search" id="project-search" placeholder="Поиск: проекты, клиенты, съёмки" value="' +
        esc(state.projectQuery) + '" aria-label="Поиск по проектам, клиентам и съёмкам"></div>' +
        '<div class="app-chips app-filter-chips">' +
        '<button type="button" data-act="filter-client" class="' + (state.filters.client ? 'on' : '') + '">' +
        (state.filters.client ? 'Клиент: ' + esc(clientName) : 'Клиент') + '</button>' +
        '<button type="button" data-act="filter-type" class="' + (state.filters.type ? 'on' : '') + '">' +
        (state.filters.type ? 'Тип: ' + esc(state.filters.type) : 'Тип съёмки') + '</button>' +
        '</div>';
    }

    html += '<div class="app-greet"><h3>' + greeting() + '</h3><p>' +
      fmtDate(today()).replace(/ \d{4}$/, '') + ' · ' + WEEKDAYS[today().getDay()] + '</p></div>';

    html += '<div class="app-hero">' +
      '<div class="app-hero-top"><span>Получено</span>' +
      '<button class="app-icon-btn" type="button" data-act="private" aria-label="Скрыть суммы">' +
      icon(state.private ? 'eyeOff' : 'eye') + '</button></div>' +
      '<div class="app-hero-value">' + money(summary.earned) + '</div>' +
      '<div class="app-hero-bar"><i style="width:' + Math.max(2, share) + '%"></i></div>' +
      '<div class="app-hero-stats">' +
      '<div class="app-hero-stat"><b>' + money(summary.pending) + '</b><small>К получению</small></div>' +
      '<div class="app-hero-stat"><b>' + activeCount + '</b><small>Активных проектов</small></div>' +
      '<div class="app-hero-stat"><b>' + montageCount + '</b><small>В монтаже</small></div>' +
      '</div></div>';

    html += '<div class="app-segments" role="group" aria-label="Период">' +
      [['all', 'Всё'], ['week', 'Неделя'], ['month', 'Месяц'], ['year', 'Год'], ['later', 'Далее']].map(function (it) {
        return '<button type="button" data-period="' + it[0] + '" aria-pressed="' + (state.period === it[0]) + '">' + it[1] + '</button>';
      }).join('') + '</div>';

    if (state.period === 'month') {
      var base = addMonths(today(), state.monthOffset);
      html += '<div class="app-month-nav">' +
        '<button class="app-icon-btn" type="button" data-act="month-prev" aria-label="Предыдущий месяц">' + icon('chevronL') + '</button>' +
        '<b>' + MONTHS_NOM[base.getMonth()] + ' ' + base.getFullYear() + '</b>' +
        '<button class="app-icon-btn" type="button" data-act="month-next" aria-label="Следующий месяц">' + icon('chevronR') + '</button>' +
        '</div>';
    }

    if (!state.data.demoCleared) {
      html += '<div class="app-hint"><p>Это пример проектов. Когда освоитесь — завершите тестовый режим, и все данные, созданные в нём, будут удалены.</p>' +
        '<button type="button" data-act="clear-demo">Завершить тестовый режим</button></div>';
    }

    var changed = changedFilterCount();
    html += '<div class="app-section-row"><h4>' + esc(sectionTitle()) + '</h4>' +
      '<button type="button" data-act="filter">' + (changed ? 'Фильтр · ' + changed : 'Фильтр') + '</button></div>';

    var groups = groupProjects(list);
    if (!groups.length) {
      html += '<div class="app-empty">Здесь появятся ваши съёмки. Добавьте первую кнопкой «+».</div>';
    }
    groups.forEach(function (g) {
      html += '<div class="app-group-title">' + esc(g.name) + ' · ' + g.items.length + '</div>';
      g.items.forEach(function (pr) { html += projectCard(pr); });
    });

    return html;
  }

  function projectCard(pr) {
    var client = clientById(pr.clientId);
    var type = typeByName(pr.type);
    var d = shootDate(pr);
    var pending = pendingOf(pr);
    var moneyLine = pending > 0
      ? '<b>' + money(pr.budget) + '</b><small>к оплате ' + money(pending) + '</small>'
      : '<b>' + money(pr.budget) + '</b><small>получено ' + money(receivedOf(pr)) + '</small>';

    var quick = (pr.status !== 'completed' && pr.status !== 'cancelled')
      ? '<button class="app-project-quick" type="button" data-act="quick-complete" data-id="' + pr.id + '">Завершить</button>'
      : '';

    return '<div class="app-project" data-project="' + pr.id + '" role="button" tabindex="0">' +
      '<span class="app-type-bar" style="background:' + type.color + '"></span>' +
      '<span class="app-project-main">' +
      '<h5>' + esc(pr.title) + '</h5>' +
      '<p>' + esc(client ? client.name : 'Без клиента') + '</p>' +
      '<p class="small">' + d.getDate() + ' ' + MONTHS_GEN[d.getMonth()] + ' · ' + esc(pr.type) + '</p>' +
      '</span>' +
      '<span class="app-project-side">' +
      '<span class="app-chip st-' + pr.status + '">' + STATUS[pr.status].label + '</span>' +
      '<span class="app-project-budget">' + moneyLine + '</span>' +
      '</span>' + quick +
      '</div>';
  }

   

  function viewClients() {
    var q = state.clientQuery.trim().toLowerCase();
    var list = state.data.clients.filter(function (c) {
      if (state.clientFilter === 'individual' && c.type !== 'individual') return false;
      if (state.clientFilter === 'company' && c.type !== 'company') return false;
      if (!q) return true;
      return c.name.toLowerCase().indexOf(q) >= 0 ||
        (c.phone || '').replace(/\s/g, '').indexOf(q.replace(/\s/g, '')) >= 0;
    });

    var html = '<div class="app-search">' + icon('search') +
      '<input type="search" id="client-search" placeholder="Поиск по имени" value="' + esc(state.clientQuery) + '" aria-label="Поиск клиентов"></div>';

    html += '<div class="app-chips">' +
      [['all', 'Все'], ['individual', 'Физические'], ['company', 'Компании']].map(function (it) {
        return '<button type="button" data-client-filter="' + it[0] + '" aria-pressed="' + (state.clientFilter === it[0]) + '">' + it[1] + '</button>';
      }).join('') + '</div>';

    
 
    html += '<div class="app-card">' +
      menuRow('importContacts', 'Импорт из записной книжки', 'import-contacts') +
      menuRow('trash', 'Очистить контакты', 'clear-contacts') +
      '</div>';

    if (!list.length) html += '<div class="app-empty">Клиентов не найдено.</div>';

    list.forEach(function (c) {
      var prs = state.data.projects.filter(function (pr) { return pr.clientId === c.id; });
      
 
      var paid = prs.reduce(function (s, pr) { return s + journalNet(pr); }, 0);
      var count = prs.length;
      html += '<button class="app-client" type="button" data-client="' + c.id + '">' +
        '<span class="app-avatar" style="background:' + avatarColor(c.id) + '">' + esc(initials(c.name)) + '</span>' +
        '<span class="app-client-name"><b>' + esc(c.name) + '</b><small>' + esc(c.phone || '—') + '</small></span>' +
        '<span class="app-client-sum"><small>' + count + ' ' + plural(count, 'проект', 'проекта', 'проектов') + '</small>' +
        (paid > 0 ? '<b>' + money(paid) + '</b>' : '') + '</span>' +
        '</button>';
    });

    return html;
  }

   

  var ANALYTICS_PERIODS = [
    ['today', 'Сегодня'], ['week', 'Неделя'], ['month', 'Месяц'], ['prevMonth', 'Прошлый месяц'],
    ['quarter', 'Квартал'], ['prevQuarter', 'Прошлый квартал'], ['year', 'Год'], ['custom', 'Произвольный']
  ];

  function analyticsRange() {
    var t = today();
    switch (state.analyticsPeriod) {
      case 'today': return { start: t, end: t };
      case 'week': {
        var s = addDays(t, -((t.getDay() + 6) % 7));
        return { start: s, end: addDays(s, 6) };
      }
      case 'prevMonth': {
        var pm = addMonths(t, -1);
        return { start: new Date(pm.getFullYear(), pm.getMonth(), 1), end: new Date(pm.getFullYear(), pm.getMonth() + 1, 0) };
      }
      case 'month': {
        var b = addMonths(t, state.monthOffset);
        return { start: new Date(b.getFullYear(), b.getMonth(), 1), end: new Date(b.getFullYear(), b.getMonth() + 1, 0) };
      }
      case 'quarter': {
        var q = new Date(t.getFullYear(), t.getMonth() - (t.getMonth() % 3), 1);
        return { start: q, end: new Date(q.getFullYear(), q.getMonth() + 3, 0) };
      }
      case 'prevQuarter': {
        var pq = new Date(t.getFullYear(), t.getMonth() - (t.getMonth() % 3) - 3, 1);
        return { start: pq, end: new Date(pq.getFullYear(), pq.getMonth() + 3, 0) };
      }
      case 'year':
        return { start: new Date(t.getFullYear(), 0, 1), end: new Date(t.getFullYear(), 11, 31) };
      default:
        return { start: null, end: null };
    }
  }

   
  function analyticsProjects() {
    var r = analyticsRange();
    return state.data.projects.filter(function (pr) {
      if (pr.status === 'cancelled') return false;
      if (state.analyticsTypes.length && state.analyticsTypes.indexOf(pr.type) < 0) return false;
      if (state.analyticsClient && pr.clientId !== state.analyticsClient) return false;
      if (state.analyticsClientType !== 'all') {
        var c = clientById(pr.clientId);
        if (!c || c.type !== state.analyticsClientType) return false;
      }
      if (r.start || r.end) {
        var d = shootDate(pr);
        if (r.start && d < r.start) return false;
        if (r.end && d > r.end) return false;
      }
      return true;
    });
  }

  



 
  function analyticsScope() {
    return state.data.projects.filter(function (pr) {
      if (pr.status === 'cancelled') return false;
      if (state.analyticsTypes.length && state.analyticsTypes.indexOf(pr.type) < 0) return false;
      if (state.analyticsClient && pr.clientId !== state.analyticsClient) return false;
      if (state.analyticsClientType !== 'all') {
        var c = clientById(pr.clientId);
        if (!c || c.type !== state.analyticsClientType) return false;
      }
      return true;
    });
  }

   
  function receivedInPeriod(list, start, end) {
    var sum = 0;
    list.forEach(function (pr) {
      (pr.tx || []).forEach(function (t) {
        var d = txDate(pr, t);
        if (start && d < start) return;
        if (end && d > end) return;
        sum += (t.kind === 'refund' ? -t.amount : t.amount);
      });
    });
    return sum;
  }

  

 
  function stagePaid(project, stageIndex) {
    var paid = 0;
    (project.tx || []).forEach(function (t) {
      if (t.kind === 'refund') return;
      if (t.alloc && t.alloc.length) {
        t.alloc.forEach(function (a) { if (a.index === stageIndex) paid += a.amount; });
        return;
      }
      if (t.stage === stageIndex) paid += t.amount;
    });
    return paid;
  }

  

 
  function allocateByStages(project, remaining) {
    var stages = project.stages || [];
    var alloc = [];
    var left = remaining;
    for (var i = 0; i < stages.length && left > 0; i++) {
      var need = Math.max(0, stages[i].amount - stagePaid(project, i));
      if (need <= 0) continue;
      var take = Math.min(need, left);
      alloc.push({ index: i, amount: take });
      left -= take;
    }
    return alloc;
  }

   
  function scheduleTotals(list) {
    var t = today();
    var scheduled = 0, overdue = 0;
    (list || state.data.projects).forEach(function (pr) {
      if (pr.status === 'cancelled') return;
      (pr.stages || []).forEach(function (st, i) {
        var rest = Math.max(0, st.amount - stagePaid(pr, i));
        if (rest <= 0) return;
        var due = stageDate(pr, st);
        
 
        if (due >= t) scheduled += rest;
        else overdue += rest;
      });
    });
    return { scheduled: scheduled, overdue: overdue };
  }

   
  function outstandingTotal(list) {
    var sum = 0;
    (list || state.data.projects).forEach(function (pr) {
      if (pr.status === 'cancelled') return;
      sum += Math.max(0, pr.budget - journalNet(pr));
    });
    return sum;
  }

   
  function monthlyIncome(list) {
    var months = [];
    var t = today();
    for (var i = 5; i >= 0; i--) {
      var d = new Date(t.getFullYear(), t.getMonth() - i, 1);
      months.push({ key: d.getFullYear() + '-' + d.getMonth(), date: d, sum: 0, count: 0 });
    }
    (list || state.data.projects).forEach(function (pr) {
      if (pr.status === 'cancelled') return;
      var d = shootDate(pr);
      var key = d.getFullYear() + '-' + d.getMonth();
      months.forEach(function (m) {
        if (m.key === key) { m.sum += journalNet(pr); m.count++; }
      });
    });
    return months;
  }

  function viewAnalytics() {
    var scope = analyticsScope();
    var list = analyticsProjects();
    var r = analyticsRange();
    var months = monthlyIncome(scope);
    var max = Math.max.apply(null, months.map(function (m) { return m.sum; }).concat([1]));
    var total = months.reduce(function (s, m) { return s + m.sum; }, 0);

    
 
    var shoots = list.filter(function (pr) { return pr.status === 'completed'; }).length;
    var received = receivedInPeriod(scope, r.start, r.end);
    var avgCheck = shoots > 0 ? Math.round(received / shoots) : null;
    var sched = scheduleTotals(scope);

    var html = '<div class="app-section-row"><h4>Детализация по периоду</h4></div>';
    html += '<div class="app-chips app-scroll-chips">' + ANALYTICS_PERIODS.map(function (it) {
      return '<button type="button" data-aperiod="' + it[0] + '" aria-pressed="' + (state.analyticsPeriod === it[0]) + '">' + it[1] + '</button>';
    }).join('') + '</div>';

    var usedTypes = (state.data.types || []).filter(function (t) {
      return state.data.projects.some(function (pr) { return pr.type === t.name; });
    });
    if (usedTypes.length) {
      html += '<div class="app-chips app-scroll-chips">' + usedTypes.map(function (t) {
        var on = state.analyticsTypes.indexOf(t.name) >= 0;
        return '<button type="button" data-atype="' + esc(t.name) + '" aria-pressed="' + on + '">' + esc(t.name) + '</button>';
      }).join('') + '</div>';
    }
    html += '<div class="app-chips app-scroll-chips">' +
      [['all', 'Все клиенты'], ['individual', 'Физлица'], ['company', 'Юрлица']].map(function (it) {
        return '<button type="button" data-actype="' + it[0] + '" aria-pressed="' + (state.analyticsClientType === it[0]) + '">' + it[1] + '</button>';
      }).join('') + '</div>';

    html += '<div class="app-card"><div class="app-detail-row"><span>Съёмок</span><b>' + shoots + '</b></div>' +
      '<div class="app-detail-row"><span>Средний чек</span><b>' + (avgCheck === null ? '—' : money(avgCheck)) + '</b></div>' +
      '<div class="app-detail-row"><span>Просрочено</span><b>' + (sched.overdue ? money(sched.overdue) : 'Просроченных нет') + '</b></div>' +
      '</div>';

    html += '<div class="app-card"><div class="app-detail-row"><span>Получено за период</span><b>' + money(received) + '</b></div>' +
      '<div class="app-detail-row"><span>Осталось получить</span><b>' + money(outstandingTotal(scope)) + '</b></div>' +
      '<div class="app-detail-row"><span>К оплате по графику</span><b>' + money(sched.scheduled) + '</b></div>' +
      '</div>';

    var w = 300, h = 116, gap = 10;
    var barW = (w - gap * (months.length - 1)) / months.length;
    var bars = months.map(function (m, i) {
      var bh = Math.max(3, Math.round(m.sum / max * (h - 14)));
      var x = i * (barW + gap);
      return '<rect x="' + x.toFixed(1) + '" y="' + (h - bh).toFixed(1) + '" width="' + barW.toFixed(1) +
        '" height="' + bh + '" rx="6" fill="var(--accent-ink)"/>' +
        '<text x="' + (x + barW / 2).toFixed(1) + '" y="' + (h + 14) + '" text-anchor="middle" font-size="10" fill="var(--ink-2)">' +
        MONTHS_SHORT[m.date.getMonth()] + '</text>';
    }).join('');

    html += '<div class="app-section-row"><h4>Доходы по месяцам</h4></div>' +
      '<div class="app-section-row"><h4 style="font-size:12px;color:var(--ink-2);font-weight:400">по дате съёмки</h4></div>' +
      '<div class="app-chart"><svg viewBox="0 0 ' + w + ' ' + (h + 18) + '" role="img" aria-label="Доходы по месяцам">' + bars + '</svg>' +
      '<div class="app-chart-legend"><span>Итого: ' + money(total) + '</span><span>' + months.length + ' мес.</span></div></div>';

    html += '<div class="app-list">' + months.map(function (m) {
      return '<div class="app-row"><span><b>' + MONTHS_NOM[m.date.getMonth()] + '</b><small>' + m.count + ' ' +
        plural(m.count, 'съёмка', 'съёмки', 'съёмок') + '</small></span>' +
        '<span class="num">' + money(m.sum) + '</span></div>';
    }).join('') + '</div>';

    var est = estimatedTax(received);
    html += '<div class="app-card"><div class="app-detail-row"><span>Расчётный налог</span><b>' + money(est) + '</b></div>' +
      '<p class="app-tax-note">Расчёт по активному налоговому профилю. Значение предварительное — сверяйтесь с декларацией.</p></div>';

    return html;
  }

   
  function estimatedTax(income) {
    var profiles = state.data.taxProfiles || [];
    var active = profiles.filter(function (p) { return p.active; });
    if (!active.length) return 0;
    var rate = 0;
    active.forEach(function (p) {
      (p.rates || []).forEach(function (r) { rate = Math.max(rate, r.percent); });
    });
    return Math.round(income * rate / 100);
  }

   

  

 
  function viewShoots() {
    var html = '<div class="app-section-row"><h4>Справочник видов съёмки</h4></div>';

    (state.data.types || []).forEach(function (t) {
      var prs = projectsOfType(t.name);
      html += '<div class="app-shoot-row">' +
        '<i style="background:' + t.color + '"></i>' +
        '<button class="app-shoot-main" type="button" data-type="' + esc(t.name) + '">' +
        '<b>' + esc(t.name) + '</b>' +
        (prs.length ? '<small>' + prs.length + ' ' + plural(prs.length, 'проект', 'проекта', 'проектов') + '</small>' : '') +
        '</button>' +
        '<button class="app-link-btn" type="button" data-act="type-edit" data-type="' + esc(t.name) + '">Изменить</button>' +
        '<button class="app-link-btn app-link-danger" type="button" data-act="type-delete" data-type="' + esc(t.name) + '">Удалить</button>' +
        '</div>';
    });
    return html;
  }

   

  
 
  function viewCalendar() {
    var html = '<div class="app-cal-text"><b>Два коротких пути:</b><br>' +
      '1. Календари телефона — одно нажатие, без пароля. Сюда попадают Google и другие календари, уже синхронизированные на телефоне.<br>' +
      '2. Яндекс — логин и пароль приложения; ссылка на Яндекс ID прямо в диалоге.</div>' +
      '<div class="app-card" style="margin:0">' +
      '<button class="app-setting" type="button" data-act="cal-phone"><span><b>Календари телефона</b></span></button>' +
      '<button class="app-setting" type="button" data-act="cal-yandex"><span><b>Подключить Яндекс</b></span></button>' +
      '<button class="app-setting app-setting-link" type="button" data-act="cal-google-token"><span><b>Google по токену (вручную)</b></span></button>' +
      '<button class="app-setting app-setting-link" type="button" data-act="cal-google-oauth"><span><b>Google по OAuth (вход в аккаунт)</b></span></button>' +
      '</div>' +
      '<div class="app-cal-text app-cal-text-muted">Пока нет подключений. Нажмите «Календари телефона» — всё, что уже синхронизировано на телефоне, появится сразу и без пароля. Или подключите Яндекс.</div>';
    return html;
  }

   

  
 
  function seedTaxProfiles() {
    var from = isoDate(today());
    return [
      {
        id: 'tp1', name: 'НПД — самозанятый', jurisdiction: 'RU', regime: 'НПД',
        active: false, from: from, to: null,
        rates: [
          { title: 'НПД 4 % (доходы от физлиц)', percent: 4, basis: 'Доходы от физлиц', from: from, to: null },
          { title: 'НПД 6 % (доходы от юрлиц и ИП)', percent: 6, basis: 'Доходы от юрлиц и ИП', from: from, to: null }
        ]
      },
      {
        id: 'tp2', name: 'УСН «Доходы»', jurisdiction: 'RU', regime: 'УСН',
        active: false, from: from, to: null,
        rates: [{ title: 'УСН «Доходы» 6 %', percent: 6, basis: 'Доходы', from: from, to: null }]
      }
    ];
  }

  function viewTax() {
    var profiles = state.data.taxProfiles || [];
    var selected = null;
    profiles.forEach(function (p) { if (p.id === state.taxProfileId) selected = p; });

    var html = '<div class="app-section-row"><h4>Налоговые профили</h4></div>';
    if (!profiles.length) {
      html += '<p class="app-empty" style="padding:0 0 12px">Профиль задаёт налоговый режим: добавьте его, и налоги посчитаются сами.</p>';
    }
    profiles.forEach(function (p) {
      var subtitle = p.jurisdiction + ' · ' + p.regime + ' · ' + (p.active ? 'активен' : 'неактивен');
      html += '<div class="app-card" style="margin:0 0 8px;padding:12px 14px">' +
        '<div class="app-setting" style="padding:0">' +
        '<button type="button" data-act="tax-select" data-id="' + p.id + '" class="app-plain-btn">' +
        '<span><b>' + esc(p.name) + '</b><small>' + esc(subtitle) + '</small></span></button>' +
        '<button class="app-link-btn" type="button" data-act="tax-edit" data-id="' + p.id + '">Изменить</button>' +
        '<button class="app-link-btn app-link-danger" type="button" data-act="tax-delete" data-id="' + p.id + '">Удалить</button>' +
        '</div></div>';
    });
    if (profiles.length >= 2) {
      html += '<p class="app-tax-note" style="padding:0 0 12px">Два готовых режима уже созданы — включите один из них</p>';
    }
    html += '<button class="btn btn-ghost btn-block" type="button" data-act="tax-add-profile">Добавить профиль</button>';

    if (selected) {
      html += '<div class="app-section-row" style="margin-top:16px"><h4>Ставки · ' + esc(selected.name) + '</h4></div>';
      (selected.rates || []).forEach(function (r) {
        html += '<div class="app-detail-row"><span>' + esc(r.title) + '</span><b>' + r.percent + ' %</b></div>' +
          '<div class="app-detail-row"><span>' + esc(r.basis) + '</span><b>' + esc(r.from) +
          (r.to ? ' — ' + esc(r.to) : ' — по сей день') + '</b></div>';
      });
      html += '<button class="btn btn-ghost btn-block" type="button" data-act="tax-add-rate" data-id="' + selected.id + '">Добавить ставку</button>';
    }

    return html;
  }

  function sheetTaxProfileForm() {
    var html = '<h3>Новый налоговый профиль</h3>' +
      '<p class="app-sheet-sub">Профиль задаёт режим и ставки. По умолчанию всё выключено.</p>' +
      '<div class="app-form">' +
      '<label>Название профиля<input type="text" id="tp-name" placeholder="НПД — самозанятый"></label>' +
      '<label>Режим<select id="tp-regime">' +
      ['НПД', 'УСН', 'ОСНО', 'ПСН', 'АУСН'].map(function (r) { return '<option>' + r + '</option>'; }).join('') +
      '</select></label>' +
      '<label>Ставка, %<input type="text" id="tp-rate" data-money inputmode="decimal" placeholder="6"></label>' +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="tax-save-profile">Создать</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Отмена</button>' +
      '</div></div>';
    openSheet(html);
  }

  function sheetTaxRateForm(profileId) {
    var html = '<h3>Новая ставка</h3>' +
      '<div class="app-form">' +
      '<label>Название ставки<input type="text" id="tr-title" placeholder="НПД 4 % (доходы от физлиц)"></label>' +
      '<label>Ставка, %<input type="text" id="tr-rate" data-money inputmode="decimal" placeholder="4"></label>' +
      '<label>База<select id="tr-basis"><option>Доходы от физлиц</option><option>Доходы от юрлиц и ИП</option>' +
      '<option>Доходы</option><option>Доходы минус расходы</option></select></label>' +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="tax-save-rate" data-id="' + profileId + '">Добавить</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Отмена</button>' +
      '</div></div>';
    openSheet(html);
  }

  
 
  function sheetTaxProfileEdit(profileId) {
    var p = null;
    (state.data.taxProfiles || []).forEach(function (x) { if (x.id === profileId) p = x; });
    if (!p) return;
    var html = '<h3>Изменить профиль</h3>' +
      '<div class="app-form">' +
      '<label>Название профиля<input type="text" id="te-name" value="' + esc(p.name) + '"></label>' +
      '<label>Режим<select id="te-regime">' +
      ['НПД', 'УСН', 'ОСНО', 'ПСН', 'АУСН'].map(function (r) {
        return '<option' + (p.regime === r ? ' selected' : '') + '>' + r + '</option>';
      }).join('') + '</select></label>' +
      '<label class="app-check"><input type="checkbox" id="te-active"' + (p.active ? ' checked' : '') + '>' +
      '<span>Профиль активен</span></label>' +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="tax-save-edit" data-id="' + p.id + '">Сохранить</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Отмена</button>' +
      '</div></div>';
    openSheet(html);
  }

   

  function viewPro() {
    var pro = state.data.pro;
    var html = '<div class="app-pro-hero">' +
      '<small>FOTRIVA Pro</small>' +
      '<h3>' + (pro ? 'Лицензия активна' : 'Пробный период') + '</h3>' +
      '<p>' + (pro ? 'Все функции открыты навсегда' : 'Осталось 18 дней из 30') + '</p>' +
      '<span class="app-pro-badge">' + (pro ? 'Pro' : 'Free') + '</span>' +
      '</div>';

    html += '<div class="app-card">' +
      settingRow('key', 'Ключ активации', pro ? 'Введён' : 'Введите ключ из письма') +
      settingRow('money', 'Без ограничений', 'Любое число проектов') +
      settingRow('tax', 'Все налоговые режимы', 'НПД, УСН, ОСНО + НДС') +
      settingRow('backup', 'Резервные копии', 'AES-256-GCM') +
      '</div>';

    if (!pro) {
      html += '<div class="app-form" style="padding:0 16px">' +
        '<label>Ключ активации<input type="text" id="pro-key" placeholder="FOTRIVA-XXXX-XXXX-XXXX"></label>' +
        '<button class="btn btn-primary btn-block" type="button" data-act="pro-activate">Активировать ключ</button>' +
        '<button class="btn btn-ghost btn-block" type="button" data-act="pro-buy">Купить ключ</button>' +
        '</div>';
    }

    html += '<p class="app-tax-note">Разовая оплата — навсегда. Без подписки и продлений: обновления бесплатны, гарантия 14 дней.</p>';
    return html;
  }

  function settingRow(ico, title, value, extra) {
    return '<button class="app-setting" type="button"' + (extra ? ' data-act="' + extra + '"' : '') + '>' +
      icon(ico, 'ico') +
      '<span><b>' + esc(title) + '</b>' + (value ? '<small>' + esc(value) + '</small>' : '') + '</span>' +
      '</button>';
  }

   

  function viewSettings() {
    var p = state.data.prefs = state.data.prefs || {};
    function sw(key, on, label, sub) {
      return '<div class="app-setting">' + icon('check', 'ico') +
        '<span><b>' + esc(label) + '</b><small>' + esc(sub) + '</small></span>' +
        '<button class="app-switch" type="button" data-act="pref" data-key="' + key + '" aria-pressed="' +
        (on ? 'true' : 'false') + '" aria-label="' + esc(label) + '"></button></div>';
    }
    function section(title) {
      return '<div class="app-section-row"><h4>' + esc(title) + '</h4></div>';
    }

    var html = section('Экран');
    html += '<div class="app-card">' +
      sw('greeting', p.greeting !== false, 'Приветствие на главной', '«Добрый вечер» в зависимости от времени суток') +
      sw('todayDate', p.todayDate !== false, 'Число на главной', 'Плашка с сегодняшней датой и годом') +
      sw('privacy', !!p.privacy, 'Скрыть деньги', 'Глазик на главной и звёздочки вместо сумм во всём приложении. Данные и расчёты не меняются') +
      sw('monthLoad', p.monthLoad !== false, 'Загрузка месяца', 'Полоска на главном экране: сколько съёмок в каждый день') +
      '</div>';

    html += section('Основной профиль съёмок');
    html += '<div class="app-card"><div class="app-theme-switch" style="display:inline-grid;grid-template-columns:auto auto auto;gap:6px">' +
      [['photo', 'Фото'], ['video', 'Видео'], ['both', 'Фото и видео']].map(function (it) {
        return '<button type="button" data-act="profile" data-value="' + it[0] + '" aria-pressed="' +
          ((p.profile || 'both') === it[0]) + '">' + it[1] + '</button>';
      }).join('') + '</div></div>';

    html += section('Подсказки');
    html += '<div class="app-card">' +
      sw('hints', p.hints !== false, 'Показывать подсказки', 'Короткие ненавязчивые подсказки на главном экране') +
      '</div>';

    html += section('Напоминания');
    html += '<div class="app-card">' +
      sw('reminders', p.reminders !== false, 'О съёмках накануне', 'Тихое уведомление с завтрашним расписанием, не чаще раза в день') +
      sw('montageReminders', p.montageReminders !== false, 'О висящем монтаже', 'Проекты в монтаже дольше 14 дней после съёмки') +
      sw('receiptReminders', p.receiptReminders !== false, 'О чеках НПД', 'Оплаты за последние 7 дней, по которым стоит выпустить чек в «Мой налог»') +
      '</div>';

    html += '<div class="app-card">' +
      settingRow('key', 'FOTRIVA Pro', state.data.pro ? 'Лицензия активна' : 'Бесплатная', 'go-pro') +
      '</div>';

    html += section('Синхронизация');
    html += '<div class="app-card">' +
      settingRow('calendar', 'Календари и синхронизация', 'Подключение Яндекс и Google', 'go-calendar') +
      '</div>';

    html += section('Резервные копии');
    html += '<div class="app-card">' +
      settingRow('backup', 'Пароль резервных копий', 'Шифрование AES-256-GCM', 'go-backup') +
      settingRow('cloud', 'Облако и копии', 'Папка облака, автокопия раз в сутки', 'go-backup') +
      '</div>';

    html += section('О приложении');
    html += '<div class="app-card">' +
      settingRow('info', 'Политика конфиденциальности', 'Какие данные хранятся и как они используются', 'go-privacy') +
      '</div>';
    html += '<p class="app-tax-note">Версия 1.1.17 · FOTRIVA — приложение для съёмочного бизнеса. Все права защищены.</p>';

    html += '<div class="app-card">' +
      '<button class="app-setting" type="button" data-act="clear-demo"><span class="ico">' + icon('trash') + '</span>' +
      '<span><b>Завершить тестовый режим</b><small>Удалить примеры проектов и клиентов</small></span></button>' +
      '</div>';

    html += '<p class="app-tax-note">Прототип веб-версии приложения: данные хранятся только в этом браузере и никуда не отправляются.</p>';
    return html;
  }

   

  var sheet = { backdrop: null, box: null };

  function openSheet(html) {
    sheet.box.innerHTML = '<div class="app-sheet-grip"></div>' + html;
    sheet.box.classList.add('open');
    sheet.backdrop.classList.add('open');
    sheet.box.setAttribute('aria-hidden', 'false');
    var focusable = sheet.box.querySelector('input, select, button');
    if (focusable) setTimeout(function () { focusable.focus(); }, 240);
  }
  function closeSheet() {
    sheet.box.classList.remove('open');
    sheet.backdrop.classList.remove('open');
    sheet.box.setAttribute('aria-hidden', 'true');
  }

  


 
  function sheetProject(id) {
    var pr = null;
    state.data.projects.forEach(function (x) { if (x.id === id) pr = x; });
    if (!pr) return;
    var client = clientById(pr.clientId);
    var d = shootDate(pr);
    var paid = receivedOf(pr);
    var pending = pendingOf(pr);
    var type = typeByName(pr.type);
    var pct = pr.budget > 0 ? Math.min(100, Math.round(paid / pr.budget * 100)) : 0;

    var html = '<div class="app-proj-head">' +
      '<span class="app-type-bar" style="background:' + type.color + '"></span>' +
      '<h3>' + esc(pr.title) + '</h3>' +
      '<div class="app-proj-sub">' +
      '<button class="app-link-plain" type="button" data-act="open-client" data-id="' + esc(client ? client.id : '') + '">' +
      esc(client ? client.name : 'Без клиента') + '</button>' +
      '<button class="app-chip st-' + pr.status + '" type="button" data-act="status-picker" data-id="' + pr.id + '">' +
      STATUS[pr.status].label + ' ▾</button>' +
      '</div></div>';

    var timeRange = P.formatTimeRange ? P.formatTimeRange(pr.startTime, pr.endTime) : '';
    html += '<div class="app-detail-head">Когда и где</div>' +
      '<div class="app-detail-big">' + fmtDate(d) + '</div>' +
      (timeRange ? '<div class="app-detail-plain">Время: ' + esc(timeRange) + '</div>' : '') +
      '<div class="app-detail-plain">' + esc(pr.location || '—') + '</div>';

    html += '<div class="app-detail-head">Клиент</div>' +
      '<div class="app-detail-big">' + esc(client ? client.name : 'Без клиента') + '</div>' +
      '<div class="app-detail-plain">' + esc(client && client.phone ? client.phone : '—') + '</div>' +
      (client && client.email ? '<div class="app-detail-plain">' + esc(client.email) + '</div>' : '');

    html += '<div class="app-detail-head">Финансы</div>' +
      '<div class="app-fin-grid">' +
      '<div><b class="' + (paid > 0 ? 'pos' : '') + '">' + money(paid) + '</b><small>Предоплата</small></div>' +
      '<div><b>' + money(pr.budget) + '</b><small>Бюджет</small></div>' +
      '</div>' +
      '<div class="app-progress"><i style="width:' + pct + '%"></i></div>' +
      '<div class="app-detail-row" style="margin-top:10px"><span>Остаток</span><b>' + money(pending) + '</b></div>';

    
 
    if ((pr.stages || []).length) {
      html += '<div class="app-detail-head">График оплаты</div>';
      html += '<ul class="app-timeline">';
      pr.stages.forEach(function (st) {
        html += '<li><i></i><span>' + esc(st.title) + '</span>' +
          '<small>' + money(st.amount) + ' · до ' + fmtDate(stageDate(pr, st)) + '</small></li>';
      });
      html += '</ul>';
    }

    html += '<div class="app-detail-head">Журнал операций</div>';
    if ((pr.tx || []).length) {
      html += '<ul class="app-timeline">';
      pr.tx.slice().sort(function (a, b) { return (b.offset || 0) - (a.offset || 0); }).forEach(function (t) {
        html += '<li class="' + (t.kind === 'refund' ? '' : 'done') + '"><i></i><span>' +
          esc(t.method || (t.kind === 'refund' ? 'Возврат' : 'Оплата')) + '</span>' +
          '<small>' + (t.kind === 'refund' ? '−' : '') + money(t.amount) + ' · ' + fmtDate(txDate(pr, t)) + '</small></li>';
      });
      html += '</ul>';
    } else {
      html += '<p class="app-detail-plain">Оплат пока не было.</p>';
    }

    
 
    var expenses = pr.expenses || [];
    html += '<div class="app-detail-head">Расходы</div>';
    if (expenses.length) {
      html += '<div class="app-detail-row"><span>Всего расходов</span><b>' +
        money(P.expenseTotal ? P.expenseTotal(expenses) : 0) + '</b></div>';
      expenses.forEach(function (ex) {
        html += '<div class="app-expense">' +
          '<div class="app-expense-head"><b>' + esc(ex.category) + '</b>' +
          '<span class="num">' + money(ex.amount) + '</span></div>' +
          (ex.note ? '<small>' + esc(ex.note) + '</small>' : '') +
          '<div class="app-expense-actions">' +
          '<button class="app-link-plain" type="button" data-act="expense-edit" data-project="' + pr.id +
          '" data-id="' + esc(ex.id) + '">Изменить</button>' +
          '<button class="app-link-danger" type="button" data-act="expense-delete" data-project="' + pr.id +
          '" data-id="' + esc(ex.id) + '">Удалить</button>' +
          '</div></div>';
      });
    } else {
      html += '<p class="app-detail-plain">Расходов пока нет.</p>';
    }
    html += '<button class="btn btn-ghost btn-sm" type="button" data-act="expense-add" data-project="' + pr.id +
      '">Добавить расход</button>';

    if (pr.notes) html += '<div class="app-detail-head">Заметки</div>' +
      '<p class="app-detail-plain">' + esc(pr.notes) + '</p>';

    html += '<div class="app-sheet-actions">';
     
    if (pending > 0) {
      html += '<button class="btn btn-primary btn-block" type="button" data-act="mark-paid" data-id="' + pr.id + '">Отметить как оплаченный</button>';
    }
    html += '<button class="btn btn-ghost btn-block" type="button" data-act="pay" data-id="' + pr.id + '">Зафиксировать оплату</button>';
    html += '<button class="btn btn-ghost btn-sm" type="button" data-act="delete-project" data-id="' + pr.id + '">Удалить проект</button>';
    html += '</div>';

    html += '<div class="app-form" id="pay-form" hidden>' +
      '<label>Сумма оплаты, ₽<input type="text" id="pay-amount" data-money inputmode="numeric" placeholder="10000"></label>' +
      '<label>Способ оплаты<select id="pay-method">' +
      ['Карта', 'Наличные', 'Перевод', 'Безнал РКО'].map(function (m) { return '<option>' + m + '</option>'; }).join('') +
      '</select></label>' +
      (pr.stages && pr.stages.length
        ? '<label>Записать на этап<select id="pay-stage"><option value="-1">Без этапа</option>' +
          pr.stages.map(function (st, i) {
            return '<option value="' + i + '">' + esc(st.title) + ' · ' + money(st.amount) + '</option>';
          }).join('') + '</select></label>'
        : '') +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="pay-save" data-id="' + pr.id + '">Записать</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="pay-cancel">Отмена</button>' +
      '</div></div>';

    openSheet(html);
  }

  

 
  function sheetExpense(projectId, expenseId) {
    var pr = null;
    state.data.projects.forEach(function (x) { if (x.id === projectId) pr = x; });
    if (!pr) return;
    var ex = null;
    if (expenseId) {
      (pr.expenses || []).forEach(function (x) { if (x.id === expenseId) ex = x; });
    }
    var presets = P.PRESET_CATEGORIES || ['Такси', 'Печать', 'Подрядчик'];
    var html = '<h3>' + (ex ? 'Расход' : 'Новый расход') + '</h3>' +
      '<p class="app-sheet-sub">Затраты на съёмку: такси, печать, подрядчик. В «Получено» и в налоговую базу не входят.</p>' +
      '<div class="app-form">' +
      '<label>Статья<input type="text" id="ex-category" value="' + esc(ex ? ex.category : '') +
      '" placeholder="Например: Печать книжки"></label>' +
      '<div class="app-chips">' +
      presets.map(function (c) {
        return '<button type="button" data-act="expense-preset" data-value="' + esc(c) + '">' + esc(c) + '</button>';
      }).join('') +
      '</div>' +
      '<label>Сумма, ₽<input type="text" id="ex-amount" data-money inputmode="numeric" value="' +
      (ex ? esc(String(ex.amount)) : '') + '" placeholder="1500"></label>' +
      '<label>Заметка<input type="text" id="ex-note" value="' + esc(ex && ex.note ? ex.note : '') +
      '" placeholder="Необязательно"></label>' +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="expense-save" data-project="' + pr.id +
      '" data-id="' + esc(ex ? ex.id : '') + '">Сохранить</button>' +
      (ex ? '<button class="btn btn-ghost btn-sm" type="button" data-act="expense-delete" data-project="' + pr.id +
        '" data-id="' + esc(ex.id) + '">Удалить</button>' : '') +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="expense-cancel" data-project="' + pr.id +
      '">Отмена</button>' +
      '</div></div>';
    openSheet(html);
  }

  
 
  function sheetStatusPicker(id) {
    var current = null;
    state.data.projects.forEach(function (x) { if (x.id === id) current = x.status; });
    var allowed = [
      { id: 'assigned', label: 'Назначена' },
      { id: 'in_progress', label: 'В обработке' },
      { id: 'montage', label: 'В монтаже' },
      { id: 'completed', label: 'Завершена' }
    ];
    var html = '<h3>Статус проекта</h3>' +
      '<p class="app-sheet-sub">Отменённый статус выбрать вручную нельзя.</p>' +
      '<div class="app-list">' +
      allowed.map(function (s) {
        return '<button class="app-row" type="button" data-act="set-status" data-id="' + esc(id) + '" data-status="' + s.id + '"' +
          (current === s.id ? ' aria-pressed="true"' : '') + '><span><b>' + s.label + '</b></span></button>';
      }).join('') +
      '</div>' +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Закрыть</button></div>';
    openSheet(html);
  }

  
 
  function sheetClient(id) {
    var c = clientById(id);
    if (!c) return;
    var prs = state.data.projects.filter(function (pr) { return pr.clientId === id; });
    var sum = prs.reduce(function (s, pr) { return s + pr.budget; }, 0);

    var html = '<div class="app-client-head">' +
      '<span class="app-avatar" style="background:' + avatarColor(c.id) + '">' + initials(c.name) + '</span>' +
      '<h3>' + esc(c.name) + '</h3></div>';

    html += '<div class="app-detail-head">Контакты</div>' +
      '<div class="app-detail-plain">' + esc(c.phone || '—') + '</div>' +
      (c.email ? '<div class="app-detail-plain">' + esc(c.email) + '</div>' : '');

    
 
    var methods = ['Телефон', 'WhatsApp', 'Telegram', 'МАКС'];
    var method = c.method || 'Телефон';
    html += '<div class="app-detail-head">Способ связи</div>' +
      '<div class="app-chips">' +
      methods.map(function (m) {
        return '<button type="button" data-act="client-method" data-id="' + esc(c.id) + '" data-method="' +
          esc(m) + '" aria-pressed="' + (method === m ? 'true' : 'false') + '">' + esc(m) + '</button>';
      }).join('') +
      '</div>';
    if (method === 'МАКС' && c.phone) {
      html += '<button class="btn btn-ghost btn-sm" type="button" data-act="open-max" data-id="' + esc(c.id) +
        '">Открыть МАКС</button>';
    }

    html += '<div class="app-detail-head app-detail-head-row"><span>Проекты</span>' +
      '<span>' + prs.length + ' ' + plural(prs.length, 'проект', 'проекта', 'проектов') + ' · ' + money(sum) + '</span></div>';
    prs.forEach(function (pr) { html += clientProjectRow(pr); });
    if (!prs.length) {
      html += '<p class="app-detail-plain">У клиента пока нет проектов.</p>';
    }

    html += '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="new-for-client" data-id="' + c.id + '">Создать проект для этого клиента</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Закрыть</button></div>';
    openSheet(html);
  }

  
 
  function clientProjectRow(pr) {
    var type = typeByName(pr.type);
    var d = shootDate(pr);
    return '<div class="app-project" data-project="' + pr.id + '" role="button" tabindex="0">' +
      '<span class="app-type-bar" style="background:' + type.color + '"></span>' +
      '<span class="app-project-main">' +
      '<h5>' + esc(pr.title) + '</h5>' +
      '<p class="small">' + d.getDate() + ' ' + MONTHS_GEN[d.getMonth()] + ' · ' + esc(pr.type) + '</p>' +
      '</span>' +
      '<span class="app-project-side">' +
      '<span class="app-chip st-' + pr.status + '">' + STATUS[pr.status].label + '</span>' +
      '<span class="app-project-budget"><b>' + money(pr.budget) + '</b></span>' +
      '</span></div>';
  }

  
 
  function importContactsHtml() {
    var filtered = P.filterContacts ? P.filterContacts(DEMO_CONTACTS, state.importQuery) : DEMO_CONTACTS.slice();
    var sel = state.importSel || {};
    var selectedCount = 0;
    Object.keys(sel).forEach(function (k) { if (sel[k]) selectedCount++; });
    var html = '<h3>Импорт контактов</h3>' +
      '<p class="app-sheet-sub">Отметьте контакты из записной книжки — они попадут в справочник клиентов. Пока ничего не отмечено, ничего не импортируется.</p>' +
      '<div class="app-search">' + icon('search') +
      '<input type="search" id="ic-search" placeholder="Поиск по имени или телефону" value="' +
      esc(state.importQuery) + '" aria-label="Поиск контактов"></div>' +
      '<p class="app-sheet-sub">Контактов: ' + filtered.length + ' · выбрано: ' + selectedCount + '</p>' +
      '<div class="app-list">';
    filtered.forEach(function (c) {
      html += '<button class="app-row" type="button" data-act="ic-toggle" data-id="' + esc(c.id) + '" aria-pressed="' +
        (sel[c.id] ? 'true' : 'false') + '">' +
        '<i style="background:' + avatarColor(c.id) + '"></i>' +
        '<span><b>' + esc(c.name) + '</b><small>' + esc(c.phone) + '</small></span>' +
        '<span class="num">' + (sel[c.id] ? '✓' : '') + '</span></button>';
    });
    if (!filtered.length) html += '<p class="app-empty">Ничего не найдено.</p>';
    html += '</div>' +
      '<div class="app-chips">' +
      '<button type="button" data-act="ic-all">Выбрать всех</button>' +
      '<button type="button" data-act="ic-none">Снять выбор</button>' +
      '</div>' +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="ic-import">Импортировать</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="ic-cancel">Отмена</button>' +
      '</div>';
    return html;
  }

  function sheetImportContacts() {
    state.importSel = {};
    state.importQuery = '';
    openSheet(importContactsHtml());
  }

  function refreshImportSheet() {
    if (!sheet.box) return;
    sheet.box.innerHTML = '<div class="app-sheet-grip"></div>' + importContactsHtml();
  }

  function importSelectedContacts() {
    var sel = state.importSel || {};
    var ids = [];
    Object.keys(sel).forEach(function (k) { if (sel[k]) ids.push(k); });
    var result = P.importContacts
      ? P.importContacts(DEMO_CONTACTS, ids, state.data.clients)
      : { imported: [], skipped: 0 };
    state.importSel = {};
    state.importQuery = '';
    if (!result.imported.length) {
      closeSheet();
      render();
      toast(ids.length
        ? 'Все выбранные контакты уже есть в справочнике (' + result.skipped + ')'
        : 'Ничего не выбрано');
      return;
    }
    var stamp = Date.now();
    result.imported.forEach(function (c, i) {
      state.data.clients.push({
        id: 'ci' + stamp + '-' + i,
        name: c.name,
        phone: c.phone,
        email: '',
        type: 'individual'
      });
    });
    saveState();
    closeSheet();
    render();
    toast('Импортировано: ' + result.imported.length +
      (result.skipped ? ' · пропущено (уже есть): ' + result.skipped : ''));
  }

   
  function sheetClearContacts() {
    var doomed = P.clientsWithoutShoots
      ? P.clientsWithoutShoots(state.data.clients, state.data.projects)
      : [];
    if (!doomed.length) { toast('Нет контактов без съёмок — очищать нечего'); return; }
    var html = '<h3>Очистить контакты</h3>' +
      '<p class="app-sheet-sub">Будет удалено контактов без съёмок: ' + doomed.length +
      '. Клиенты, у которых есть съёмки, останутся в справочнике.</p>' +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="clear-contacts-confirm">Удалить</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Отмена</button>' +
      '</div>';
    openSheet(html);
  }

   
  function copyText(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(String(text || ''));
        return true;
      }
    } catch (e) {   }
    return false;
  }

   
  function sheetReferenceMenu() {
    var html = '<h3>Ещё</h3>' +
      '<div class="app-card" style="margin:0">' +
      menuRow('tax', 'Налоги', 'go-tax') +
      menuRow('backup', 'Резервная копия', 'go-backup') +
      '</div>' +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Закрыть</button></div>';
    openSheet(html);
  }

  function menuRow(ico, title, act) {
    return '<button class="app-setting" type="button" data-act="' + act + '">' + icon(ico, 'ico') +
      '<span><b>' + esc(title) + '</b></span></button>';
  }

  
 
  function sheetFilter() {
    var f = state.filters;
    function row(id, label, on) {
      return '<label class="app-check"><input type="checkbox" data-filter="' + id + '"' + (on ? ' checked' : '') +
        '><span>' + esc(label) + '</span></label>';
    }
    var html = '<h3>Показывать</h3>' +
      row('active', 'Активные', f.active) +
      row('completed', 'Завершённые', f.completed) +
      row('cancelled', 'Отменённые', f.cancelled) +
      row('undelivered', 'Не отправлено', f.undelivered) +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="close-sheet">Готово</button>' +
      '</div>';
    openSheet(html);
  }

   
  function sheetPickClient() {
    var html = '<h3>Клиент</h3><p class="app-sheet-sub">Показывать проекты одного клиента.</p>' +
      '<div class="app-list">' +
      '<button class="app-row" type="button" data-pick-client=""' + (state.filters.client ? '' : ' aria-pressed="true"') + '>' +
      '<span><b>Все клиенты</b></span></button>' +
      state.data.clients.map(function (c) {
        return '<button class="app-row" type="button" data-pick-client="' + c.id + '"' +
          (state.filters.client === c.id ? ' aria-pressed="true"' : '') + '>' +
          '<span><b>' + esc(c.name) + '</b><small>' + esc(c.phone || '') + '</small></span></button>';
      }).join('') +
      '</div><div class="app-sheet-actions">' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Закрыть</button></div>';
    openSheet(html);
  }

  function sheetPickType() {
    var html = '<h3>Тип съёмки</h3><p class="app-sheet-sub">Показывать проекты одного вида съёмки.</p>' +
      '<div class="app-list">' +
      '<button class="app-row" type="button" data-pick-type=""' + (state.filters.type ? '' : ' aria-pressed="true"') + '>' +
      '<span><b>Все типы</b></span></button>' +
      (state.data.types || []).map(function (t) {
        var n = state.data.projects.filter(function (pr) { return pr.type === t.name; }).length;
        if (!n) return '';
        return '<button class="app-row" type="button" data-pick-type="' + esc(t.name) + '"' +
          (state.filters.type === t.name ? ' aria-pressed="true"' : '') + '>' +
          '<i style="background:' + t.color + '"></i>' +
          '<span><b>' + esc(t.name) + '</b><small>' + n + ' ' + plural(n, 'проект', 'проекта', 'проектов') + '</small></span></button>';
      }).join('') +
      '</div><div class="app-sheet-actions">' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Закрыть</button></div>';
    openSheet(html);
  }

  

 
  function sheetTypeProjects(typeName) {
    var prs = projectsOfType(typeName).filter(function (pr) { return pr.status !== 'cancelled'; });
    var sections = [
      { title: 'Будущие', test: function (pr) { return pr.status === 'planned' || pr.status === 'assigned'; } },
      { title: 'В работе', test: function (pr) { return pr.status === 'in_progress'; } },
      { title: 'В монтаже', test: function (pr) { return pr.status === 'montage'; } },
      { title: 'Проведённые', test: function (pr) { return pr.status === 'completed'; } }
    ];
    var html = '<h3>' + esc(typeName) + '</h3>' +
      '<p class="app-sheet-sub">Съёмок: ' + prs.length + '</p>';
    sections.forEach(function (s) {
      var items = prs.filter(s.test);
      if (!items.length) return;
      html += '<div class="app-group-title">' + esc(s.title) + ' · ' + items.length + '</div>';
      items.forEach(function (pr) { html += projectCard(pr); });
    });
    if (!prs.length) {
      html += '<p class="app-empty">В этом виде съёмок пока нет.</p>';
    }
    html += '<div class="app-sheet-actions">' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Закрыть</button></div>';
    openSheet(html);
  }

  
 
  var TYPE_COLORS = [
    '#C0533D', '#D08A2E', '#7D9471', '#A2678A', '#5F8BA6', '#9A6B4F',
    '#D08FA6', '#6FA3A0', '#7E7EA6', '#8F9445', '#8D8F93'
  ];

  function sheetTypeForm(typeName) {
    var t = typeName ? typeByName(typeName) : { name: '', color: TYPE_COLORS[0] };
    var html = '<h3>' + (typeName ? 'Вид съёмки' : 'Новый вид съёмки') + '</h3>' +
      '<p class="app-sheet-sub">Название и цвет. Цвет красит полоску на карточке проекта.</p>' +
      '<div class="app-form">' +
      '<label>Название<input type="text" id="te-type-name" value="' + esc(t.name) + '"></label>' +
      '<div class="app-color-row">' +
      TYPE_COLORS.map(function (c) {
        return '<button type="button" class="app-color-dot' + (c === t.color ? ' on' : '') +
          '" style="background:' + c + '" data-act="type-color" data-color="' + c +
          '" aria-label="Цвет ' + c + '"></button>';
      }).join('') +
      '</div>' +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="type-save" data-type="' + esc(typeName || '') + '">' +
      (typeName ? 'Сохранить' : 'Создать') + '</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Отмена</button>' +
      '</div></div>';
    openSheet(html);
  }

  
 
  function sheetTypeDelete(typeName) {
    if (isAutoType(typeName)) {
      toast('«Без типа съёмки» удалить нельзя: это дом для проектов, у которых нет вида съёмки');
      return;
    }
    var used = projectsOfType(typeName);
    if (used.length) {
      var others = (state.data.types || []).filter(function (t) {
        return t.name !== typeName && !t.auto;
      });
      var html = '<h3>Куда перенести проекты?</h3>' +
        '<p class="app-sheet-sub">«' + esc(typeName) + '» используют проектов: ' + used.length + '</p>' +
        '<div class="app-card" style="margin:0;padding:0">';
      others.forEach(function (t) {
        html += '<button class="app-setting" type="button" data-act="type-assign" data-type="' + esc(typeName) +
          '" data-target="' + esc(t.name) + '"><span><b>' + esc(t.name) + '</b></span></button>';
      });
      html += '<button class="app-setting" type="button" data-act="type-assign" data-type="' + esc(typeName) +
        '" data-target="__new__"><span><b>Создать новый вид</b><small>Проекты переедут на него</small></span></button>' +
        '<button class="app-setting" type="button" data-act="type-assign" data-type="' + esc(typeName) +
        '" data-target=""><span><b>Оставить без вида съёмки</b><small>Проекты попадут в «Без типа съёмки»</small></span></button>' +
        '</div>' +
        '<div class="app-sheet-actions">' +
        '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Отмена</button></div>';
      openSheet(html);
      return;
    }
    var html2 = '<h3>Удалить тип съёмки?</h3>' +
      '<p class="app-sheet-sub">«' + esc(typeName) + '» будет удалён из справочника.</p>' +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="type-delete-confirm" data-type="' + esc(typeName) + '">Удалить</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Отмена</button>' +
      '</div>';
    openSheet(html2);
  }

   
  function applyTypeDelete(typeName, target) {
    state.data.projects.forEach(function (pr) {
      if (pr.type === typeName) pr.type = target || '';
    });
    state.data.types = (state.data.types || []).filter(function (t) { return t.name !== typeName; });
    if (state.filters.type === typeName) state.filters.type = null;
    saveState();
    closeSheet();
    render();
    toast(target ? 'Проекты перенесены, вид удалён' : 'Вид удалён, проекты остались без вида');
  }

  function sheetNewProject(clientId) {
    var clientOptions = state.data.clients.map(function (c) {
      return '<option value="' + c.id + '"' + (c.id === clientId ? ' selected' : '') + '>' + esc(c.name) + '</option>';
    }).join('');
    var typeOptions = (state.data.types || []).map(function (t) {
      return '<option value="' + esc(t.name) + '">' + esc(t.name) + '</option>';
    }).join('');

    var html = '<h3>Новый проект</h3>' +
      '<p class="app-sheet-sub">Название, клиент, вид съёмки, дата и бюджет.</p>' +
      '<div class="app-form">' +
      '<label>Название съёмки<input type="text" id="np-title" placeholder="Например: Портрет в студии"></label>' +
      '<label>Клиент<select id="np-client">' + clientOptions + '</select></label>' +
      '<div class="form-row">' +
      '<label>Вид съёмки<select id="np-type">' + typeOptions + '</select></label>' +
      '<label>Дата съёмки<input type="date" id="np-date" value="' + isoDate(addDays(today(), 3)) + '"></label>' +
      '</div>' +
      '<div class="form-row">' +
      '<label>Время начала<input type="time" id="np-start" value=""></label>' +
      '<label>Время окончания<input type="time" id="np-end" value=""></label>' +
      '</div>' +
      '<div class="form-row">' +
      '<label>Бюджет, ₽<input type="text" id="np-budget" data-money inputmode="numeric" placeholder="60000"></label>' +
      '<label>Предоплата, ₽<input type="text" id="np-deposit" data-money inputmode="numeric" placeholder="20000"></label>' +
      '</div>' +
      '<label>Локация<input type="text" id="np-location" placeholder="Студия, адрес"></label>' +
      '<div class="app-sheet-actions">' +
      '<button class="btn btn-primary btn-sm" type="button" data-act="save-project">Добавить проект</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-act="close-sheet">Отмена</button>' +
      '</div></div>';
    openSheet(html);
  }

  function isoDate(date) {
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var d = String(date.getDate()).padStart(2, '0');
    return date.getFullYear() + '-' + m + '-' + d;
  }

  function nextStatus(status) {
    var i = STATUS_ORDER.indexOf(status);
    if (i === -1 || i === STATUS_ORDER.length - 1) return null;
    return STATUS_ORDER[i + 1];
  }

   

  function saveNewProject() {
    var title = (ROOT.querySelector('#np-title').value || '').trim();
    if (!title) { toast('Введите название съёмки'); return; }
    var budget = parseMoney(ROOT.querySelector('#np-budget').value);
    var deposit = parseMoney(ROOT.querySelector('#np-deposit').value);
    var dateStr = ROOT.querySelector('#np-date').value;
    var offset = 3;
    if (dateStr) {
      var parts = dateStr.split('-');
      var target = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      offset = Math.round((target - today()) / 86400000);
    }
    state.data.projects.push({
      id: 'p' + Date.now(),
      title: title,
      clientId: ROOT.querySelector('#np-client').value,
      type: ROOT.querySelector('#np-type').value,
      location: (ROOT.querySelector('#np-location').value || '').trim(),
      shootOffset: offset,
      budget: budget,
      status: 'assigned',
      completedOffset: null,
      notes: '',
      delivered: false,
      startTime: P.normalizeTime ? P.normalizeTime((ROOT.querySelector('#np-start') || {}).value) : '',
      endTime: P.normalizeTime ? P.normalizeTime((ROOT.querySelector('#np-end') || {}).value) : '',
      stages: deposit > 0 ? [{ title: 'Предоплата', amount: deposit, offset: 0 }] : [],
      tx: deposit > 0 ? [{ kind: 'receipt', amount: deposit, offset: 0, method: 'Карта', stage: 0 }] : []
    });
    saveState();
    closeSheet();
    state.screen = 'home';
    state.period = 'all';
    render();
    toast('Проект добавлен');
  }

  function addPayment(id) {
    var amount = parseMoney(ROOT.querySelector('#pay-amount').value);
    if (!amount) { toast('Введите сумму'); return; }
    var method = (ROOT.querySelector('#pay-method') || {}).value || 'Карта';
    var stageSel = ROOT.querySelector('#pay-stage');
    var stage = stageSel ? Number(stageSel.value) : -1;
    state.data.projects.forEach(function (pr) {
      if (pr.id === id) {
        (pr.tx = pr.tx || []).push({
          kind: 'receipt', amount: amount, offset: 0, method: method, stage: stage
        });
      }
    });
    saveState();
    sheetProject(id);
    render();
    toast('Оплата записана');
  }

   
  function saveExpense(projectId, expenseId) {
    var pr = null;
    state.data.projects.forEach(function (x) { if (x.id === projectId) pr = x; });
    if (!pr) return;
    var rawCategory = (ROOT.querySelector('#ex-category') || {}).value || '';
    var category = P.normalizeCategory ? P.normalizeCategory(rawCategory) : rawCategory.trim();
    var amount = parseMoney((ROOT.querySelector('#ex-amount') || {}).value);
    var note = ((ROOT.querySelector('#ex-note') || {}).value || '').trim();
    var check = P.validateExpense
      ? P.validateExpense(amount, category)
      : { error: (amount > 0 && category) ? null : 'Проверьте сумму и статью' };
    if (check.error) { toast(check.error); return; }
    (pr.expenses = pr.expenses || []);
    if (expenseId) {
      pr.expenses.forEach(function (x) {
        if (x.id !== expenseId) return;
        x.category = category; x.amount = amount; x.note = note;
      });
    } else {
      pr.expenses.push({
        id: 'e' + Date.now() + Math.floor(Math.random() * 1000),
        category: category, amount: amount, note: note
      });
    }
    saveState();
    sheetProject(pr.id);
    render();
    toast(expenseId ? 'Расход сохранён' : 'Расход добавлен');
  }

  function deleteExpense(projectId, expenseId) {
    var pr = null;
    state.data.projects.forEach(function (x) { if (x.id === projectId) pr = x; });
    if (!pr) return;
    pr.expenses = (pr.expenses || []).filter(function (x) { return x.id !== expenseId; });
    saveState();
    sheetProject(pr.id);
    render();
    toast('Расход удалён');
  }

  function saveTaxProfile() {
    var name = (ROOT.querySelector('#tp-name').value || '').trim();
    if (!name) { toast('Введите название профиля'); return; }
    var regime = ROOT.querySelector('#tp-regime').value;
    var rate = parseMoney(ROOT.querySelector('#tp-rate').value);
    var from = isoDate(today());
    var id = 'tp' + Date.now();
    (state.data.taxProfiles = state.data.taxProfiles || []).push({
      id: id, name: name, jurisdiction: 'RU', regime: regime, active: false, from: from, to: null,
      rates: [{ title: regime + ' ' + rate + ' %', percent: rate, basis: 'Доходы', from: from, to: null }]
    });
    state.taxProfileId = id;
    saveState();
    closeSheet();
    render();
    toast('Профиль создан');
  }

  function saveTaxRate(profileId) {
    var title = (ROOT.querySelector('#tr-title').value || '').trim();
    var rate = parseMoney(ROOT.querySelector('#tr-rate').value);
    if (!title || !isFinite(rate) || rate < 0 || rate > 100) { toast('Проверьте название и ставку'); return; }
    var basis = ROOT.querySelector('#tr-basis').value;
    (state.data.taxProfiles || []).forEach(function (p) {
      if (p.id === profileId) {
        (p.rates = p.rates || []).push({
          title: title, percent: rate, basis: basis, from: isoDate(today()), to: null
        });
      }
    });
    saveState();
    closeSheet();
    render();
    toast('Ставка добавлена');
  }

  function advanceProject(id) {
    var next = null;
    state.data.projects.forEach(function (pr) {
      if (pr.id === id) {
        next = nextStatus(pr.status);
        if (next) {
          pr.status = next;
          if (next === 'completed') pr.completedOffset = 0;
        }
      }
    });
    if (!next) return;
    saveState();
    sheetProject(id);
    render();
    toast('Статус: ' + STATUS[next].label);
  }

  function quickComplete(id) {
    state.data.projects.forEach(function (pr) {
      if (pr.id === id) {
        pr.status = 'completed';
        pr.completedOffset = 0;
      }
    });
    saveState();
    render();
    toast('Проект завершён');
  }

  function deleteProject(id) {
    state.data.projects = state.data.projects.filter(function (pr) { return pr.id !== id; });
    saveState();
    closeSheet();
    render();
    toast('Проект удалён');
  }

  function goScreen(screen) {
    state.stack.push(state.screen);
    state.screen = screen;
    closeSheet();
    render();
  }

  function goBack() {
    state.screen = state.stack.pop() || 'home';
    render();
  }

  var toastTimer = null;
  function toast(text) {
    var el = ROOT.querySelector('.app-toast');
    if (!el) return;
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

   

  function bind() {
    ROOT.addEventListener('click', function (e) {
      var target = e.target.closest('[data-tab],[data-period],[data-project],[data-client],[data-type],[data-client-filter],[data-act],[data-filter],[data-pick-client],[data-pick-type],[data-aperiod],[data-atype],[data-actype]');
      if (!target) return;

      if (target.hasAttribute('data-tab')) { state.screen = target.getAttribute('data-tab'); render(); return; }
      if (target.hasAttribute('data-period')) { state.period = target.getAttribute('data-period'); render(); return; }
      if (target.hasAttribute('data-client-filter')) { state.clientFilter = target.getAttribute('data-client-filter'); render(); return; }
      

 
      if (target.hasAttribute('data-type') && !target.hasAttribute('data-act')) {
        sheetTypeProjects(target.getAttribute('data-type'));
        return;
      }
      


 
      if (target.tagName === 'INPUT' && target.hasAttribute('data-filter')) {
        var key = target.getAttribute('data-filter');
        var f = state.filters;
        var want = target.checked;
        if (key === 'active' && !want && !f.completed) { target.checked = true; return; }
        if (key === 'completed' && !want && !f.active) { target.checked = true; return; }
        f[key] = want;
        render();
        return;
      }
      if (target.hasAttribute('data-pick-client')) {
        state.filters.client = target.getAttribute('data-pick-client') || null;
        closeSheet();
        render();
        return;
      }
      if (target.hasAttribute('data-pick-type')) {
        state.filters.type = target.getAttribute('data-pick-type') || null;
        closeSheet();
        render();
        return;
      }
       
      if (target.hasAttribute('data-aperiod')) {
        state.analyticsPeriod = target.getAttribute('data-aperiod');
        render();
        return;
      }
      if (target.hasAttribute('data-atype')) {
        var at = target.getAttribute('data-atype');
        var ai = state.analyticsTypes.indexOf(at);
        if (ai >= 0) state.analyticsTypes.splice(ai, 1); else state.analyticsTypes.push(at);
        render();
        return;
      }
      if (target.hasAttribute('data-actype')) {
        state.analyticsClientType = target.getAttribute('data-actype');
        render();
        return;
      }
      if (target.hasAttribute('data-project') && !target.hasAttribute('data-act')) {
        var pid = target.getAttribute('data-project');
        if (e.target.closest('[data-act="quick-complete"]')) return;
        sheetProject(pid);
        return;
      }
      if (target.hasAttribute('data-client')) { sheetClient(target.getAttribute('data-client')); return; }

      var act = target.getAttribute('data-act');
      if (!act) return;

      switch (act) {
        case 'reference-menu': sheetReferenceMenu(); break;
        case 'brand':
           
          toast('FO · TRI · VA — фокус, три, ваши');
          break;
        case 'back': goBack(); break;
        case 'close-sheet': closeSheet(); break;
        case 'private':
          state.private = !state.private;
          if (sheet.box.classList.contains('open') && sheet.box.querySelector('[data-act="set-theme"]')) sheetSettings();
          else render();
          break;
        case 'set-theme':
          applyTheme(target.getAttribute('data-theme'));
          if (state.screen === 'settings') render();
          break;
        case 'go-calendar': goScreen('calendar'); break;
        case 'go-tax': goScreen('tax'); break;
        case 'go-pro': goScreen('pro'); break;
        case 'go-settings': goScreen('settings'); break;
        case 'go-backup':
          closeSheet();
          toast('Копия .fotrivabak готовится к выгрузке');
          break;
        case 'filter': sheetFilter(); break;
        case 'toggle-search':
          
 
          state.searchOpen = !state.searchOpen;
          if (!state.searchOpen) {
            state.projectQuery = '';
            state.filters.client = null;
            state.filters.type = null;
          }
          render();
          if (state.searchOpen) {
            var sfield = ROOT.querySelector('#project-search');
            if (sfield) sfield.focus();
          }
          break;
        case 'filter-client': sheetPickClient(); break;
        case 'filter-type': sheetPickType(); break;
         
        case 'type-edit': sheetTypeForm(target.getAttribute('data-type')); break;
        case 'type-create': sheetTypeForm(''); break;
        case 'type-delete': sheetTypeDelete(target.getAttribute('data-type')); break;
        case 'type-color': {
          var dot = target.closest('.app-color-dot');
          if (!dot) break;
          var dots = ROOT.querySelectorAll('.app-color-dot');
          for (var i = 0; i < dots.length; i++) dots[i].classList.remove('on');
          dot.classList.add('on');
          break;
        }
        case 'type-save': {
          var typeName = target.getAttribute('data-type');
          var newName = (ROOT.querySelector('#te-type-name').value || '').trim();
          if (!newName) { toast('Введите название вида съёмки'); break; }
          var on = ROOT.querySelector('.app-color-dot.on');
          var newColor = on ? on.getAttribute('data-color') : TYPE_COLORS[0];
          if (typeName) {
            (state.data.types || []).forEach(function (t) {
              if (t.name !== typeName) return;
              if (newName !== typeName) {
                state.data.projects.forEach(function (pr) {
                  if (pr.type === typeName) pr.type = newName;
                });
                if (state.filters.type === typeName) state.filters.type = newName;
                t.name = newName;
              }
              t.color = newColor;
            });
            saveState();
            closeSheet();
            render();
            toast('Вид съёмки сохранён');
          } else {
            state.data.types = (state.data.types || []).concat([{ name: newName, color: newColor }]);
            var pending = state.pendingTypeMove;
            state.pendingTypeMove = null;
            saveState();
            if (pending) {
              applyTypeDelete(pending, newName);
              toast('Проекты перенесены на новый вид');
            } else {
              closeSheet();
              render();
              toast('Вид съёмки создан');
            }
          }
          break;
        }
        case 'type-delete-confirm':
          applyTypeDelete(target.getAttribute('data-type'), '');
          break;
        case 'type-assign': {
          var delType = target.getAttribute('data-type');
          var tgt = target.getAttribute('data-target') || '';
          if (tgt === '__new__') {
            state.pendingTypeMove = delType;
            closeSheet();
            sheetTypeForm('');
            break;
          }
          applyTypeDelete(delType, tgt);
          break;
        }
        case 'tax-select':
          state.taxProfileId = target.getAttribute('data-id');
          render();
          break;
        case 'tax-edit': sheetTaxProfileEdit(target.getAttribute('data-id')); break;
        case 'tax-delete': {
          var delId = target.getAttribute('data-id');
          state.data.taxProfiles = (state.data.taxProfiles || []).filter(function (p) { return p.id !== delId; });
          if (state.taxProfileId === delId) state.taxProfileId = null;
          saveState();
          render();
          toast('Профиль удалён');
          break;
        }
        case 'tax-save-edit': {
          var editId = target.getAttribute('data-id');
          var name = (ROOT.querySelector('#te-name').value || '').trim();
          if (!name) { toast('Введите название профиля'); return; }
          (state.data.taxProfiles || []).forEach(function (p) {
            if (p.id !== editId) return;
            p.name = name;
            p.regime = ROOT.querySelector('#te-regime').value;
            p.active = !!ROOT.querySelector('#te-active').checked;
          });
          saveState();
          closeSheet();
          render();
          toast('Профиль сохранён');
          break;
        }
        case 'cal-phone': toast('Откроется список календарей телефона — без пароля'); break;
        case 'cal-yandex': toast('Диалог Яндекс: логин и пароль приложения'); break;
        case 'cal-google-token': toast('Нужен токен Google Calendar API — вводится вручную'); break;
        case 'cal-google-oauth': toast('Вход в Google-аккаунт через OAuth'); break;
        case 'tax-add-profile': sheetTaxProfileForm(); break;
        case 'tax-add-rate': sheetTaxRateForm(target.getAttribute('data-id')); break;
        case 'tax-save-profile': saveTaxProfile(); break;
        case 'tax-save-rate': saveTaxRate(target.getAttribute('data-id')); break;
        case 'pref': {
          var prefKey = target.getAttribute('data-key');
          var prefs = state.data.prefs = state.data.prefs || {};
          var def = (prefKey === 'privacy') ? false : true;
          var cur = prefs[prefKey] === undefined ? def : !!prefs[prefKey];
          prefs[prefKey] = !cur;
          if (prefKey === 'privacy') state.private = !cur;
          saveState();
          render();
          break;
        }
        case 'profile': {
          var prefs2 = state.data.prefs = state.data.prefs || {};
          prefs2.profile = target.getAttribute('data-value');
          saveState();
          render();
          break;
        }
        case 'go-privacy':
          toast('Политика конфиденциальности открывается отдельным экраном');
          break;
        case 'month-prev':
          state.monthOffset -= 1;
          render();
          break;
        case 'month-next':
          state.monthOffset += 1;
          render();
          break;
        case 'clear-demo':
          state.data.projects = [];
          state.data.clients = [];
          state.data.demoCleared = true;
          saveState();
          closeSheet();
          render();
          toast('Тестовый режим завершён');
          break;
        case 'quick-complete':
          quickComplete(target.getAttribute('data-id'));
          break;
        case 'advance': advanceProject(target.getAttribute('data-id')); break;
        
 
        case 'mark-paid': {
          var mpId = target.getAttribute('data-id');
          var mpProject = null;
          state.data.projects.forEach(function (x) { if (x.id === mpId) mpProject = x; });
          if (!mpProject) break;
          var mpRest = pendingOf(mpProject);
          if (mpRest <= 0) { toast('По проекту долга нет'); break; }
           
          var mpAlloc = allocateByStages(mpProject, mpRest);
          (mpProject.tx = mpProject.tx || []).push({
            kind: 'receipt', amount: mpRest, offset: 0, method: 'Отмечено оплаченным', stage: -1,
            alloc: mpAlloc
          });
          saveState();
          sheetProject(mpId);
          render();
          toast('Проект отмечен оплаченным');
          break;
        }
        case 'status-picker': sheetStatusPicker(target.getAttribute('data-id')); break;
        case 'set-status': {
          var stId = target.getAttribute('data-id');
          var stVal = target.getAttribute('data-status');
          state.data.projects.forEach(function (x) { if (x.id === stId) x.status = stVal; });
          saveState();
          closeSheet();
          sheetProject(stId);
          render();
          toast('Статус: ' + STATUS[stVal].label);
          break;
        }
        case 'open-client': {
          var clId = target.getAttribute('data-id');
          if (clId) sheetClient(clId);
          break;
        }
         
        case 'client-method': {
          var cmId = target.getAttribute('data-id');
          var cmValue = target.getAttribute('data-method');
          state.data.clients.forEach(function (x) {
            if (x.id === cmId) x.method = cmValue;
          });
          saveState();
          sheetClient(cmId);
          render();
          break;
        }
        case 'open-max': {
          var maxId = target.getAttribute('data-id');
          var maxClient = null;
          state.data.clients.forEach(function (x) { if (x.id === maxId) maxClient = x; });
          if (!maxClient) break;
          if (maxClient.phone) copyText(maxClient.phone);
          var maxUrl = P.MAX_APP_URL || 'https://max.ru';
          window.open(maxUrl, '_blank', 'noopener');
          toast(P.maxCopiedHint ? P.maxCopiedHint() : 'Номер скопирован — найдите контакт в МАКС по номеру');
          break;
        }
         
        case 'import-contacts': sheetImportContacts(); break;
        case 'clear-contacts': sheetClearContacts(); break;
        case 'clear-contacts-confirm': {
          var doomed = P.clientsWithoutShoots
            ? P.clientsWithoutShoots(state.data.clients, state.data.projects)
            : [];
          var doomedIds = {};
          doomed.forEach(function (c) { doomedIds[c.id] = true; });
          state.data.clients = state.data.clients.filter(function (c) { return !doomedIds[c.id]; });
          saveState();
          closeSheet();
          render();
          toast('Удалено контактов: ' + doomed.length + '. Осталось клиентов со съёмками: ' +
            state.data.clients.length);
          break;
        }
        case 'ic-toggle': {
          var icId = target.getAttribute('data-id');
          state.importSel = state.importSel || {};
          state.importSel[icId] = !state.importSel[icId];
          refreshImportSheet();
          break;
        }
        case 'ic-all': {
          var shown = P.filterContacts ? P.filterContacts(DEMO_CONTACTS, state.importQuery) : DEMO_CONTACTS;
          state.importSel = state.importSel || {};
          shown.forEach(function (c) { state.importSel[c.id] = true; });
          refreshImportSheet();
          break;
        }
        case 'ic-none':
          state.importSel = {};
          refreshImportSheet();
          break;
        case 'ic-import': importSelectedContacts(); break;
        case 'ic-cancel':
          state.importSel = {};
          state.importQuery = '';
          closeSheet();
          render();
          break;
        case 'pay':
          var form = ROOT.querySelector('#pay-form');
          if (form) { form.hidden = false; var inp = ROOT.querySelector('#pay-amount'); if (inp) inp.focus(); }
          break;
        case 'pay-cancel':
          var f2 = ROOT.querySelector('#pay-form');
          if (f2) f2.hidden = true;
          break;
        case 'pay-save': addPayment(target.getAttribute('data-id')); break;
        case 'delete-project': deleteProject(target.getAttribute('data-id')); break;
         
        case 'expense-add':
          sheetExpense(target.getAttribute('data-project'), '');
          break;
        case 'expense-edit':
          sheetExpense(target.getAttribute('data-project'), target.getAttribute('data-id'));
          break;
        case 'expense-save':
          saveExpense(target.getAttribute('data-project'), target.getAttribute('data-id'));
          break;
        case 'expense-delete':
          deleteExpense(target.getAttribute('data-project'), target.getAttribute('data-id'));
          break;
        case 'expense-cancel':
          sheetProject(target.getAttribute('data-project'));
          break;
        case 'expense-preset': {
          var presetField = ROOT.querySelector('#ex-category');
          if (presetField) {
            presetField.value = target.getAttribute('data-value');
            presetField.focus();
          }
          break;
        }
        case 'new-for-client': sheetNewProject(target.getAttribute('data-id')); break;
        case 'new-project': sheetNewProject(); break;
        case 'save-project': saveNewProject(); break;
        case 'pro-activate':
          var key = (ROOT.querySelector('#pro-key').value || '').trim();
          if (!key) { toast('Введите ключ'); return; }
          state.data.pro = true;
          saveState();
          render();
          toast('Ключ активирован — Pro открыт навсегда');
          break;
        case 'pro-buy':
          window.location.href = 'mailto:fotriva@yandex.ru?subject=' + encodeURIComponent('Покупка FOTRIVA Pro');
          break;
      }
    });

    ROOT.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var card = e.target.closest && e.target.closest('.app-project[data-project]');
      if (card) {
        e.preventDefault();
        sheetProject(card.getAttribute('data-project'));
      }
    });

    ROOT.addEventListener('input', function (e) {
      if (e.target.id === 'project-search') {
        state.projectQuery = e.target.value;
        var ppos = e.target.selectionStart;
        render();
        var pfield = ROOT.querySelector('#project-search');
        if (pfield) { pfield.focus(); try { pfield.setSelectionRange(ppos, ppos); } catch (err) {   } }
      }
      if (e.target.id === 'client-search') {
        state.clientQuery = e.target.value;
        var pos = e.target.selectionStart;
        render();
        var field = ROOT.querySelector('#client-search');
        if (field) { field.focus(); try { field.setSelectionRange(pos, pos); } catch (err) {   } }
      }
       
      if (e.target.id === 'ic-search') {
        state.importQuery = e.target.value;
        var ipos = e.target.selectionStart;
        refreshImportSheet();
        var ifield = ROOT.querySelector('#ic-search');
        if (ifield) { ifield.focus(); try { ifield.setSelectionRange(ipos, ipos); } catch (err) {   } }
      }
      
       if (e.target.hasAttribute && e.target.hasAttribute('data-money')) {
        if (!P.trimLeadingZeros) return;
        var trimmed = P.trimLeadingZeros(e.target.value);
        if (trimmed !== e.target.value) {
          var mpos = e.target.selectionStart;
          e.target.value = trimmed;
          try { e.target.setSelectionRange(mpos, mpos); } catch (err) {   }
        }
      }
    });

    sheet.backdrop.addEventListener('click', closeSheet);

    var headerToggle = document.getElementById('theme-toggle');
    if (headerToggle) {
      headerToggle.addEventListener('click', function () {
        applyTheme(state.theme === 'night' ? 'day' : 'night');
      });
    }
  }

   

   
  function apertureMark(size) {
    var def = (window.FotrivaIcons || {}).aperture;
    if (!def) return '';
    return '<svg class="app-toolbar-logo" width="' + size + '" height="' + size + '" viewBox="' + def.vb + '" aria-hidden="true">' + def.body + '</svg>';
  }

   

  

 

  var PHONE_W = 372;
  var PHONE_H = 800;

  function fitPhone() {
    var scale = 1;
    if (window.innerWidth < 960) {
      scale = Math.min(scale, Math.min(window.innerWidth - 48, 420) / PHONE_W);
      scale = Math.min(scale, 0.95);
    } else {
      scale = Math.min(scale, (window.innerHeight - 200) / PHONE_H);
    }
    document.documentElement.style.setProperty('--phone-scale', String(Math.max(0.5, scale)));
  }

   

  function init() {
    ROOT.innerHTML =
      '<div class="app-stage">' +
      '<div class="app-device">' +
      '<div class="app-screen">' +
      '<div class="app-status"><span id="app-clock">--:--</span>' +
      '<span class="app-status-icons">' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 18a6 6 0 0 0 6-6h-2a4 4 0 0 1-4 4v2zm0-14v2a4 4 0 0 1 4 4h2a6 6 0 0 0-6-6zm-2 0a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4V4z"/></svg>' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 8h2v8H2zm4 2h2v4H6zm4-4h2v12h-2zm4 3h2v6h-2zm4-2h2v10h-2z"/></svg>' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15 4h2v3h3v2h-3v3h-2V9h-3V7h3z"/></svg>' +
      '</span></div>' +
      '<div class="app-toolbar"></div>' +
      '<div class="app-body"></div>' +
      '<button class="app-fab" type="button" data-act="new-project" aria-label="Новый проект">' + icon('add') + '</button>' +
      '<nav class="app-nav" aria-label="Разделы приложения"></nav>' +
      '<div class="app-sheet-backdrop"></div>' +
      '<div class="app-sheet" role="dialog" aria-modal="true" aria-hidden="true"></div>' +
      '<div class="app-toast"></div>' +
      '</div>' +
      '</div>' +
      '</div>';

    sheet.backdrop = ROOT.querySelector('.app-sheet-backdrop');
    sheet.box = ROOT.querySelector('.app-sheet');

    loadState();
    document.documentElement.setAttribute('data-theme', state.theme);
    var headerToggle = document.getElementById('theme-toggle');
    if (headerToggle) {
      headerToggle.setAttribute('aria-label', state.theme === 'night' ? 'Включить дневную тему' : 'Включить ночную тему');
      headerToggle.setAttribute('aria-pressed', state.theme === 'night' ? 'true' : 'false');
    }

    fitPhone();
    render();
    bind();

    window.addEventListener('resize', fitPhone);
    window.addEventListener('orientationchange', fitPhone);

     
    var bodyEl = ROOT.querySelector('.app-body');
    if (bodyEl) {
      bodyEl.addEventListener('scroll', function () {
        if (state.screen !== 'shoots') return;
        var fab = ROOT.querySelector('.app-fab');
        if (fab) fab.hidden = !isAtListEnd(bodyEl);
      });
    }

    var clock = document.getElementById('app-clock');
    function tick() {
      var d = new Date();
      clock.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    }
    tick();
    setInterval(tick, 30000);
  }

   
  window.FotrivaDemo = {
    goTo: function (screen) { state.screen = screen; state.stack = ['home']; render(); },
    setTheme: applyTheme,
    togglePrivate: function () { state.private = !state.private; render(); },
    newProject: function () { sheetNewProject(); },
     
    openSearch: function () {
      state.screen = 'home';
      state.stack = ['home'];
      state.searchOpen = true;
      render();
      var f = ROOT.querySelector('#project-search');
      if (f) f.focus();
    },
    calendar: function () { goScreen('calendar'); },
    tax: function () { goScreen('tax'); },
    brand: function () { toast('FO · TRI · VA — фокус, три, ваши'); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
