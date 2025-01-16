import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { register } from '../../store/slices/authSlice';
import LoadingOverlay from '../common/LoadingOverlay';

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
    <div className="max-w-md mx-auto mt-8">
      {isLoading && <LoadingOverlay message="Creating your account..." />}
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-neutral-400 text-black leading-tight focus:outline-none focus:shadow-outline ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            disabled={isLoading}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-neutral-400 text-black leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-neutral-400 text-black leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={isLoading}
          >
            Register
          </button>
          <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;