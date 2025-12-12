import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import './Auth.scss';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    if (password.length < 6) {
      setError(t('passwordTooShort'));
      return;
    }

    setLoading(true);

    try {
      await register(email, password, firstName, lastName);
      navigate('/');
    } catch {
      setError(t('registerFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <main>
        <div className="auth-container">
          <h1>{t('registerTitle')}</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">{t('firstName')}</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">{t('lastName')}</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('email')}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('password')}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? t('signingUp') : t('signUp')}
            </button>
          </form>

          <p className="auth-link">
            {t('alreadyHaveAccount')} <Link to="/login">{t('login')}</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
