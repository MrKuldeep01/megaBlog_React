import React, { useEffect,useState } from 'react'
import {Container,PostCard} from "../components"
import appwriteService from '../appwrite/DB_service'
const AllPost = () => {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        appwriteService.listPosts().then(posts => posts && setPosts(posts.documents)).catch(err => console.log("error occured in fetching posts :: AllPost.jsx ::"+err))
    },[])
  return (
    <div className='w-full p-4'>
        <Container>
            <div className="flex flex-wrap gap-3 items-center">
            { (posts.length > 0) ?
                posts.map((post)=>(
                    <div className="p-2 w-1/4" key={post.$id}>
                        <PostCard post={post}/>
                    </div>
                )) 
                :
                <h2 className="text-4xl text-center w-full font-sans font-bold px-4 py-2 rounded">
                Nothing to see Create a post first .
              </h2>
            }
            </div>
        </Container>
      
    </div>
  )
}

export default AllPost
