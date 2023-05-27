import React from 'react';
import { Button } from "react-bootstrap";
import styled from 'styled-components';
import api from '../api/authApi';

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

const content = "I just completed my target hours and earned 50 reward points!"
const RewardsPost = () => {

    const handleSubmit = async () => {
        const response = await api.post("/addPost", {
            content: content
        });

        console.log(response)
        
    }
    return(
        <form onSubmit={handleSubmit}>
          <label>
            <textarea 
                defaultValue="I just completed my target hours and earned 50 reward points!" 
                style={{ backgroundColor: "black", color: "white", margin:"20px", padding: "20px" }}
                rows = {5}
                cols = {59}
            />
            
          </label>
          <br></br>
         
          <RoundedButton
                      variant="success"
                      onClick={handleSubmit}
                      style={{ backgroundColor: "black", color: "white",  margin:"20px",}}
                      className="mr-4"
                    >
                      Post
                    </RoundedButton>
        </form>
    )
}

export default RewardsPost

