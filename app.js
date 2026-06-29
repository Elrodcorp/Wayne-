
const DATA = window.WAYNE_DATA;
const $ = (id) => document.getElementById(id);
const norm = (t) => (t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function fmt(n) {
  return Number(n).toLocaleString("pt-BR");
}

function findPath(query) {
  const q = norm(query);
  if (!q) return DATA.profiles[1];

  const ranked = DATA.profiles.map(profile => {
    let match = 0;
    profile.terms.forEach(term => {
      if (q.includes(norm(term))) match += 30;
    });
    profile.skills.forEach(skill => {
      if (q.includes(norm(skill))) match += 10;
    });
    if (q.includes(norm(profile.area))) match += 30;
    return { ...profile, match };
  }).sort((a, b) => b.match - a.match);

  return ranked[0].match > 0 ? ranked[0] : DATA.profiles[0];
}

function updateScore() {
  const profile = findPath($("goal").value);
  $("mainScore").textContent = profile.score;
  $("sideScore").textContent = profile.score;
  $("sideFill").style.width = profile.score + "%";
  $("kpiCourses").textContent = fmt(9000 + profile.courses_total);
  $("kpiProviders").textContent = profile.providers_total + " fontes";
}

function runWayne() {
  const profile = findPath($("goal").value);
  $("result").classList.add("show");
  $("areaTitle").textContent = profile.area;
  $("narrative").textContent = `Rota construída com ${profile.skills.length} competências críticas, ${profile.courses_total} cursos potenciais e ${profile.roles.length} caminhos profissionais.`;

  $("tags").innerHTML = profile.skills.map(skill => `<span class="tag">${skill}</span>`).join("");
  $("roles").innerHTML = profile.roles.map(role => `<span class="tag">${role}</span>`).join("");

  $("courses").innerHTML = profile.courses.map(course => `
    <div class="course card">
      <h3>${course[1]}</h3>
      <p>${course[0]} • ${course[2]} • ${course[3]}</p>
      <a href="${course[4]}" target="_blank" rel="noreferrer">Acessar ↗</a>
    </div>
  `).join("");

  updateScore();
  setTimeout(() => {
    $("result").scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

function setPrompt(text) {
  $("goal").value = text;
  updateScore();
  runWayne();
}

function renderStaticPanels() {
  $("trends").innerHTML = DATA.trends.map(item => `
    <div class="trendRow">
      <div>⌬</div>
      <div>${item[0]}</div>
      <span class="pct">+${item[1]}%</span>
    </div>
  `).join("");

  $("states").innerHTML = DATA.states.map((state, index) => `
    <div class="rank">
      <span>${index + 1}</span>
      <div>${state[0]} - ${state[1]}
        <div class="bar"><div class="fill" style="width:${state[3]}%"></div></div>
      </div>
      <span>${state[3]}%</span>
    </div>
  `).join("");

  $("skills").innerHTML = DATA.skills.map((skill, index) => `
    <div class="skill">
      <div class="ball">${index + 1}</div>
      <div>${skill[0]}</div>
      <div class="bar"><div class="fill" style="width:${Math.min(100, skill[1] / 90)}%"></div></div>
      <span>${fmt(skill[1])}</span>
    </div>
  `).join("");

  $("tracks").innerHTML = DATA.tracks.map(track => `
    <div class="track panel">
      <h3>${track[0]}</h3>
      <p>${track[1]}</p>
      <div class="bar"><div class="fill" style="width:${track[2]}%"></div></div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderStaticPanels();

  $("goal").addEventListener("input", updateScore);
  $("goal").addEventListener("keydown", (event) => {
    if (event.key === "Enter") runWayne();
  });
  $("searchBtn").addEventListener("click", runWayne);

  document.querySelectorAll("[data-prompt]").forEach(btn => {
    btn.addEventListener("click", () => setPrompt(btn.dataset.prompt));
  });

  setInterval(() => {
    $("todayNum").textContent = fmt(12842 + Math.floor(Math.random() * 220));
  }, 1700);

  updateScore();
});
