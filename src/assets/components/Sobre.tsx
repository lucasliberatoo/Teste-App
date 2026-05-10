import { useNavigate } from "react-router-dom"
import "./css/Sobre.css"

const devs = [
  {
    initials: "LL",
    nome: "Lucas Liberato",
    role: "Desenvolvedor Front-End",
    bio: "Estudante concluindo o 3º ano do ensino médio integrado ao curso técnico em Informática para a Internet. Tem grande interesse em desenvolvimento web, buscando evoluir tanto no front-end quanto no back-end. Gosta de explorar novas tecnologias, criar interfaces modernas e melhorar a experiência do usuário. Está trabalhando agora na produção do INSUMED, seu projeto de TCC.",
    skills: ["React", "TypeScript", "HTML", "CSS"],
    color: "var(--avatar-a)",
  },
  {
    initials: "IA",
    nome: "Isabelly Almeida",
    role: "Desenvolvedora Front-End",
    bio: "Estudante concluindo o 3º ano do ensino médio integrado ao curso técnico em Informática para a Internet. Integrante da dupla responsável pelo desenvolvimento desta aplicação. Contribuiu com a arquitetura dos componentes React, configuração do roteamento e integração com a API de autenticação Google OAuth. Está trabalhando agora na produção do INSUMED, seu projeto de TCC.",
    skills: ["React", "TypeScript", "HTML", "CSS"],
    color: "var(--avatar-b)",
  },
]

const techs = [
  ["React 19", "Interface de usuário"],
  ["TypeScript", "Tipagem estática"],
  ["Vite", "Build tool"],
  ["React Router", "Navegação SPA"],
  ["Google OAuth", "Autenticação"],
]

function Sobre() {
  const navigate = useNavigate()

  return (
    <main className="page fade">
      <div className="about-banner">
        <div>
          <h1>Nossa Equipe</h1>
          <p>Conheça os desenvolvedores por trás deste projeto</p>
        </div>
        <div className="about-stats">
          <div className="about-stat"><div className="num">3</div><div className="lbl">Telas</div></div>
          <div className="about-stat"><div className="num">React</div><div className="lbl">Stack</div></div>
          <div className="about-stat"><div className="num">2026</div><div className="lbl">Projeto</div></div>
        </div>
      </div>

      <div className="devs-grid">
        {devs.map((dev) => (
          <div className="dev-card" key={dev.nome}>
            <div className="dev-avatar" style={{ background: dev.color }}>
              {dev.initials}
            </div>
            <h2>{dev.nome}</h2>
            <div className="dev-role">{dev.role}</div>
            <p className="dev-bio">{dev.bio}</p>
            <div className="skill-tags">
              {dev.skills.map((s) => (
                <span className="skill-tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="tech-box">
        <h3>🛠️ Tecnologias Utilizadas</h3>
        <div className="tech-grid">
          {techs.map(([t, d]) => (
            <div className="tech-item" key={t}>
              <div className="tech-name">{t}</div>
              <div className="tech-desc">{d}</div>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}

export default Sobre
