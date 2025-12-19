import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await login({ email, password });
                navigate('/'); // Redirect to home after login
            } else {
                await register({ name, email, password });
                // After register, switch to login or auto-login
                // For now, let's switch to login view and show success message
                setIsLogin(true);
                alert('Registration successful! Please log in.');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.detail || 'An error occurred');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>{isLogin ? 'Kirjaudu sisään' : 'Rekisteröidy'}</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="name">Nimi</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Sähköposti</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Salasana</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        {isLogin ? 'Kirjaudu' : 'Rekisteröidy'}
                    </button>
                </form>
                <p className="toggle-text">
                    {isLogin ? 'Eikö sinulla ole tiliä?' : 'Onko sinulla jo tili?'}
                    <button
                        className="toggle-btn"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Rekisteröidy tästä' : 'Kirjaudu tästä'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
