import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "http://localhost:5000/api/auth/register" : "http://localhost:5000/api/auth/login";
    const data = await fetch(endpoint,{
     method:"POST",
     headers:{
       "Content-Type":"application/json"
     },
     body:JSON.stringify(formData)
    })
    const res = await data.json();
    if(!res.success){
      alert(res.message)
      return
    }
    
    localStorage.setItem("token", res.token)
    localStorage.setItem("user" , JSON.stringify(res.user))
    
    alert(isSignUp ? 'Registration successful!' : 'Login successful!');
    
   
    if (res.user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-100 flex items-center justify-center px-4">
      
      <Link
        to="/"
        className="absolute top-4 left-8 text-orange-600 hover:text-orange-700 font-semibold"
      >
        ← Back to Home
      </Link>

    
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
     
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-12 text-white flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">{isSignUp ? 'Join Us!' : 'Welcome Back!'}</h2>
          <p className="text-lg opacity-90 mb-8">
            {isSignUp 
              ? 'Create an account to start managing your FoodApp and discover amazing culinary experiences.' 
              : 'Sign in to access your FoodApp admin dashboard and manage your delicious products.'}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <span>Manage Products</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <span>View Analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
              <span>Customize Settings</span>
            </div>
          </div>
        </div>

        
        <div className="p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{isSignUp ? 'Sign Up' : 'Login'}</h1>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Create your account to get started' 
                : 'Enter your credentials to access your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {isSignUp && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required={isSignUp}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
                  placeholder="Your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

           
            {isSignUp && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required={isSignUp}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
                  placeholder="+1 234 567 8900"
                />
              </div>
            )}

          
            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <button type="button" onClick={() => alert('Password reset feature coming soon!')} className="text-sm text-orange-600 hover:text-orange-700 bg-transparent border-none cursor-pointer">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition transform hover:scale-105 shadow-lg"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>

            <div className="text-center text-sm text-gray-600">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => setIsSignUp(!isSignUp)} 
                className="text-orange-600 hover:text-orange-700 font-semibold bg-transparent border-none cursor-pointer"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
};

export default Login;
