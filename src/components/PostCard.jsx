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
            <div className="w-full max-w-2xl min-h-32 rounded-2xl border border-blue-950 p-4 flex gap-4 shadow-md hover:bg-gradient-to-r from-slate-50 to-blue-100 hover:shadow-xl transition-transform hover:scale-[1.02]">
                <div className="w-2/5 relative">
                    {imageUrl ? (
                        <img
                            className="w-full rounded-l-xl"
                            src={imageUrl}
                            alt={title}
                        />
                    ) : (
                        <div className="w-full h-40 bg-gray-200 rounded-l-xl animate-pulse" />
                    )}
                </div>
                <div className='flex flex-col'>
                    <h1 className="text-lg font-bold text-blue-950  leading-tight font-serif">{title}</h1>
                    <p className='font-s text-gray-500   font-serif'><i>{postPrev}</i></p>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
