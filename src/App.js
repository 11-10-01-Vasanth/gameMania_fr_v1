import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import RegisterForm from "./RegisterForm.jsx"
import LoginForm from "./LoginForm.jsx"
import Avilablegame from './AvailableGames.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/registerform" element={< RegisterForm />}></Route>
        <Route path="/loginform" element={<LoginForm/>}></Route>
        <Route path="/" element={<Avilablegame/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
