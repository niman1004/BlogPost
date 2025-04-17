import React, { useState, useEffect } from 'react'
import {useParams , useNavigate} from 'react-router-dom'
import Container from '../components/container/Container'
import PostForm from '../components/postform/PostForm'
import appwriteService from '../appwrite/config'

function EditPosts() {
  const [post , setPost]= useState('happy')
  const {slug}= useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if(slug){
      appwriteService.getPost(slug).then((post)=>{
        if(post){
          console.log('got the post')
          setPost(post)
        }
        else{
          console.log('no post of that slug, navigating....')
          navigate("/")
        }
      })
    }
  } , [slug , navigate])
  return (
    <div className='py-6'>
      <Container>
        <PostForm post={post}/>
      </Container>
         
    </div>
  )
}

export default EditPosts
