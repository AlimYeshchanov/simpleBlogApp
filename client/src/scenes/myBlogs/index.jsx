import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from 'scenes/navbar'
import UserWidget from 'scenes/widgets/UserWidget'
import BlogWidget from 'scenes/widgets/BlogWidget'
import { setBlogs } from 'state'
import { useEffect } from 'react'

const MyBlogs = () => {
  const { _id, picturePath } = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const token = useSelector((state)=>state.token);
  const blogs = useSelector((state)=>state.blogs);
  const userId = _id;

  const getUserBlogs = async()=>{
    const response = await fetch(`http://localhost:3001/blogs/${userId}/blogs`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
      dispatch(setBlogs({blogs: data})); 
  }

  useEffect(()=>{
      getUserBlogs();         
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar/>
      <Box>
        <UserWidget userId={_id} picturePath={picturePath} />
        <>
            {blogs.map(
              ({
                _id,
                title,
                description,
                picturePath,
              })=>(
                <BlogWidget 
                key={_id}
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

export default MyBlogs
