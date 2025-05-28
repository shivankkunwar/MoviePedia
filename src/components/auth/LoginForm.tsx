import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { login } from '../../store/slices/authSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LoadingOverlay from '../common/LoadingOverlay';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/');
    } catch (err) {
      setError('Invalid email or password'+":"+err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        {isLoading && <LoadingOverlay message="Logging in..." />}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Sign in to your account</h1>
        <p className="text-sm text-gray-600 text-center mb-6">Enter your credentials below</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between">
            <Button type="submit" variant="primary" disabled={isLoading}>
              Sign In
            </Button>
            <Link to="/register" className="text-sm text-primary-600 hover:text-primary-800">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;