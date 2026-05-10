import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Home from "./assets/components/Home"
import Sobre from "./assets/components/Sobre"
import Cadastro from "./assets/components/Cadastro"
import Navbar from "./assets/components/Navbar"

export type User = {
  nome: string
  email: string
  imagem: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) setUser(JSON.parse(stored))
  }, [])

  function login(userData: User) {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Home user={user} onLogin={login} />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/cadastro" element={<Cadastro user={user} onLogout={logout} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
