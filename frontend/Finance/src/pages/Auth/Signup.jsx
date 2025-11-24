import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/Authlayout';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }

      const res = await fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed. Try again.");
        return;
      }

      // Save token and user to localStorage
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Registration successful, token saved');
        navigate("/dashboard"); // redirect on success
      } else {
        setError("Registration succeeded but no token received");
      }

    } catch (err) {
      console.error('Signup error:', err);
      setError("Something went wrong. Try again.");
    }
  };


  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
          <input
            type="text"
            className="shadow border rounded w-full py-2 px-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* IMAGE */}
        <div className="mb-4 flex flex-col items-center">
          <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image</label>

          {profileImage && (
            <img src={profileImage} alt="Preview" className="w-24 h-24 rounded-full object-cover mb-4" />
          )}

          <input
            type="file"
            accept="image/*"
            className="block w-full"
            onChange={handleImageChange}
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            className="shadow border rounded w-full py-2 px-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            className="shadow border rounded w-full py-2 px-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* BUTTONS */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>

          <Link to="/login" className="text-blue-500 hover:text-blue-800">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
