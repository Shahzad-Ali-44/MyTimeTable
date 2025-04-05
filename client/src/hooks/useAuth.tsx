import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token); 
        const currentTime = Date.now() / 1000;

       
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          
          localStorage.removeItem('token');
          localStorage.removeItem('isAuthenticated');
        } else {
          
          const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000;
          const logoutTimer = setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            navigate('/login');
          }, timeUntilExpiry);
         
          return () => clearTimeout(logoutTimer);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        navigate('/login');  
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated'); 
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
};

export default useAuth;
