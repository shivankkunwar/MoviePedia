import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { register } from '../../store/slices/authSlice';
import LoadingOverlay from '../common/LoadingOverlay';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    general: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {
      username: '',
      email: '',
      password: '',
      general: ''
    };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        general: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await dispatch(register(formData)).unwrap();
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('Password must be at least 6 characters')) {
          setErrors(prev => ({
            ...prev,
            password: 'Password must be at least 6 characters long'
          }));
        } else if (err.message.includes('User already exists')) {
          setErrors(prev => ({
            ...prev,
            email: 'This email is already registered'
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            general: err.message || 'Registration failed. Please try again.'
          }));
        }
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'An unknown error occurred. Please try again.'
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        {isLoading && <LoadingOverlay message="Creating your account..." />}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">Create your account</h1>
        <p className="text-sm text-gray-600 text-center mb-6">Sign up to get started</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.general}
            </div>
          )}
          <Input
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="flex items-center justify-between">
            <Button type="submit" variant="primary" size="md" disabled={isLoading}>
              Register
            </Button>
            <Link to="/login" className="text-sm text-primary-600 hover:text-primary-800">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;