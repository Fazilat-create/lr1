/* ============================================================
   1. ДАННЫЕ КУРСА
   ============================================================ */
const courseData = [
  {
    id: "q1", num: "01", cls: "q1", title: "I четверть", desc: "Множества и события", count: 8,
    topics: ["Повторение 7 класса", "Множества и подмножества", "Входная диагностика", "Операции над множествами", "Правило умножения", "Случайные опыты и события", "Закрепление I четверти", "Резерв"]
  },
  {
    id: "q2", num: "02", cls: "q2", title: "II четверть", desc: "Вероятность и статистика", count: 9,
    topics: ["Благоприятствующие события", "Равновозможные события", "Рассеивание данных", "Дисперсия", "Стандартное отклонение", "Диаграммы рассеивания", "Повторение II четверти", "Контрольная работа", "Работа над ошибками"]
  },
  {
    id: "q3", num: "03", cls: "q3", title: "III четверть", desc: "Деревья и логика", count: 7,
    topics: ["Деревья", "Свойства деревьев", "Дерево случайного эксперимента", "Союзы «и» и «или»", "Отрицание утверждений", "Противоположные события", "Повторение III четверти"]
  },
  {
    id: "q4", num: "04", cls: "q4", title: "IV четверть", desc: "Операции над событиями", count: 10,
    topics: ["Объединение и пересечение", "Формула сложения", "Задачи на координатной прямой", "Условная вероятность", "Дерево случайного опыта", "Независимые события", "Ошибка Эдгара По", "Повторение за год", "Контрольная работа", "Работа над ошибками"]
  }
];

/* ============================================================
   2. ИНИЦИАЛИЗАЦИЯ
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderQuarters();
  renderCourseMenu();
  initBurger();
  initCourseDropdown();
  initModal();
});

/* ============================================================
   3. РЕНДЕР КАРТОЧЕК (БЕЗ ТЕМ ВНУТРИ)
   ============================================================ */
function renderQuarters() {
  const grid = document.getElementById("quartersGrid");
  if (!grid) return;
  
  grid.innerHTML = courseData.map((q, index) => `
    <article class="quarter-card ${q.cls}">
      <span class="quarter-card__num">${q.num}</span>
      <h3 class="quarter-card__title">${q.title}</h3>
      <p class="quarter-card__desc">${q.desc} · ${q.count} тем</p>
      <!-- Кнопка теперь вызывает модалку -->
      <button class="quarter-card__btn" data-index="${index}">Открыть →</button>
    </article>
  `).join("");

  // Обработчики для открытия модалки
  grid.querySelectorAll(".quarter-card__btn").forEach(btn => {
    btn.addEventListener("click", () => {
      openTopicsModal(Number(btn.dataset.index));
    });
  });
}

/* ============================================================
   4. ЛОГИКА МОДАЛЬНОГО ОКНА С ТЕМАМИ
   ============================================================ */
const modal = document.getElementById("topicsModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalList = document.getElementById("modalList");

function openTopicsModal(index) {
  const quarter = courseData[index];
  if (!quarter) return;

  modalTitle.textContent = quarter.title;
  
  modalList.innerHTML = quarter.topics.map((t, i) => `
    <a href="#" class="modal-topic">
      <span class="modal-topic__num">${i + 1}</span>
      <span>${t}</span>
    </a>
  `).join("");

  modal.classList.add("is-open");
  document.body.style.overflow = "hidden"; // блокируем скролл страницы
}

function closeModal() {
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

function initModal() {
  if (!modal) return;
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* ============================================================
   5. МЕНЮ В ШАПКЕ (ОСТАЛОСЬ БЕЗ ИЗМЕНЕНИЙ)
   ============================================================ */
function renderCourseMenu() {
  const menu = document.getElementById("courseMenu");
  if (!menu) return;
  
  menu.innerHTML = courseData.map((q, qi) => `
    <div class="dropdown__group" data-group="${qi}">
      <button class="dropdown__group-toggle" type="button">
        <span>
          <span class="dropdown__group-num">${q.num}</span>
          ${q.title}
        </span>
        <span class="dropdown__group-arrow">▶</span>
      </button>
      <div class="dropdown__topics">
        ${q.topics.map((t, ti) => `
          <a class="dropdown__topic" href="#quarters">
            <span class="dropdown__topic-num">${ti + 1}.</span>${t}
          </a>
        `).join("")}
      </div>
    </div>
  `).join("");

  menu.querySelectorAll(".dropdown__group-toggle").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.parentElement.classList.toggle("is-open");
    });
  });
}

function initCourseDropdown() {
  const toggle = document.getElementById("courseToggle");
  const dropdown = document.getElementById("courseDropdown");
  const overlay = document.getElementById("overlay");
  if (!toggle || !dropdown) return;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (window.innerWidth <= 680) {
      overlay.classList.toggle("is-visible", isOpen);
    }
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      overlay.classList.remove("is-visible");
    }
  });

  overlay.addEventListener("click", () => {
    dropdown.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    overlay.classList.remove("is-visible");
  });
}

/* ============================================================
   6. БУРГЕР
   ============================================================ */
function initBurger() {
  const btn = document.getElementById("burgerBtn");
  const nav = document.getElementById("mainNav");
  if (!btn || !nav) return;
  
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
}
