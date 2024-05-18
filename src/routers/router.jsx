import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/Login";
import { Register } from "@/Pages/Register";

export function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  )
};