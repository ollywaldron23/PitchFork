// components/Navbar.jsx
import '../styles/components/Navbar.css';
import { FaQuestionCircle } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {

  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="navbar">
      <div className="nav-help-icon" onClick={() => setShowHelp(true)}>
        <FaQuestionCircle />
      </div>
      {showHelp && (
        <div className="help-modal">
          <div className="help-content">
            <button className="close-button" onClick={() => setShowHelp(false)}>×</button>
              <h2>What is PitchFork?</h2>
              <p>
              Pitchfork is an AI idea reviewing tool. Hover over the Angel and Devil icons to get their perspectives on your idea. The Angel gives you encouraging, positive feedback, while the Devil challenges your idea with honest, critical insights. Switch on Joke Mode for more light-hearted responses!
              </p>
          </div>
        </div>
      )}
      <img src="/header.png" alt="PitchFork Logo" className="navbar-logo" />
    </div>
  );
};

export default Navbar;