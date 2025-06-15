import React, { useRef, useState, useEffect } from "react";
import '../App.css';

function PasswordBox({ onPasswordCorrect }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef([]);

  const STORED_HASH = "170460"; // Hashed value of "1234"

  const simpleHash = (input) => {
    let hash = 0;
    if (input.length === 0) return hash.toString(16);

    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
    setErrorMessage('');
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const checkPassword = () => {
    const enteredPassword = otp.join('');
    const enteredHash = simpleHash(enteredPassword);

    if (enteredHash === STORED_HASH) {
      setErrorMessage('');
      onPasswordCorrect();
    } else {
      setErrorMessage('رمز الدخول غير صحيح');
      setOtp(['', '', '', '']);
      inputRefs.current.forEach(input => {
        if (input) input.style.borderColor = '#ff4d6d';
      });
      
      if (inputRefs.current[0]) inputRefs.current[0].focus();

      setTimeout(() => {
        inputRefs.current.forEach(input => {
          if (input) input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
      }, 1000);
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  return (
    <div className="password-box">
      <h1 className="password-title">خاص جداً</h1>
      <p className="password-subtitle">أدخل رمز الدخول المكون من 4 أرقام</p>
      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="number"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otp-input"
            ref={el => inputRefs.current[index] = el}
          />
        ))}
      </div>
      <button className="submit-btn" onClick={checkPassword}>تأكيد</button>
      <div className="error-message">{errorMessage}</div>
    </div>
  );
}

export default PasswordBox;