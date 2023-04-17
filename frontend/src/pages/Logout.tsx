import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '../store';
import api from '../api/authApi';
import { ApiResponse } from '../api/types';


const Logout = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  
  useEffect(() => {
      authStore.setRequestLoading(true);
      api.post<ApiResponse>("/auth/logout").then((reponse) => {
        authStore.setRequestLoading(false);
        toast.success("Successfully logged out", {
          position: "top-right",
        });
        navigate("/");
      }) .catch((error) => {
        toast.error("Cannot Log out user Due to error!", {
          position: "top-right",
        });
        
      });
  }, []);

  return (
    <div>Logout</div>
  )
}

export default Logout