import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import parse from 'html-react-parser'

function PostCard({ $id, title, content, featuredImage }) {
    const [postPrev, setPostPrev] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {

        const temp = document.createElement("div")
        temp.innerHTML = content
        const plainText = temp.textContent || temp.innerText || ""
        const preview = plainText.slice(0, 100) + "..."
        setPostPrev(preview)
    }, [content])

    useEffect(() => {
        const url = appwriteService.getPic(featuredImage)
        setImageUrl(url)
    }, [featuredImage])

    return (
        <Link to={`/post/${$id}`}>
  <div className="relative w-full max-w-sm h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
    
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>

    {/* Text content */}
    <div className="relative z-10 h-full p-4 flex flex-col justify-end text-white">
    
      <h1 className="text-xl font-bold leading-tight font-serif">{title}</h1>
      <p className="text-sm font-serif opacity-90"><i>{postPrev}</i></p>
    </div>
  </div>
</Link>

    )
}

export default PostCard
