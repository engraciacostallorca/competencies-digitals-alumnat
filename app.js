/**
 * RevisaDocs - DigAgora
 * Lògica d'interactivitat i avaluació competencial estricta:
 * ENA (1): menys de 10 ítems fets (< 10)
 * AS (2): 10 o 11 ítems fets
 * AN (3): 12 o 13 ítems fets
 * AE (4): 14 ítems fets (100% dels aplicables)
 * Amb càlcul proporcional si s'indiquen ítems No Aplica (N/A).
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Estat de l'aplicació
  let currentItems = typeof DEFAULT_ITEMS_DATA !== 'undefined' ? DEFAULT_ITEMS_DATA : [];
  let itemStatesMap = {}; // 'yes', 'no', 'na'

  // Elements del DOM
  const checklistContainer = document.getElementById('checklistContainer');
  const progressBarFill = document.getElementById('progressBarFill');
  const progressPercentageText = document.getElementById('progressPercentageText');
  const liveGradeBadge = document.getElementById('liveGradeBadge');
  const liveGradeCode = document.getElementById('liveGradeCode');
  const liveGradeIcon = document.getElementById('liveGradeIcon');

  const validateBtn = document.getElementById('validateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Modal de resultats
  const validationModal = document.getElementById('validationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeModalFooterBtn = document.getElementById('closeModalFooterBtn');
  const printReportBtn = document.getElementById('printReportBtn');

  const modalGradeBanner = document.getElementById('modalGradeBanner');
  const modalGradeBadge = document.getElementById('modalGradeBadge');
  const modalGradeTitle = document.getElementById('modalGradeTitle');
  const modalItemsSummary = document.getElementById('modalItemsSummary');
  const modalGradeSubtitle = document.getElementById('modalGradeSubtitle');
  const unfulfilledList = document.getElementById('unfulfilledList');
  const fulfilledList = document.getElementById('fulfilledList');

  // 2. Inicialització
  function init() {
    loadSavedTheme();
    loadSavedProgress();
    renderChecklistBlocks();
    updateProgressAndGrade();
  }

  // Carregar estat d'ítems marcats
  function loadSavedProgress() {
    const savedProgress = localStorage.getItem('revisadocs_states_map');
    if (savedProgress) {
      try {
        itemStatesMap = JSON.parse(savedProgress);
      } catch (e) {
        itemStatesMap = {};
      }
    }
    // Per defecte, tots els ítems no seleccionats tenen estat 'no' (Encara no)
    currentItems.forEach(item => {
      if (!itemStatesMap[item.id]) {
        itemStatesMap[item.id] = 'no';
      }
    });
  }

  function saveProgress() {
    localStorage.setItem('revisadocs_states_map', JSON.stringify(itemStatesMap));
  }

  // 3. Renderització dels 3 Blocs amb Fons de Colors
  function renderChecklistBlocks() {
    checklistContainer.innerHTML = '';

    // Obtenir les categories úniques presents als ítems
    const categoriesMap = {};
    currentItems.forEach(item => {
      if (!categoriesMap[item.categoria]) {
        categoriesMap[item.categoria] = [];
      }
      categoriesMap[item.categoria].push(item);
    });

    const categoryKeys = Object.keys(categoriesMap);

    categoryKeys.forEach((catTitle, index) => {
      const itemsInCat = categoriesMap[catTitle];
      const blockIndex = (index % 3) + 1; // 1, 2, 3

      // Targeta contenidora de bloc amb fons de color
      const blockCard = document.createElement('div');
      blockCard.className = `section-block-card block-${blockIndex}`;

      // Títol del bloc
      const blockHeader = document.createElement('h3');
      blockHeader.className = 'section-block-title';
      const firstItem = itemsInCat[0];
      const icon = firstItem && firstItem.categoriaIcona ? firstItem.categoriaIcona : '📌';
      blockHeader.innerHTML = `<span>${icon}</span> ${escapeHtml(catTitle)}`;
      blockCard.appendChild(blockHeader);

      // Llista d'ítems del bloc
      const itemsList = document.createElement('div');
      itemsList.className = 'section-items-list';

      itemsInCat.forEach(item => {
        const state = itemStatesMap[item.id] || 'no'; // per defecte 'no' fins que selecciona

        const card = document.createElement('div');
        card.className = `item-card state-${state}`;
        card.dataset.id = item.id;

        // Construir botons d'estat
        let secondaryButtonHtml = '';
        if (item.textNoAplica) {
          secondaryButtonHtml = `
            <div class="secondary-state-row">
              <button class="state-btn state-btn-secondary ${state === 'na' ? 'active' : ''}" data-state="na" title="Aquest criteri no s'aplica al meu treball">
                ⚪ ${escapeHtml(item.textNoAplica)}
              </button>
            </div>
          `;
        }

        card.innerHTML = `
          <div class="item-card-header">
            <div class="item-content-wrapper">
              <span class="item-title">${item.titol}</span>
              <p class="item-desc">${escapeHtml(item.descripcio)}</p>
            </div>

            <div class="item-state-wrapper">
              <div class="state-buttons-group">
                <div class="primary-states-row">
                  <button class="state-btn ${state === 'yes' ? 'active' : ''}" data-state="yes" title="Tinc aconseguit aquest criteri">
                    ✅ Ho tinc
                  </button>
                  <button class="state-btn ${state === 'no' ? 'active' : ''}" data-state="no" title="Encara tinc pendent aquest criteri">
                    ❌ Encara no
                  </button>
                </div>
                ${secondaryButtonHtml}
              </div>
            </div>

            <button class="accordion-toggle" title="Obrir/tancar tutorial i consells">
              <span>ℹ️ Tutorial</span>
              <span class="arrow-icon">▼</span>
            </button>
          </div>

          <div class="item-accordion-body">
            <div class="tutorial-content">
              ${item.tutorial || '<p>Revisa que el teu document compleixi aquest criteri abans de continuar.</p>'}
              ${item.exempleVisual ? `
                <div class="visual-comparison">
                  <div class="example-card correct">
                    <div class="example-title">✅ Exemple Correcte:</div>
                    <div>${escapeHtml(item.exempleVisual.correcte)}</div>
                  </div>
                  <div class="example-card incorrect">
                    <div class="example-title">❌ Exemple a Evitar:</div>
                    <div>${escapeHtml(item.exempleVisual.incorrecte)}</div>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        `;

        // Event: Clic als botons d'estat (Tots els nivells)
        const allStateBtns = card.querySelectorAll('.state-btn, .state-btn-secondary');
        allStateBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const chosenState = btn.dataset.state;
            itemStatesMap[item.id] = chosenState;
            saveProgress();

            card.className = `item-card state-${chosenState}`;
            
            // Actualitzar classes actives
            card.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
            const secBtn = card.querySelector('.state-btn-secondary');
            if (secBtn) secBtn.classList.remove('active');

            btn.classList.add('active');

            updateProgressAndGrade();
          });
        });

        // Event: Clic a l'acordió
        const toggleBtn = card.querySelector('.accordion-toggle');
        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          card.classList.toggle('open');
        });

        itemsList.appendChild(card);
      });

      blockCard.appendChild(itemsList);
      checklistContainer.appendChild(blockCard);
    });
  }

  // 4. Càlcul de nota competencial estricta (ENA <10, AS 10-11, AN 12-13, AE 14)
  function calculateGrade() {
    const applicableItems = currentItems.filter(i => itemStatesMap[i.id] !== 'na');
    const totalApplicable = applicableItems.length;

    if (totalApplicable === 0) {
      return { 
        code: 'N/A', 
        number: '-', 
        title: 'Sense ítems aplicables', 
        percentage: 0, 
        checkedCount: 0, 
        totalApplicable: 0,
        equivalentItemsDone: 0
      };
    }

    const checkedCount = applicableItems.filter(i => itemStatesMap[i.id] === 'yes').length;
    
    // Càlcul proporcional equivalent sobre 14 ítems
    const effectiveDoneRatio = checkedCount / totalApplicable;
    const equivalentItemsDone = (totalApplicable === 14) ? checkedCount : Math.round(effectiveDoneRatio * 14);

    let code = 'ENA';
    let number = 1;
    let title = 'No Assolit (ENA)';
    let icon = '🔴';
    let colorClass = 'na';
    let subtitle = `Has completat ${checkedCount} ítems (${equivalentItemsDone} equivalents de 14). Cal un mínim de 10 ítems fets per assolir el treball.`;

    if (checkedCount === totalApplicable && totalApplicable > 0) {
      code = 'AE';
      number = 4;
      title = 'Assolit Excel·lent (AE)';
      icon = '🌟';
      colorClass = 'ae';
      subtitle = `Enhorabona! Has completat tots els ítems aplicables (${checkedCount} de ${totalApplicable}). El treball és impecable.`;
    } else if (equivalentItemsDone >= 12) {
      code = 'AN';
      number = 3;
      title = 'Assolit Notable (AN)';
      icon = '🔵';
      colorClass = 'an';
      subtitle = `Molt bona feina! Has completat ${checkedCount} ítems (${equivalentItemsDone} equivalents de 14). El treball té molt bona estructura.`;
    } else if (equivalentItemsDone >= 10) {
      code = 'AS';
      number = 2;
      title = 'Assolit Satisfactori (AS)';
      icon = '🟠';
      colorClass = 'as';
      subtitle = `Treball aprovat. Has completat ${checkedCount} ítems (${equivalentItemsDone} equivalents de 14). Revisa els punts pendents per millorar.`;
    }

    const percentage = Math.round(effectiveDoneRatio * 100);

    return {
      code,
      number,
      title,
      icon,
      colorClass,
      subtitle,
      percentage,
      checkedCount,
      totalApplicable,
      equivalentItemsDone
    };
  }

  function updateProgressAndGrade() {
    const grade = calculateGrade();

    progressBarFill.style.width = `${grade.percentage}%`;
    progressPercentageText.textContent = `${grade.checkedCount} / ${grade.totalApplicable} ítems fets (${grade.code})`;

    liveGradeCode.textContent = `${grade.code} (${grade.number})`;
    liveGradeIcon.textContent = grade.icon;
    liveGradeBadge.className = `live-grade-badge ${grade.colorClass}`;
  }

  // 5. Acció de Revisió (Botó REVISAR EL MEU TREBALL)
  validateBtn.addEventListener('click', () => {
    const grade = calculateGrade();

    // Banner de Nota
    modalGradeBanner.className = `grade-banner ${grade.colorClass}`;
    modalGradeBadge.textContent = `${grade.code} (${grade.number})`;
    modalGradeTitle.textContent = grade.title;
    if (modalItemsSummary) {
      modalItemsSummary.textContent = `🎯 Ítems assolits: ${grade.checkedCount} de ${grade.totalApplicable} (${grade.percentage}%)`;
    }
    modalGradeSubtitle.textContent = grade.subtitle;

    // Aspectes a millorar
    unfulfilledList.innerHTML = '';
    const unfulfilledItems = currentItems.filter(i => itemStatesMap[i.id] === 'no' || !itemStatesMap[i.id]);

    if (unfulfilledItems.length === 0) {
      unfulfilledList.innerHTML = `
        <div class="fulfilled-item-box" style="background: var(--bg-ae); color: #065f46;">
          <span>🎉</span> <strong>Cap punt pendent!</strong> Has completat tots els criteris aplicables de la llista.
        </div>
      `;
    } else {
      unfulfilledItems.forEach(item => {
        const box = document.createElement('div');
        box.className = 'unfulfilled-item-box';
        box.innerHTML = `
          <h5>❌ ${item.titol} (${escapeHtml(item.categoria)})</h5>
          <p><strong>Com solucionar-ho:</strong> ${escapeHtml(item.descripcio)}</p>
        `;
        unfulfilledList.appendChild(box);
      });
    }

    // Aspectes assolits
    fulfilledList.innerHTML = '';
    const fulfilledItems = currentItems.filter(i => itemStatesMap[i.id] === 'yes');

    if (fulfilledItems.length === 0) {
      fulfilledList.innerHTML = `
        <div style="font-size: 0.9rem; color: var(--text-muted); font-style: italic;">Encara no has marcat cap ítem com a complert.</div>
      `;
    } else {
      fulfilledItems.forEach(item => {
        const box = document.createElement('div');
        box.className = 'fulfilled-item-box';
        box.innerHTML = `
          <span>✅</span> <div><strong>${item.titol}</strong> (${escapeHtml(item.categoria)})</div>
        `;
        fulfilledList.appendChild(box);
      });
    }

    // Ítems no aplicables (N/A)
    const naItems = currentItems.filter(i => itemStatesMap[i.id] === 'na');
    if (naItems.length > 0) {
      const naBox = document.createElement('div');
      naBox.style.marginTop = '12px';
      naBox.style.fontSize = '0.85rem';
      naBox.style.color = 'var(--text-muted)';
      naBox.innerHTML = `⚪ <strong>Ítems no aplicables (${naItems.length}):</strong> ${naItems.map(i => i.titol).join(', ')}. <em>(No han comptabilitzat per a la nota).</em>`;
      fulfilledList.appendChild(naBox);
    }

    validationModal.classList.add('active');
  });

  // Events de tancament de Modal
  closeModalBtn.addEventListener('click', () => validationModal.classList.remove('active'));
  closeModalFooterBtn.addEventListener('click', () => validationModal.classList.remove('active'));
  validationModal.addEventListener('click', (e) => {
    if (e.target === validationModal) validationModal.classList.remove('active');
  });

  // Imprimir o Descarregar informe PDF
  printReportBtn.addEventListener('click', () => {
    window.print();
  });

  // Reset de la checklist
  resetBtn.addEventListener('click', () => {
    if (confirm('Vols esborrar tota la selecció i començar de nou?')) {
      itemStatesMap = {};
      currentItems.forEach(item => {
        itemStatesMap[item.id] = 'no';
      });
      saveProgress();
      renderChecklistBlocks();
      updateProgressAndGrade();
    }
  });

  // Mode Clar / Mode Fosc
  function loadSavedTheme() {
    const isDark = localStorage.getItem('revisadocs_theme') === 'dark';
    if (isDark) {
      document.body.classList.add('dark-theme');
      themeIcon.textContent = '☀️';
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDarkNow = document.body.classList.contains('dark-theme');
    localStorage.setItem('revisadocs_theme', isDarkNow ? 'dark' : 'light');
    themeIcon.textContent = isDarkNow ? '☀️' : '🌙';
  });

  // Utilitat per a seguretat HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Arrencar l'aplicació
  init();
});
