import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from 'mdb-react-ui-kit';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      console.log(response.data.access);
      localStorage.setItem('token', response.data.access);
      navigate('/home');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
      <MDBCard style={{ maxWidth: '400px', width: '100%' }}>
        <MDBCardBody>
          <MDBCardTitle className="text-center mb-4">Login</MDBCardTitle>
          <form onSubmit={handleLogin}>
            <MDBInput
              label="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="mb-4"
            />
            <MDBInput
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="mb-4"
            />
            {error && <MDBCardText className="text-danger">{error}</MDBCardText>}
            <MDBBtn type="submit" color="primary" className="w-100 mb-4">
              Login
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
