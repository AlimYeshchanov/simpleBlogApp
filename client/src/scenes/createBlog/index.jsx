import {EditOutlined, DeleteOutlined, ImageOutlined} from "@mui/icons-material";
import {Box, Divider, Typography, InputBase, useTheme, Button, IconButton} from "@mui/material"
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setBlogs} from "state";
import Navbar from "scenes/navbar";


const CreateBlog = () => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {palette} = useTheme();
  const {_id} = useSelector((state)=>state.user);
  const token = useSelector((state)=>state.token);
  //const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;


  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("title", title)
    formData.append("description", description);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/blogs`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const blogs = await response.json();
    dispatch(setBlogs({ blogs }));
    setImage(null);
    setTitle("");
    setDescription("");
  };




  return (
    <Box>
      <Navbar/>
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <InputBase
        placeholder="Title of Post..."
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
        sx={{
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: "1rem 2rem",
        }}
        />
      </FlexBetween>
      <FlexBetween mt="1rem">
      <InputBase
       multiline
       rows={4}
        placeholder="Description of Post..."
        onChange={(e)=>setDescription(e.target.value)}
        value={description}
        sx={{
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: "1rem 2rem",
        }}
        />
      </FlexBetween>

      <Divider sx={{margin: "1.25rem 0"}} />

      {isImage && (
        <Box
        border={`1px solid ${medium}`}
        borderRadius="5px"
        mt="1rem"
        p="1rem"
        >
        <Dropzone
        acceptedFiles=".jpg,.jpeg,.png"
        multiple={false}
        onDrop={(acceptedFiles)=>setImage(acceptedFiles[0])}
        >
        {({getRootProps, getInputProps})=>(
          <FlexBetween>
            <Box
            {...getRootProps()}
            border={`2px dashed ${palette.primary.main}`}
            p="1rem"
            width="100%"
            sx={{"&:hover": {cursor: "pointer"}}}
            >
            <input {...getInputProps()} />
            {!image ? (
              <p>Add Image Here</p>
            ):(
              <FlexBetween>
                <Typography>{image.name}</Typography>
                <EditOutlined />
              </FlexBetween>
            )}
            </Box>
            {image && (
              <IconButton
              onClick={()=>setImage(null)}
              sx={{width: "15%"}}
              >
              <DeleteOutlined/>
              </IconButton>
            )}
          </FlexBetween>
        )}
        </Dropzone>
        </Box>
      )}

      <FlexBetween mt="1rem">
        <FlexBetween
        gap="0.5rem"
        onClick={()=>setIsImage(!isImage)}
        >
          <ImageOutlined sx={{color: mediumMain}} />
          <Typography color={mediumMain} 
          sx={{"&:hover": {cursor: "pointer", color: medium}}}
          >
            Image
          </Typography>
        </FlexBetween>

        <Button
        
        onClick={handlePost}
        sx={{
          color: palette.neutral.dark,
          backgroundColor: palette.primary.light,
          borderRadius: "3rem",
        }}
        >
        Create Blog
        </Button>
      </FlexBetween>

    </WidgetWrapper>
    </Box>
  )
}

export default CreateBlog
