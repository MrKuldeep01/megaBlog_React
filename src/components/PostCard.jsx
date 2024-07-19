import React from 'react'
import appwriteService from '../appwrite/DB_service'
import { Link } from 'react-router-dom'

const PostCard = ({
  $id,title,featuredimage
}) => {

  return (
    <Link to={`/post/${$id}`} className='w-full'>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full flex justify-center mb-4'>
          <img src={appwriteService.getFilePreview(featuredimage)} alt={title} className='rounded-lg' />
        </div>
        <h2 className='text-2xl font-semibold '>{title}</h2>
      </div>
        
    </Link>
  )
}

export default PostCard
