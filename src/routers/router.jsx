import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../Login";

export function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Login /> } />
      </Routes>
    </BrowserRouter>
  )
};