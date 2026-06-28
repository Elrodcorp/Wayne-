import React, { useMemo, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Search, GraduationCap, Star, ExternalLink, Sparkles, BookOpen, Target, BarChart3, ShieldCheck, Rocket, BrainCircuit, Briefcase } from 'lucide-react'
import { courses } from './courses'
import './style.css'

function normalize(text) {
  return (text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
function unique(values) { return [...new Set(values)].sort() }
function calcScore(course, term) {
  let score = 70
  const joined = normalize(`${course.area} ${course.curso} ${course.instituicao} ${course.descricao} ${course.nivel}`)
  const search = normalize(term)
  if (!search) score += 8
  if (search && joined.includes(search)) score += 22
  if (normalize(course.certificado).includes('gratuito')) score += 8
  if (['FGV', 'ENAP', 'Bradesco', 'COFEN', 'UNA-SUS', 'Microsoft', 'Google'].some(name => course.instituicao.includes(name))) score += 8
  return Math.min(score, 99)
}
function App() {
  const [term, setTerm] = useState('')
  const [area, setArea] = useState('')
  const [nivel, setNivel] = useState('')
  const [cert, setCert] = useState('')
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wayneFavorites') || '[]') } catch { return [] }
  })
  useEffect(() => { localStorage.setItem('wayneFavorites', JSON.stringify(favorites)) }, [favorites])
  const areas = useMemo(() => unique(courses.map(c => c.area)), [])
  const niveis = useMemo(() => unique(courses.map(c => c.nivel)), [])
  const certs = useMemo(() => unique(courses.map(c => c.certificado)), [])
  const results = useMemo(() => courses.map(course => ({ ...course, score: calcScore(course, term) })).filter(course => {
    const joined = normalize(`${course.area} ${course.curso} ${course.instituicao} ${course.descricao} ${course.nivel}`)
    const search = normalize(term)
    return (!search || joined.includes(search)) && (!area || course.area === area) && (!nivel || course.nivel === nivel) && (!cert || course.certificado === cert)
  }).sort((a, b) => b.score - a.score), [term, area, nivel, cert])
  const avgScore = results.length ? Math.round(results.reduce((sum, c) => sum + c.score, 0) / results.length) : 0
  const institutions = unique(results.map(c => c.instituicao)).length
  const freeCount = results.filter(c => normalize(c.certificado).includes('gratuito')).length
  function toggleFavorite(id) { setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]) }
  function selectArea(value) { setTerm(value); setArea(value) }
  function clearFilters() { setTerm(''); setArea(''); setNivel(''); setCert('') }

  return (
    <div className="app">
      <header className="hero">
        <nav className="nav">
          <div className="brand">
            <div className="brandIcon"><GraduationCap size={30} /></div>
            <div><strong>Wayne</strong><span>Elrod Corp • Cursos Gratuitos</span></div>
          </div>
          <a href="#resultados" className="navButton">Ver resultados</a>
        </nav>
        <section className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow"><Sparkles size={14} /> Wayne 1.0 • Portfólio funcional</p>
            <h1>O copiloto de cursos gratuitos para sua próxima virada profissional.</h1>
            <p className="subtitle">Busque cursos por área, profissão ou habilidade. O Wayne organiza oportunidades por relevância, certificado, nível, instituição e utilidade prática.</p>
            <div className="heroBadges">
              <span><ShieldCheck size={16}/> Base inicial curada</span>
              <span><BrainCircuit size={16}/> Pronto para IA</span>
              <span><Briefcase size={16}/> Foco em empregabilidade</span>
            </div>
          </div>
          <div className="searchPanel">
            <label>O que você quer aprender?</label>
            <div className="searchBox">
              <Search size={20} />
              <input value={term} onChange={event => setTerm(event.target.value)} placeholder="Ex.: comunicação, enfermagem, Power BI..." />
            </div>
            <div className="quickAreas">{areas.map(item => <button key={item} onClick={() => selectArea(item)}>{item}</button>)}</div>
          </div>
        </section>
      </header>
      <main>
        <section className="stats">
          <div className="stat"><BookOpen /><b>{results.length}</b><span>cursos encontrados</span></div>
          <div className="stat"><BarChart3 /><b>{institutions}</b><span>instituições</span></div>
          <div className="stat"><Star /><b>{favorites.length}</b><span>favoritos salvos</span></div>
          <div className="stat"><Target /><b>{avgScore}</b><span>Wayne Score médio</span></div>
        </section>
        <section className="pitchPanel">
          <div><p className="eyebrow">Proposta de valor</p><h2>De uma busca solta para uma trilha de desenvolvimento.</h2></div>
          <p>Esta versão demonstra o conceito central do Wayne: localizar cursos gratuitos, organizar por utilidade e transformar aprendizado em direção profissional. O próximo passo é ampliar a base e conectar IA, vagas e currículo.</p>
        </section>
        <section className="filters">
          <select value={area} onChange={event => setArea(event.target.value)}><option value="">Todas as áreas</option>{areas.map(item => <option key={item} value={item}>{item}</option>)}</select>
          <select value={nivel} onChange={event => setNivel(event.target.value)}><option value="">Todos os níveis</option>{niveis.map(item => <option key={item} value={item}>{item}</option>)}</select>
          <select value={cert} onChange={event => setCert(event.target.value)}><option value="">Todos os certificados</option>{certs.map(item => <option key={item} value={item}>{item}</option>)}</select>
          <button className="clear" onClick={clearFilters}>Limpar</button>
        </section>
        <section className="path">
          <div><p className="eyebrow"><Rocket size={14}/> Trilha Wayne</p><h2>Do curso ao mercado</h2></div>
          <div className="steps">{['Base', 'Técnica', 'Ferramenta', 'Portfólio', 'Vaga'].map((step, index) => <div className="step" key={step}><b>{index + 1}</b><span>{step}</span></div>)}</div>
        </section>
        <section id="resultados" className="resultsHeader">
          <div><p className="eyebrow">Resultados encontrados</p><h2>{term ? `Resultados para “${term}”` : 'Cursos em destaque'}</h2></div>
          <span>{results.length} item(ns) • {freeCount} gratuito(s)</span>
        </section>
        <section className="courseGrid">
          {results.length === 0 && <div className="empty">Nenhum curso encontrado. Tente comunicação, enfermagem, finanças, logística, Power BI ou IA.</div>}
          {results.map(course => {
            const favorite = favorites.includes(course.id)
            return (
              <article className="courseCard" key={course.id}>
                <div className="score">{course.score}</div>
                <p className="area">{course.area}</p>
                <h3>{course.curso}</h3>
                <strong>{course.instituicao}</strong>
                <p>{course.descricao}</p>
                <div className="meta"><span>{course.horas}</span><span>{course.nivel}</span><span className="free">{course.certificado}</span></div>
                <div className="actions">
                  <a href={course.link} target="_blank" rel="noreferrer">Abrir curso <ExternalLink size={15} /></a>
                  <button className={favorite ? 'favorite active' : 'favorite'} onClick={() => toggleFavorite(course.id)}>{favorite ? '★ Favorito' : '☆ Salvar'}</button>
                </div>
              </article>
            )
          })}
        </section>
      </main>
      <footer><strong>Wayne 1.0</strong> • Protótipo funcional para portfólio e captação de recursos • Elrod Corp</footer>
    </div>
  )
}
createRoot(document.getElementById('root')).render(<App />)