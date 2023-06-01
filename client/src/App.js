import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage"; // this is due to to jsonconfig we made
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";

function App() {

  const mode = useSelector((state) => state.mode);
  //this will help us grab the value of mode that we created 
  //in /state/index.js initial state
  const theme = useMemo(()=> createTheme(themeSettings(mode)));
  // this will setup our theme that we will pass into our mui


  return (


    <div className="app">
    <BrowserRouter>
    <ThemeProvider theme={theme}>{/*this  will configure our theme for mui */}
    <CssBaseline /> {/* this will reset css to basic css for mui */}
      <Routes>  
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </ThemeProvider>
      </BrowserRouter>
    {/*  
    <BrowserRouter>: This component is imported from react-router-dom 
    and serves as the root component for setting up routing in a 
    React application. It provides the necessary infrastructure for 
    handling and managing browser history.

    <Routes>: This component is also imported from react-router-dom and 
    serves as a container for defining individual routes within the 
    application.

    <Route>: This component represents a specific route within the 
    application. It defines a mapping between a URL path and a 
    corresponding component to be rendered when that path is 
    matched.
    */}
     
    </div>
  );
}

export default App;
