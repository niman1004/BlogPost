import React, { useEffect, useState } from 'react'
import {Link , useNavigate , useParams} from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Button from '../components/Button'
import Container from '../components/container/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
  const [post , setPost]= useState(null)
  const {slug}= useParams()
  const navigate = useNavigate()
  const userData= useSelector((state)=> state.auth.userData)
  const isAuthor=post && userData ? post.userID === userData.$id : false
  
  useEffect(()=>{
    if(slug){
      appwriteService.getPost(slug).then((post)=>{
        if(post){
          setPost(post)
        }
        else{
          navigate("/")
        }
      })
    }
  } , [slug , navigate])


  const deletePost = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
  
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  
  return post? (
    <div className='py-8'>
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={appwriteService.getPic(post.featuredImage)} alt={post.title}
          className='rounded-xl'/>
          {isAuthor && (
            <div className="absolute right-6 top-6 ">
              <Link to={`/edit-post/${post.$id}`}>
                  <Button >Edit</Button>
              </Link>
              <Button onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
        <div className='w-full mb-6'>
         <h1 className='text-2xl font-serif font-bold'>{post.title}</h1>
         <div className='borwser-css'>
            {parse(post.content)}
         </div>
        </div>
      </Container>
    </div>
   ): null
}

export default Post
