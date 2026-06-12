import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Overview from "./pages/Overview";
import FAQ from "./pages/FAQ";
import AskQuery from "./pages/AskQuery";
import Chat from "./pages/Chat";
<<<<<<< Updated upstream
import Feedback from "./pages/Feedback";
=======
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import AIChatbot from "./pages/AIChatbot";
>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/ask" element={<AskQuery />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/ai-chatbot" element={<AIChatbot />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
