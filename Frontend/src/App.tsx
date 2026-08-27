import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar"
import  RegisterPage  from "./pages/RegisterPage"
import AuthProvidor from "./context/AuthProvider"

function App() {

  return (
    <AuthProvidor>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element = {<HomePage/>}/>
          <Route path="/register" element = {<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvidor>
  )
}

export default App
