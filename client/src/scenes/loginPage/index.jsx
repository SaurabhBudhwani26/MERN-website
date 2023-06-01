import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form"

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobioleScreens  = useMediaQuery("min-width: 1000px");
    return <Box>
        <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign="center">
            <Typography
            fontWeight="bold"
            fontSize ="32px"
            color = "primary"
            >
                Liker

            </Typography>
        </Box>

        <Box
        width ={isNonMobioleScreens ? "50%" : "93%"}
        p ="2rem"
        m ="2rem auto"
        borderRadius="1.5rem"
        backgroundColor ={theme.palette.background.alt}
        >
            {/* Form Box */}
            <Form />
            {/* rem gives consistency accross different devices and browsers */}
            <Typography fontWeight="500" variant="h5" >
                Welcome to Liker, social media website!
            </Typography>
        </Box>
    </Box>
};

export default LoginPage;