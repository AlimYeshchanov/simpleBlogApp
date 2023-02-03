import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const UserWidget = ({userId, picturePath})=>{
  const [user, setUser] = useState(null);
  const token = useSelector((state)=>state.token);
  const navigate = useNavigate();
  const {palette} = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async()=>{
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  }



  useEffect(()=>{
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if(!user){
    return null;
  }

  const {
    firstName,
    lastName,
    location,
  } = user;

  return(
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem" onClick={()=>navigate(`/profile/${userId}`)}>
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography variant="h5" color={dark} fontWeight="500" 
            sx={{"&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            }}}>
            {firstName} {lastName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
          <LocationOnOutlined fontSize="medium" sx={{color: main}} />
            <Typography color={medium} pt="0.2rem">{location}</Typography>
          </Box>
        </FlexBetween>

      </FlexBetween>

      
    </WidgetWrapper>
  )
}

export default UserWidget;