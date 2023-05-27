import React from 'react';
import { Button } from "react-bootstrap";
import styled from 'styled-components';
import api from '../api/authApi';

const renderPost = () => {
    return (
        <p>Hi</p>
    )
}

const Posts = async  () => {
    const posts = await api.get('/posts')
    
    posts.data.forEach((post: any)=>{
        console.log(post)
    })
    return (<div>
        {renderPost}
    </div>
        
    )
}
export default Posts