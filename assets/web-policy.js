






 

(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.FotrivaPolicy = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

   

  
 
  function normalizeMoney(raw) {
    var text = String(raw == null ? '' : raw);
    var out = '';
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (/\s/.test(ch) || ch === ' ' || ch === ' ') continue;
      out += ch === ',' ? '.' : ch;
    }
    return out;
  }

   
  function trimLeadingZeros(raw) {
    var text = normalizeMoney(raw);
    if (!text) return text;
    var dot = text.indexOf('.');
    var integerPart = dot < 0 ? text : text.slice(0, dot);
    var tail = dot < 0 ? '' : text.slice(dot);
    if (!integerPart) return text;
    if (!/^[0-9]+$/.test(integerPart)) return text;
    var trimmed = integerPart.replace(/^0+/, '');
    return (trimmed || '0') + tail;
  }

   

   
  var PRESET_CATEGORIES = ['Такси', 'Печать', 'Подрядчик'];

  var MAX_CATEGORY_LENGTH = 60;
  var ERROR_AMOUNT = 'Сумма должна быть больше нуля';
  var ERROR_CATEGORY = 'Укажите статью расхода';

  function normalizeCategory(raw) {
    var collapsed = String(raw == null ? '' : raw).trim().replace(/\s+/g, ' ');
    return collapsed.slice(0, MAX_CATEGORY_LENGTH).trim();
  }

   
  function validateExpense(amount, category) {
    var value = Number(amount);
    if (!isFinite(value) || value <= 0) return { error: ERROR_AMOUNT };
    if (!normalizeCategory(category)) return { error: ERROR_CATEGORY };
    return { error: null };
  }

  function expenseTotal(expenses) {
    if (!expenses || !expenses.length) return 0;
    var sum = 0;
    for (var i = 0; i < expenses.length; i++) {
      var value = Number(expenses[i] && expenses[i].amount);
      if (isFinite(value)) sum += value;
    }
    return sum;
  }

   

  function digitsOnly(text) {
    return String(text == null ? '' : text).replace(/[^0-9]/g, '');
  }

  
 
  function filterContacts(contacts, query) {
    var list = contacts || [];
    var q = String(query == null ? '' : query).trim().toLowerCase();
    if (!q) return list.slice();
    var qDigits = digitsOnly(q);
    return list.filter(function (c) {
      if (!c) return false;
      var name = String(c.name || '').toLowerCase();
      if (name.indexOf(q) >= 0) return true;
      if (!qDigits) return false;
      return digitsOnly(c.phone).indexOf(qDigits) >= 0;
    });
  }

  
 
  function importContacts(contacts, selectedIds, existingClients) {
    var existing = existingClients || [];
    var seen = {};
    var existingPhones = {};
    for (var i = 0; i < existing.length; i++) {
      var phone = digitsOnly(existing[i] && existing[i].phone);
      if (phone) existingPhones[phone] = true;
    }
    var imported = [];
    var skipped = 0;
    var selected = {};
    for (var s = 0; s < (selectedIds || []).length; s++) {
      selected[selectedIds[s]] = true;
    }
    var list = contacts || [];
    for (var j = 0; j < list.length; j++) {
      var c = list[j];
      if (!c || !selected[c.id]) continue;
      if (seen[c.id]) { skipped++; continue; }
      seen[c.id] = true;
      var digits = digitsOnly(c.phone);
      if (digits && existingPhones[digits]) { skipped++; continue; }
      imported.push({ name: String(c.name || '').trim(), phone: String(c.phone || '').trim() });
    }
    return { imported: imported, skipped: skipped };
  }

   

   
  function clientsWithoutShoots(clients, projects) {
    var busy = {};
    var list = projects || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].clientId) busy[list[i].clientId] = true;
    }
    return (clients || []).filter(function (c) { return c && !busy[c.id]; });
  }

   

  function normalizeTime(value) {
    var text = String(value == null ? '' : value).trim();
    var m = /^(\d{1,2}):(\d{1,2})$/.exec(text);
    if (!m) return '';
    var hours = Number(m[1]);
    var minutes = Number(m[2]);
    if (hours > 23 || minutes > 59) return '';
    return (hours < 10 ? '0' + hours : String(hours)) + ':' + (minutes < 10 ? '0' + minutes : String(minutes));
  }

  function formatTimeRange(start, end) {
    var from = normalizeTime(start);
    var to = normalizeTime(end);
    if (from && to) return from + ' — ' + to;
    if (from) return from;
    if (to) return to;
    return '';
  }

   

  var MAX_APP_URL = 'https://max.ru';

  
 
  function maxChatUrl() { return ''; }

  function maxCopiedHint() {
    return 'Номер скопирован — найдите контакт в МАКС по номеру';
  }

  return {
    trimLeadingZeros: trimLeadingZeros,
    normalizeMoney: normalizeMoney,
    PRESET_CATEGORIES: PRESET_CATEGORIES,
    MAX_CATEGORY_LENGTH: MAX_CATEGORY_LENGTH,
    ERROR_AMOUNT: ERROR_AMOUNT,
    ERROR_CATEGORY: ERROR_CATEGORY,
    normalizeCategory: normalizeCategory,
    validateExpense: validateExpense,
    expenseTotal: expenseTotal,
    filterContacts: filterContacts,
    importContacts: importContacts,
    clientsWithoutShoots: clientsWithoutShoots,
    normalizeTime: normalizeTime,
    formatTimeRange: formatTimeRange,
    MAX_APP_URL: MAX_APP_URL,
    maxChatUrl: maxChatUrl,
    maxCopiedHint: maxCopiedHint
  };
});
