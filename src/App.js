import React, { useState } from 'react';
import './App.css';
import PasswordBox from "./Components/Password-box";
import SlideContent from "./Components/SlideContent";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordCorrect = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {!isAuthenticated ? (
        <div className="password-container">
          <PasswordBox onPasswordCorrect={handlePasswordCorrect} />
        </div>
      ) : (
        <div className="main-content">
          <SlideContent />
        </div>
      )}
    </>
  );
}

export default App;