import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import Container from '../components/container/Container';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      console.log(userData)
      appwriteService.getPosts([]).then((response) => {
        if (response) {
          const userPosts = response.documents.filter(
            (post) => post.userID === userData.$id
          );
          setPosts(userPosts);
        }
      });
    }
  }, [userData]);

  if (!userData) {
    return <h1 className='font-serif'>Login to read Posts</h1>;
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className='p-2 w-full md:w-1/3' key={post.$id}>
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <h2 className='text-center w-full'>You haven't posted anything yet.</h2>
          )}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;
