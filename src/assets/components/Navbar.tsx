import { useNavigate, useLocation } from "react-router-dom"
import { googleLogout } from "@react-oauth/google"
import type { User } from "../../App"
import "./css/Navbar.css"

type Props = {
  user: User | null
  onLogout: () => void
}

function Navbar({ user, onLogout }: Props) {
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    googleLogout()
    onLogout()
    navigate("/")
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand" onClick={() => navigate("/")}>
          <span className="brand-dot" />
          Teste-App
        </div>
        <nav className="nav-links">
          <button
            className={`nav-btn${location.pathname === "/" ? " active" : ""}`}
            onClick={() => navigate("/")}
          >
            🏠 Home
          </button>
          <button
            className={`nav-btn${location.pathname === "/sobre" ? " active" : ""}`}
            onClick={() => navigate("/sobre")}
          >
            👥 Equipe
          </button>
          {user && (
            <button
              className={`nav-btn${location.pathname === "/cadastro" ? " active" : ""}`}
              onClick={() => navigate("/cadastro")}
            >
              📝 Cadastro
            </button>
          )}
          {user && (
            <div className="user-chip">
              <img src={user.imagem} alt={user.nome} className="user-chip-img" />
              <span>{user.nome.split(" ")[0]}</span>
            </div>
          )}
          {user && (
            <button className="nav-btn danger" onClick={handleLogout}>
              Sair
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
