import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar"
import  RegisterPage  from "./pages/RegisterPage"
import AuthProvidor from "./context/AuthProvider"
import LoginPage from "./pages/LoginPage"
import  CartPage  from "./pages/cartPage"
import ProtectedRoute from "./components/ProtectedRoute"
import CartProvidor from "./context/cartProvider"
import CheckoutPage from "./pages/CheckoutPage"

function App() {

  return (
    <AuthProvidor>
      <CartProvidor>
        <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/" element = {<HomePage/>}/>
            <Route path="/register" element = {<RegisterPage/>}/>
            <Route path="/login" element = {<LoginPage/>}/>
            <Route element = {<ProtectedRoute/>}>
              <Route path="/cart" element = {<CartPage/>}/>
              <Route path="/cart/checkout" element = {<CheckoutPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvidor>
    </AuthProvidor>
  )
}

export default App
