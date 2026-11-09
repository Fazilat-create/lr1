const courseData = [
  { id: "q1", num: "01", cls: "q1", title: "I четверть",   desc: "Множества и события",      count: 8  },
  { id: "q2", num: "02", cls: "q2", title: "II четверть",  desc: "Вероятность и статистика", count: 9  },
  { id: "q3", num: "03", cls: "q3", title: "III четверть", desc: "Деревья и логика",         count: 7  },
  { id: "q4", num: "04", cls: "q4", title: "IV четверть",  desc: "Операции над событиями",   count: 10 }
];

document.addEventListener("DOMContentLoaded", () => {
  renderQuarters();
  initBurger();
});

function renderQuarters() {
  const grid = document.getElementById("quartersGrid");
  if (!grid) return;

  grid.innerHTML = courseData.map(q => `
    <article class="quarter-card ${q.cls}">
      <span class="quarter-card__num">${q.num}</span>
      <h3 class="quarter-card__title">${q.title}</h3>
      <p class="quarter-card__desc">${q.desc} · ${q.count} тем</p>
      <a class="quarter-card__btn" href="#quarters">Открыть →</a>
    </article>
  `).join("");
}

function initBurger() {
  const btn = document.getElementById("burgerBtn");
  const nav = document.getElementById("mainNav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
}
