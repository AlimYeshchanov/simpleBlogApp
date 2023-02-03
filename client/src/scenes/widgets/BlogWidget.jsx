import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";



const BlogWidget = ({
  title,
  description,
  picturePath,
})=>{

  const {palette} = useTheme();
  const main = palette.neutral.main;

  return(
    <Box >
    <WidgetWrapper>
    <FlexBetween>
      {picturePath && (
        <img 
        width="100%"
        height="300px"
        alt="blog"
        style={{borderRadius: "0.75rem", marginTop: "0.75rem"}}
        src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      </FlexBetween>
      <Typography color={main} sx={{mt: "1rem"}}>
       <b>Title of Blog: </b>{title}
      </Typography>
      <Typography color={main} sx={{mt: "1rem"}}>
       <b>Description of Blog: </b>{description}
      </Typography>
    
    </WidgetWrapper>
    </Box>
  )
}

export default BlogWidget;