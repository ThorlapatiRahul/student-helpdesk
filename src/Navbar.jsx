import { Link, useLocation } from "react-router-dom";
// We are importing icons from the 'fa' (FontAwesome) section of react-icons
import { FaHome, FaInfoCircle, FaQuestionCircle, FaPen, FaComments, FaRegCommentDots } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const hideOnPages = ["/", "/signup"];
  
  if (hideOnPages.includes(location.pathname)) {
    return null; 
  }

  return (
    <nav style={navStyle}>
      <Link to="/welcome" style={linkStyle}>
        <FaHome /> Welcome
      </Link>
      <Link to="/overview" style={linkStyle}>
        <FaInfoCircle /> Overview
      </Link>
      <Link to="/faq" style={linkStyle}>
        <FaQuestionCircle /> FAQ
      </Link>
      <Link to="/ask" style={linkStyle}>
        <FaPen /> Ask a Query
      </Link>
      <Link to="/chat" style={linkStyle}>
        <FaComments /> Chat
      </Link>
      <Link to="/feedback" style={linkStyle}>
        <FaRegCommentDots /> Feedback
      </Link>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  gap: "20px",
  padding: "15px 20px",
  backgroundColor: "#ffffff",
  borderBottom: "2px solid #eaeaea",
  justifyContent: "center",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)" // Added a soft shadow to match your UI
};

const linkStyle = {
  textDecoration: "none",
  color: "#001b3a", // Dark blue from your text
  fontWeight: "bold",
  display: "flex",
  alignItems: "center", // This centers the icon and text vertically
  gap: "8px",           // This puts a small space between the icon and text
  fontSize: "16px"
};

export default Navbar;