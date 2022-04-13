import HomePage from "./pages/home/home";
import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";
import LoginPage from "./pages/login/login"; 
import { useAuthContext } from "./AuthContext";
import SignupPage from "./pages/register/register";

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Routes>
        <Route path="/home" element={user ? <HomePage /> : <SignupPage />} />
        <Route path="/login" element={user ? <HomePage /> : <LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
