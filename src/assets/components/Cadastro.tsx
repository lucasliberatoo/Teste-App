import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { googleLogout } from "@react-oauth/google"
import type { User } from "../../App"
import "./css/Cadastro.css"

type FormData = {
  nome: string
  email: string
  telefone: string
  nascimento: string
  profissao: string
  uf: string
  bio: string
}

type Props = {
  user: User | null
  onLogout: () => void
}

const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA",
  "MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN",
  "RS","RO","RR","SC","SP","SE","TO",
]

function Cadastro({ user, onLogout }: Props) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formJSON, setFormJSON] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const [form, setForm] = useState<FormData>({
    nome: "", email: "", telefone: "", nascimento: "",
    profissao: "", uf: "", bio: "",
  })

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, nome: user.nome, email: user.email }))
    }
  }, [user])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit() {
    const data = { ...form, cadastradoEm: new Date().toISOString() }
    const json = JSON.stringify(data, null, 2)
    setFormJSON(json)
    setSubmitted(true)
    console.log("📋 Cadastro finalizado:", data)
  }

  function handleLogout() {
    googleLogout()
    onLogout()
    navigate("/")
  }

  function copyJSON() {
    if (formJSON) {
      navigator.clipboard.writeText(formJSON)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!user) {
    return (
      <main className="page fade">
        <div className="access-denied">
          <div className="access-icon">🔒</div>
          <h2>Acesso Restrito</h2>
          <p>Você precisa fazer login com sua conta Google para acessar o cadastro.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>← Fazer Login</button>
        </div>
      </main>
    )
  }

  return (
    <main className="page fade">
      <div className="section-header">
        <h2>Cadastro de Usuário</h2>
        <p>Complete suas informações para finalizar o cadastro</p>
      </div>

      {/* Barra de progresso */}
      <div className="progress-bar">
        {["Dados Pessoais", "Contato", "Revisão"].map((label, i) => {
          const n = i + 1
          const cls = n === step ? "active" : n < step ? "done" : ""
          return (
            <button
              key={label}
              className={`progress-step ${cls}`}
              onClick={() => n < step && setStep(n)}
            >
              {n < step ? `✓ ${label}` : label}
            </button>
          )
        })}
      </div>

      {submitted && (
        <div className="success-toast">✅ Cadastro realizado com sucesso! JSON gerado abaixo.</div>
      )}

      <div className="form-card">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="form-section-title">Informações Pessoais</div>
            <div className="form-grid">
              <div className="field">
                <label>Nome Completo <span className="pre-filled-tag">Auto</span></label>
                <input name="nome" value={form.nome} readOnly />
                <span className="hint">Importado do Google</span>
              </div>
              <div className="field">
                <label>E-mail <span className="pre-filled-tag">Auto</span></label>
                <input name="email" value={form.email} readOnly />
                <span className="hint">Importado do Google</span>
              </div>
              <div className="field">
                <label>Data de Nascimento</label>
                <input type="date" name="nascimento" value={form.nascimento} onChange={handleChange} />
              </div>
              <div className="field">
                <label>Profissão</label>
                <input name="profissao" value={form.profissao} placeholder="Ex: Estudante, Desenvolvedor..." onChange={handleChange} />
              </div>
            </div>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => setStep(2)}>Próximo →</button>
              <button className="btn btn-secondary" onClick={() => navigate("/")}>Cancelar</button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="form-section-title">Informações de Contato</div>
            <div className="form-grid">
              <div className="field">
                <label>Telefone</label>
                <input name="telefone" value={form.telefone} placeholder="(XX) XXXXX-XXXX" onChange={handleChange} required />
              </div>
              <div className="field">
                <label>Estado (UF)</label>
                <select name="uf" value={form.uf} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  {ESTADOS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field" style={{ marginBottom: "1rem" }}>
              <label>Bio / Apresentação <span className="optional-tag">opcional</span></label>
              <textarea name="bio" rows={3} value={form.bio} placeholder="Conte um pouco sobre você..." onChange={handleChange} />
            </div>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => setStep(3)}>Revisar →</button>
              <button className="btn btn-secondary" onClick={() => setStep(1)}>← Voltar</button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="form-section-title">Revisão dos Dados</div>
            <div className="review-grid">
              {[
                ["Nome", form.nome], ["E-mail", form.email],
                ["Telefone", form.telefone || "—"], ["UF", form.uf || "—"],
                ["Nascimento", form.nascimento || "—"], ["Profissão", form.profissao || "—"],
              ].map(([l, v]) => (
                <div key={l} className="review-item">
                  <div className="review-label">{l}</div>
                  <div className="review-value">{v}</div>
                </div>
              ))}
            </div>
            {form.bio && (
              <div className="review-bio">
                <div className="review-label">Bio</div>
                <p>{form.bio}</p>
              </div>
            )}
            <div className="btn-row">
              <button className="btn btn-primary" onClick={handleSubmit}>✓ Finalizar Cadastro</button>
              <button className="btn btn-secondary" onClick={() => setStep(2)}>← Editar</button>
              <button className="btn btn-danger" onClick={handleLogout}>Sair</button>
            </div>
          </>
        )}
      </div>

      {/* JSON Output */}
      {formJSON && (
        <div className="json-output fade">
          <div className="json-header">
            <span className="json-label">JSON Gerado</span>
            <button className="json-copy" onClick={copyJSON}>
              {copied ? "✓ Copiado!" : "📋 Copiar"}
            </button>
          </div>
          <pre>{formJSON}</pre>
        </div>
      )}
    </main>
  )
}

export default Cadastro
