import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../src/Components/SignIn/SignIn";
import Register from "../src/Components/Register/Register";
import Landing from "../src/Components/Landing/Landing";

export const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  </BrowserRouter>
);

export default routes;
