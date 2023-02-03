import { Box,} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import BlogWidget from "scenes/widgets/BlogWidget";
import { setBlogs } from "state";

const AllBlogs = ()=>{
  const dispatch = useDispatch();
  const blogs = useSelector((state)=>state.blogs);
  const token = useSelector((state)=>state.token);
  //const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getBlogs = async()=>{
    const response = await fetch("http://localhost:3001/blogs", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setBlogs({blogs: data}));
  };



  useEffect(()=>{
    getBlogs();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps



  return(
    <Box>
      <Navbar/>
        <Box>
          <>
            {blogs.map(
              ({
                _id,
                userId,
                title,
                description,
                picturePath,
              })=>(
                <BlogWidget 
                key={_id}
                blogUserId={userId}
                title={title}
                description={description}
                picturePath={picturePath}
                />
              )
            )}
          </>
        </Box>
    </Box>
  )
}

export default AllBlogs;