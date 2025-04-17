import React from 'react'
import appwriteService from '../appwrite/config'
import { useState , useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'

function Allposts() {
  const [posts, setPosts]= useState([])

  useEffect(()=>{
    appwriteService.getPosts([]).then((posts)=>{
      if(posts){
        setPosts(posts.documents)
      }
    })
  } , [])

  if(posts.length===0){
    <h1 className='font-serif'>Login to read Posts</h1>
  }
  return (
    <div className='w-full py-8'>
         <Container>
          <div className='flex flex-wrap'>
            {
              posts.map((post)=>(
                <div className='p-2 w-1/2' key={post.$id}>
                  <PostCard {...post}/>
                </div>
              ))
            }
          </div>
         </Container>
    </div>
  )
}

export default Allposts
