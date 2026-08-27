import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar"
import  RegisterPage  from "./pages/RegisterPage"
import AuthProvidor from "./context/AuthProvider"
import LoginPage from "./pages/LoginPage"
import  CartPage  from "./pages/cartPage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <AuthProvidor>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element = {<HomePage/>}/>
          <Route path="/register" element = {<RegisterPage/>}/>
          <Route path="/login" element = {<LoginPage/>}/>
          <Route element = {<ProtectedRoute/>}>
            <Route path="/cart" element = {<CartPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvidor>
  )
}

export default App
