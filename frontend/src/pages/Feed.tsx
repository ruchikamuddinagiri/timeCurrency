import Sidebar from '../components/Sidebar'
import { api } from "../api/authApi";
import { JSXElementConstructor, ReactElement, ReactFragment, useEffect, useState } from "react";
//import RewardsPost from '../components/Rewards';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
//import Posts from '../components/Post';



let itemList: any = []
const SplitContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const LeftSection = styled.div`
  width: 50%;
`;

const RightSection = styled.div`
  width: 50%;
`;

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
  }
  //const [itemList, setItemList] = useState<any>([])

  const getPosts = async () => {
    const posts = await api.get('/posts')
    
    console.log(posts.data.posts)
    itemList = []
    posts.data.posts.forEach((item: any, index: any)=>{
        console.log(item)
        
        itemList.push( <div style={{
            background: "white",
            color: "black",
            padding: "10px",
            margin: "10px",
            border: "0.5px solid grey",
            borderRadius: "5px"
            
        }}>
            <p>User: {item.owner}</p>
            <p>Points Earned: 50</p>
            <p>{item.content}</p>
        </div>

        )
    })
    // <div style={{
    //     background: "black",
    //     color: "white",
    //     padding: "10px",
    //     margin: "10px"
        
    // }}>
    //     <p>User: {item.owner}</p>
    //     <p>Points Earned: 50</p>
    //     <p>{item.content}</p>
    // </div>
}
const Feed = () => {
        
    const [userData, setUserData] = useState<UserData>({
        id: "",
        name: "",
        email: "",
        targetHours: 0
      });
      const [reward, setReward] = useState(Boolean);
      const [submitted, setSubmitted] = useState(Boolean);
      //setReward(false)
    const getUserData = async ()=> {
        const response = await api.get<UserData>("/auth/profile");
        

        
        setUserData({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            targetHours: response.data.targetHours
          });
          if(response.data.targetHours > 1){
                console.log("yes")
                setReward(true)
          }
          
    }
    
    useEffect(() => {
        getUserData();
      }, []);

      useEffect(() => {
        getPosts();
      }, []);
    
    const myPost = ()=>{
        if(submitted==true){
            return(
                <div style={{
        background: "grey",
        color: "white",
        padding: "10px",
        margin: "10px"
        
    }}>
        
        <p>{content}</p>
    </div>
            )
        }
    }

    const content = "I just completed my target hours and earned 50 reward points!"
    
    const [postContent, setPostContent] = useState('')
    const handleMessageChange = (event) => {
        setPostContent(event.target.value)
        console.log(event.target.value)
    }
    const handleSubmit = async (event) => {
      console.log(event)
      let content = postContent
        const response = await api.post("/addPost", {
            content: content
        });
        setSubmitted(true)
        window.location.reload(false);
        console.log(response)

        
    }
    const rewardsDiv= () => {
        console.log(reward)
        
        if(reward == true){
            
            return (
                //<RewardsPost/>
                <form onSubmit={handleSubmit}>
          <label>
            <textarea 
                defaultValue="I just completed my target hours and earned 50 reward points!"
                
                onChange={handleMessageChange}
                style={{ backgroundColor: "white", color: "black", margin:"20px", padding: "20px",  
                       border: "1px solid black" }}
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
    }

    

  return (
    <>
    <Sidebar/>
    <SplitContainer>
    <LeftSection>
      
    {rewardsDiv()}
    {myPost()}
    </LeftSection>

    
    <RightSection>
    <center>
    <div style={{
        margin: "10px", 
        background: "grey",
        color: "white",
        
    }}>Targets Board</div>
    </center>
    {itemList}
    </RightSection>    
    </SplitContainer>  
    
    

   </>

  )
}

export default Feed