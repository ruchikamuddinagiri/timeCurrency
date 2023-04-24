import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/authApi";
import { ApiResponse, User } from "../api/types";
import Sidebar from "../components/Sidebar";
import { Button } from "react-bootstrap";
import styled from "styled-components";
const RoundedButton = styled(Button)`

background-color: black;
color: white;
font-size: 16px;
padding: 12px 24px;
transition: all 0.2s ease-in-out;
&:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}
`;

interface UserData {
  id: string;
  name: string;
  email: string;
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserData>({
    id: '',
    name: '',
    email: '',
  });

  const getUser = async () => {
    try {
      const response = await api.get<UserData>("/auth/profile");

      setUserData({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
      });
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };
  
  
  const onClickEdit = () => {
    //setShowEdit(true);
  };


  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Sidebar />

      <section
        className="bg-ct-blue-700 bg-cover bg-center min-h-screen pt-20"

      >
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div className="text-center">
            <p className="text-4xl font-semibold text-black mb-8">Profile Page</p>
            <div className="bg-grey rounded-md p-4">
              {/* <p className="mb-4">
                <strong>ID:</strong> {userData?.id}
              </p> */}
              <p className="mb-4">
                <strong>Name:</strong> {userData?.name}
              </p>
              <p className="mb-4">
                <strong>Email:</strong> {userData?.email}
              </p>
              <div className="mt-8">
              <RoundedButton
            variant="danger"
            onClick={onClickEdit}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Edit
          </RoundedButton> 
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
