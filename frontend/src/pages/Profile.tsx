import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/authApi";
import { ApiResponse, User } from "../api/types";
import Sidebar from "../components/Sidebar";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import "./../../src/index.css"
import AWS from "aws-sdk"
import { Blob } from 'buffer' // this is from node

const bucketName = "time-currency"
const bucketRegion = "us-east-2"



AWS.config.update({
  region: bucketRegion,
  credentials:{
    accessKeyId:"",
    secretAccessKey:"",
  } 
});

let params = {
  "Bucket": "time-currency",
  //"Key": "PXL_20221104_023857382.jpg"
}

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: bucketName}
});

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
  targetHours: number;
  profile_picture_url: string;
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    targetHours: 0,
    profile_picture_url: ""
  });

  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState("");
  const [targetHours, setTargetHours] = useState(0);
  const [file, setFile] = useState<any>();  

  const getUser = async () => {
    try {
      const response = await api.get<UserData>("/auth/profile");
      setUserData({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        targetHours: response.data.targetHours,
        profile_picture_url: response.data.profile_picture_url
      });
      setName(response.data.name);
      setTargetHours(response.data.targetHours)
      setFile(response.data.profile_picture_url)
      
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

  
  const s3_upload = ( file: any)=>{
    let fileName = file.name
    let filePath = 'time-currency/' + fileName
    
    //'https://' + bucketRegion + '.amazonaws.com/time-currency/' +  filePath
    let upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "time-currency",
        Key: fileName,
        Body: file
      }
    });
    var promise = upload.promise();
    promise.then(
      function(data) {
        console.log("Successfully uploaded photo.");
        
      },
      function(err) {
        console.log("There was an error uploading your photo: ", err.message);
      }
    )
  }
 

  const uploadPicture = async ( e: any) => {
    
    setFile(URL.createObjectURL(e.target.files[0]));
    //upload to s3
    s3_upload(e.target.files[0])
    
    //build url
    let url = "https://time-currency.s3.us-east-2.amazonaws.com/"+e.target.files[0].name
    setFile(url)
    //upload to mongodb
    const response = await api.patch<ApiResponse>(
      "/auth/updateProfile",
      {
        profile_picture_url: url
      }
    );
  }


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
      targetHours: targetHours
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

  function setNewTargetHours(value: number): void {
    console.log("value:", value);
    setTargetHours(value);
  }
 
  return (
    <>
      <Sidebar />

      <section className="bg-ct-blue-700 bg-cover bg-center min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
        <div className="profile_picture">
        <img id="profile_image" src={file} height="100%" width="100%"/>
        </div>
        
          <div className="text-center">
          <input type="file" onChange={uploadPicture} />
          
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
              {showEdit ? (
                <div className="mb-4">
                <strong>Target Hours:</strong>{" "}
                <input
                  type="text"
                  value={targetHours}
                  onChange={(e) => setNewTargetHours(Number(e.target.value))}
                  className="ml-2 bg-transparent border-b border-black focus:outline-none"
                />
              </div>
              ):(<p className="mb-4">
                <strong>Target Hours:</strong>{userData?.targetHours}
              </p>)}
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
