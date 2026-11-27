





 

(function () {
  'use strict';

   
  var MODES = {
    npd4: {
      rate: 4,
      label: 'НПД, 4 %',
      note: 'НПД 4 % — доходы от физлиц. Учёт по факту поступления денег; лимит дохода — 2,4 млн ₽ в год, наёмных работников быть не может.'
    },
    npd6: {
      rate: 6,
      label: 'НПД, 6 %',
      note: 'НПД 6 % — доходы от юрлиц и ИП. Остальное как у 4 %: лимит 2,4 млн ₽ в год и без наёмных работников.'
    },
    usn6: {
      rate: 6,
      label: 'УСН «Доходы», 6 %',
      note: 'УСН «Доходы» 6 % от доходов. Регион может снизить ставку до 1 % — проверьте свою. Страховые взносы уменьшают налог, но в этой форме вычеты не считаются.'
    },
    usn15: {
      rate: 15,
      label: 'УСН «Доходы минус расходы», 15 %',
      note: 'УСН «Доходы минус расходы» 15 %. В приложении база — только полученные деньги, поэтому результат здесь — верхняя оценка. Минимальный налог 1 % не считается.'
    },
    ausn8: {
      rate: 8,
      label: 'АУСН «Доходы», 8 %',
      note: 'АУСН: налог 8 % с доходов, отчётность ведёт банк, взносы в фонды не платятся. Режим доступен только в регионах эксперимента, до 60 млн ₽ и до 5 человек.'
    },
    ausn20: {
      rate: 20,
      label: 'АУСН «Доходы минус расходы», 20 %',
      note: 'АУСН 20 % с разницы доходов и расходов. Здесь ставка применяется к полученным деньгам, а не к прибыли: расходы в модели налога не вычитаются.'
    },
    ndfl: {
      rate: 13,
      label: 'ОСНО — НДФЛ 13 %',
      note: 'Прогрессивная шкала НДФЛ с 2025 года: 13 % — до 2,4 млн ₽, дальше 15 %, 18 %, 20 % и 22 %. В приложении налог считается по накопленному доходу с начала года.'
    },
    vat: {
      rate: 22,
      label: 'ОСНО — НДС 22 %',
      note: 'С 1 января 2026 года основная ставка НДС — 22 % (ФЗ № 425-ФЗ от 28.11.2025). Если полученная сумма уже включает НДС, налог считается как 22/122 от неё — так и посчитано здесь.'
    },
    usn5: {
      rate: 5,
      label: 'УСН + НДС, 5 %',
      note: 'С 2026 года порог НДС для УСН — доход за 2025 год 20 млн ₽. Ставка 5 % — при доходе от 20 до 272,5 млн ₽, без права на вычет входного НДС. Налог с самой УСН считается отдельно.'
    },
    usn7: {
      rate: 7,
      label: 'УСН + НДС, 7 %',
      note: 'С 2026 года порог НДС для УСН — доход за 2025 год 20 млн ₽. Ставка 7 % — при доходе от 272,5 до 490,5 млн ₽, без права на вычет входного НДС. Налог с самой УСН считается отдельно.'
    },
    psn: {
      rate: 0,
      label: 'ПСН — патент',
      note: 'Патент стоит фиксированную сумму и не зависит от выручки. Ставка 0 % здесь означает «налог с оборота не начисляется»: стоимость патента и сроки оплаты (1/3 и 2/3) считайте отдельно.'
    }
  };

  var fmt = function (v) {
    return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  };

  function init() {
    var income = document.getElementById('calc-income');
    var mode = document.getElementById('calc-mode');
    var taxEl = document.getElementById('calc-tax');
    var baseEl = document.getElementById('calc-base');
    var netEl = document.getElementById('calc-net');
    var noteEl = document.getElementById('calc-note');
    var openBtn = document.getElementById('calc-open');
    if (!income || !mode || !taxEl) return;

    function calc() {
      var sum = Math.max(0, Number(income.value) || 0);
      var cfg = MODES[mode.value] || MODES.npd4;
      var base = sum;
      var tax;

      if (mode.value === 'vat') {
         
        tax = sum * 22 / 122;
      } else {
        tax = base * cfg.rate / 100;
      }

      taxEl.textContent = fmt(tax);
      baseEl.textContent = fmt(base);
      netEl.textContent = fmt(Math.max(0, sum - tax));
      noteEl.textContent = cfg.note;
    }

    income.addEventListener('input', calc);
    mode.addEventListener('change', calc);
    calc();

    if (openBtn) {
      openBtn.addEventListener('click', function () {
        if (!window.FotrivaDemo) return;
        window.FotrivaDemo.tax();
        var phone = document.getElementById('fotriva-app');
        if (phone && window.matchMedia('(max-width: 959px)').matches) {
          phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
