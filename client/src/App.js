import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import LoginPage from 'scenes/loginPage'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import HomePage from 'scenes/homePage'
import AllBlogs from 'scenes/allBlogs'
import MyBlogs from 'scenes/myBlogs'
import CreateBlog from 'scenes/createBlog'

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to="/" /> } />  
                  <Route path="/blogs" element={isAuth ? <AllBlogs/> : <Navigate to="/" />} />  
                  <Route path="/myBlogs" element={isAuth ? <MyBlogs/> : <Navigate to="/" />} />
                  <Route path="/blogs/add" element={isAuth ? <CreateBlog/> : <Navigate to="/" />} />      
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
