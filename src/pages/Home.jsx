import React from 'react'
import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/DB_service";
const Home = () => {
 const [posts,setPosts] = useState([])
 useEffect(()=>{
    appwriteService.listPosts().then(posts => posts && setPosts(posts.documents)).catch(err => console.log("error occured in fetching posts :: Home.jsx :: pages"))
 })
 if(posts.length == 0){
    return ( 
        <div className="w-full p-4 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap items-center">
                    <h2 className='text-4xl font-semibold px-4 py-2 rounded'> Login to read the posts</h2>
                </div>
            </Container>
        </div>
    )
 }
 return(
    <div className="w-full p-4">
        <Container>
            <div className="flex flex-wrap">
                {
                    posts.map((post => (
                        <div className="p-2 w-1/4" key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    )))
                }
            </div>
        </Container>
    </div>
 )
}

export default Home
