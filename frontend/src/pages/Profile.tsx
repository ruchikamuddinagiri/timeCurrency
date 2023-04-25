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
    id: "",
    name: "",
    email: "",
  });
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState("");

  const getUser = async () => {
    try {
      const response = await api.get<UserData>("/auth/profile");

      setUserData({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
      });
      setName(response.data.name);
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

  const saveUser = async (updatedUserData: UserData) => {
    try {
      const response = await api.patch<ApiResponse>(
        "/auth/updateProfile",
        updatedUserData
      );

      setUserData(updatedUserData);

      toast.success(response.data.message, {
        position: "top-right",
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
    setShowEdit(true);
  };

  const onCancelEdit = () => {
    setShowEdit(false);
  };

  const onSaveEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedUserData: UserData = {
      ...userData,
      name: name,
    };

    saveUser(updatedUserData);

    setShowEdit(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  function setNewName(value: string): void {
    console.log("value:", value);
    setName(value);
  }

  return (
    <>
      <Sidebar />

      <section className="bg-ct-blue-700 bg-cover bg-center min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div className="text-center">
          <img src= "./src/assets/profilepic.jpeg" alt="Profile picture" className="rounded-full h-32 w-32 mb-8 mx-auto" />
            <p className="text-4xl font-semibold text-black mb-8">
              Profile Page
            </p>
            <div className="bg-grey rounded-md p-4">
              {showEdit ? (
                <div className="mb-4">
                  <strong>Name:</strong>{" "}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setNewName(e.target.value)}
                    className="ml-2 bg-transparent border-b border-black focus:outline-none"
                  />
                </div>
              ) : (
                <p className="mb-4">
                  <strong>Name:</strong> {userData?.name}
                </p>
              )}
              <p className="mb-4">
                <strong>Email:</strong> {userData?.email}
              </p>
              <div className="mt-8">
                {showEdit ? (
                  <>
                    <RoundedButton
                      variant="success"
                      onClick={onSaveEdit}
                      style={{ backgroundColor: "black", color: "white" }}
                      className="mr-4"
                    >
                      Save
                    </RoundedButton>
                    <RoundedButton
                      variant="danger"
                      onClick={onCancelEdit}
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      Cancel
                    </RoundedButton>
                  </>
                ) : (
                  <RoundedButton
                    variant="danger"
                    onClick={onClickEdit}
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Edit
                  </RoundedButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProfilePage;
