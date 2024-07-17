import React, { useEffect } from 'react'
import {Container,PostCard} from "../components"
import appwriteService from '../appwrite/DB_service'
const AllPost = () => {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        appwriteService.listPosts([]).then(posts => posts && setPosts(posts.documents)).catch(err => console.log("error occured in fetching posts :: AllPost.jsx ::"+err))
    },[])
  return (
    <div className='w-full p-4'>
        <Container>
            <div className="flex flex-wrap gap-3 items-center">
            {
                posts.map((post)=>(
                    <div className="p-2 w-1/4" key={post.$id}>
                        <PostCard post={post}/>
                    </div>
                ))
            }
            </div>
        </Container>
      
    </div>
  )
}

export default AllPost
