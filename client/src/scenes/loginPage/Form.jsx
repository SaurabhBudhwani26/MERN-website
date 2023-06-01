import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { Formik } from "formik";
import * as yup from "yup";// for form validation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";//to store user information
import { setLogin } from "state";
import Dropzone from "react-dropzone"; // so youre can upload image or file
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string()//.required("required")
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
})

const initialValuesRegister = {
    firstname: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        
        // this has picture image so we need to use form data
        // const savedUserRespo = await fetch (
        //     "http://localhost:3001/auth/xyz",
        //     {
        //         method: "GET",
                
        //     }
        // //sending form data to the particular api call
          
        // )

        // return 

        const formData = new FormData();

        for (let item in values) {

            formData.append(item, values[item]);
        }
        formData.append("picturePath", values.picture.name);
            
            const savedUserResponse = await fetch (
                "http://localhost:3001/auth/register",
                {
                    method: "POST",
                    body: formData,
                }
            //sending form data to the particular api call
            )

            console.log(savedUserResponse)

            const savedUser = await savedUserResponse.json();
            onSubmitProps.resetForm();
            console.log(savedUser)
            if (savedUser){
                setPageType("login");
            }
        

    }

    const login = async (values, onSubmitProps) =>{

        const loggedInResponse = await fetch (
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(values),
            }
        //sending form data to the particular api call
        )

        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm()

        if(loggedIn){
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
        
        navigate("/home")
        };

    }

    const handleFormSubmit = async (values, onSubmitProps) => { 
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps)
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,

            }) => (

                <form onSubmit={handleSubmit}>
                    {/* This is grabbed from handleFormSubmit by formik */}
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        // It will split in into 4 sections, with min of 0
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                    // In mobile mode each form colum would take full span of 4
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    //this will handle the situstion when we click out of the input
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    //this will handle the situstion when we click out of the input
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    //this will handle the situstion when we click out of the input
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    //this will handle the situstion when we click out of the input
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: "span 2" }}
                                />

                                <Box
                                    gridColumn="span 4"
                                    border={`ipx solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jepg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="irem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}

                                            </Box>
                                        )}

                                    </Dropzone>

                                </Box>

                            </>
                        )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            //this will handle the situstion when we click out of the input
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 2" }}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            //this will handle the situstion when we click out of the input
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2" }}
                        />


                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                        fullWidth
                        type="submit"
                        sx= {{
                            m: "2rem",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { color: palette.primary.main }

                        }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER" }

                        </Button>

                        <Typography
                        onClick={() => {
                            setPageType(isLogin ? "register" : "login")
                            resetForm();
                        }}
                        sx = {{
                            textDecoration: "underline",
                            color: palette.primary.main,
                            "&:hover": {
                                cursor: "pointer",
                                color: palette.primary.light,
                            }
                        }}
                        >

                            {isLogin ? "Don't have an account? Sign Up here" 
                            : "Already have an account? Login here"}

                        </Typography>

                    </Box>

                </form>

            )}

        </Formik>
    )


}

export default Form;