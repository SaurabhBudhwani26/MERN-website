import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";

import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close

} from "@mui/icons-material";

// this mui box componemt allows us to pass any css property in the components
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const NavBar = () => {
    const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
    // useState(false): This is a call to the useState hook in React. 
    // The useState hook is used to add state to functional components. 
    // It takes an initial value as a parameter and returns an array with 
    // two elements. The first element (isMobileMenuToggle in this case) 
    // represents the current state value, and the second element 
    // (setIsMobileMenuToggle) is the function used to update the state value.
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);//this hook will grab the initial user info from the state/index.js
    const isNonMobioleScreens = useMediaQuery("(min-width: 1000px")
    // useMediaQuery is a mui hook which tells us if the screen size is 
    //below min width or above min width so we dont need to use media 
    //query in css
    const theme = useTheme();// grab the theme pallete from theme.js
    const neutralLight = theme.palette.neutral.light;
    const neutralDark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;


    return <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
            <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25)"
                color="primary"
                onClick={() => navigate("/home")}
                sx={{
                    "&:hover": {
                        color: primaryLight,
                        cursor: "pointer"
                    }
                }}
            >
                Liker
            </Typography>
            {isNonMobioleScreens && (
                <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1 rem 1.5rem">
                    <InputBase placeholder="Search..." />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            )}
            {/* if it is not mobile screen we will give search bar */}
        </FlexBetween>
        {/* DESKTOP NAV */}
        {isNonMobioleScreens ? (

            <FlexBetween gap="2rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (<LightMode sx={{ color: neutralDark, fontSize: "25px" }} />)}
                </IconButton>
                <Message sx={{ fontSize: "25px" }} />
                <Notifications sx={{ fontSize: "25px" }} />
                <Help sx={{ fontSize: "25px" }} />
                <FormControl variant="standard" value={fullName}>
                    {/* this is goning to be for the dropdown were we can see the user is logged in and can get logged out */}
                    <Select
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },

                            "& .MuiSelect-select:focus": {

                                backgroundColor: neutralLight
                            }
                        }}

                        input={<InputBase />}

                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>
                            Log Out
                        </MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>

        ) : (

            <IconButton
                onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
            >
                <Menu />
                {/* Menu Icon */}

            </IconButton>

        )}

        {/* MOBILE NAV */}
        {!isNonMobioleScreens && isMobileMenuToggle && (
            <Box
                position="fixed"
                right= "0"
                bottom = "0"
                height="100%"
                zIndex = "10" //so it is in front of everything
                maxWidth = "500px"
                minWidth = "300px"
                backgroundColor = {background}
            >
                {/* CLOSE ICON  */}
                <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton
                    onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}>
                        <Close />
                    </IconButton>
                onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
                </Box>

                {/* MENU ITEMS */}
                <FlexBetween display="flex" flexDirection="column" justifyContent="center" allignItem="center" gap="3rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (<LightMode sx={{ color: neutralDark, fontSize: "25px" }} />)}
                </IconButton>
                <Message sx={{ fontSize: "25px" }} />
                <Notifications sx={{ fontSize: "25px" }} />
                <Help sx={{ fontSize: "25px" }} />
                <FormControl variant="standard" value={fullName}>
                    {/* this is goning to be for the dropdown were we can see the user is logged in and can get logged out */}
                    <Select
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem"
                            },

                            "& .MuiSelect-select:focus": {

                                backgroundColor: neutralLight
                            }
                        }}

                        input={<InputBase />}

                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>
                            Log Out
                        </MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>

            </Box>
        )}
    </FlexBetween>
};      //we can only pass this kind of css because of box mui component


export default NavBar;