import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Overview from "./pages/Overview";
import FAQ from "./pages/FAQ";
import AskQuery from "./pages/AskQuery";
import Chat from "./pages/Chat";
import Feedback from "./pages/Feedback";

// Import our new Navbar component!
import Navbar from "./Navbar"; 

function App() {
  return (
    <BrowserRouter>
      {/* The Navbar sits outside the specific routes so it shows on every page */}
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/ask" element={<AskQuery />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;