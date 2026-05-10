import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import type { User } from "../../App"
import "./css/Home.css"

type GoogleUser = {
  name: string
  email: string
  picture: string
}

type Props = {
  user: User | null
  onLogin: (user: User) => void
}

function Home({ user, onLogin }: Props) {
  const navigate = useNavigate()

  function handleLogin(credentialResponse: any) {
    if (!credentialResponse.credential) return
    const decoded = jwtDecode<GoogleUser>(credentialResponse.credential)
    onLogin({
      nome: decoded.name,
      email: decoded.email,
      imagem: decoded.picture,
    })
  }

  return (
    <main className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h1>Sistema de Cadastro com Google</h1>
          <p>
            Faça login com sua conta Google e complete seu cadastro de forma
            rápida e segura. Seus dados são importados automaticamente.
          </p>
          {!user ? (
            <p className="hero-cta">👇 Faça login abaixo para começar</p>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate("/cadastro")}>
              Ir para Cadastro →
            </button>
          )}
        </div>
        <div className="hero-visual">
          <div className="step-item"><div className="step-num">1</div><span>Login com conta Google</span></div>
          <div className="step-item"><div className="step-num">2</div><span>Dados preenchidos automaticamente</span></div>
          <div className="step-item"><div className="step-num">3</div><span>Complete o cadastro</span></div>
          <div className="step-item"><div className="step-num">4</div><span>JSON gerado e validado</span></div>
        </div>
      </section>

      {/* Perfil (logado) */}
      {user && (
        <div className="profile-card fade">
          <img className="profile-avatar" src={user.imagem} alt={user.nome} />
          <div className="profile-info">
            <h3>{user.nome}</h3>
            <p>{user.email}</p>
            <span className="badge badge-green">✓ Autenticado com Google</span>
          </div>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "auto" }}
            onClick={() => navigate("/cadastro")}
          >
            Completar Cadastro →
          </button>
        </div>
      )}

      {/* Cards informativos */}
      <div className="cards-row">
        <div className="info-card">
          <div className="icon-badge ib-blue">🔐</div>
          <h3>Login Seguro</h3>
          <p>Autenticação via OAuth Google. Suas credenciais nunca são armazenadas localmente.</p>
        </div>
        <div className="info-card">
          <div className="icon-badge ib-green">⚡</div>
          <h3>Preenchimento Auto</h3>
          <p>Nome e e-mail importados diretamente do seu perfil Google.</p>
        </div>
        <div className="info-card">
          <div className="icon-badge ib-amber">📋</div>
          <h3>Exportação JSON</h3>
          <p>Ao finalizar, os dados são organizados em formato JSON para integração.</p>
        </div>
      </div>

      {/* Login */}
      {!user && (
        <div className="login-card fade">
          <h2>Acesse o Sistema</h2>
          <p>Entre com sua conta Google para continuar</p>
          <div className="login-area">
            <GoogleLogin onSuccess={handleLogin} />
          </div>
        </div>
      )}
    </main>
  )
}

export default Home
