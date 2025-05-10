import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Button from '../components/Button'
import Container from '../components/container/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userID === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        } else {
          navigate('/')
        }
      })
    }
  }, [slug, navigate])

  const deletePost = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }

  return post ? (
    <div className="py-10 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <Container>
        <div className="bg-white p-6 rounded-2xl shadow-lg border flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow">
            <img
              src={appwriteService.getPic(post.featuredImage)}
              alt={post.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
  
          {/* Right: Content */}
          <div className="w-full lg:w-1/2">
           
  
            <h1 className="text-3xl font-bold font-serif text-slate-800 mb-4">{post.title}</h1>
            <div className="prose max-w-none text-slate-700 prose-headings:font-serif prose-img:rounded-md">
              {parse(post.content)}
            </div>
             {/* Author Buttons */}
             {isAuthor && (
              <div className="flex gap-2 justify-end mb-4">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button >Edit</Button>
                </Link>
                <Button onClick={deletePost} >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post
