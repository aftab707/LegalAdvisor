import React, { useState } from 'react';
import { Scale, Mail, ArrowLeft } from 'lucide-react';
import './Auth.css';

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);
    // Add your forgot password logic here
  };

  return (
    <div className="auth-container">
      <div className="auth-card forgot-card">
        <div className="auth-logo">
          <div className="logo-icon">
            <Scale size={20} color="#fff" />
          </div>
          <h1 className="logo-text">Legal Advisor</h1>
        </div>

        <a href="/login" className="back-button">
          <ArrowLeft size={14} />
          Back to Login
        </a>

        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">
          Enter your email and we'll send you a reset link
        </p>

        {emailSent ? (
          <>
            <div className="success-message">
              <div className="success-title">Check Your Email</div>
              <p className="success-text">
                We've sent a password reset link to your email address. 
                Please check your inbox and follow the instructions.
              </p>
            </div>
            <a href="/login" className="auth-button secondary-button">
              Return to Login
            </a>
          </>
        ) : (
          <div className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>
            </div>

            <button onClick={handleSubmit} className="auth-button">
              Send Reset Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;