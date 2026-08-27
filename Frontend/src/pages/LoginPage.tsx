import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [err,setErr] = useState("");
    const navigate = useNavigate()

    const {login} = useAuth();

    const handleSubmit = async () => {
        //handle submit API
        
        const Response = await fetch(`${BASE_URL}/user/login`,{
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email,
                password
            })
        });

        if (!Response.ok) {
            setErr("Unable to Login user");
            return;
        }

        const token = await Response.json();
        if (!token) {
            setErr("Unable to retreive user token");
            return;
        }
        console.log(token);

        login(email,token);
        navigate("/");

        setEmail("");
        setPassword("");
    }
    
    return (
        <Container>
            <Box sx={{display : "flex" , justifyContent : "center" , alignItems : "center", flexDirection : "column" , mt : 4}}>
                <Typography variant="h3" >Login To Your Account</Typography>
                
                {/*The form Box*/}
                <Box sx={{display : "flex" , flexDirection : "column" , gap : "6px" , mt : 4, border : 1 , p : 2 , borderColor : "#f5f5f5"}}>
                    <TextField  onChange={(e) => setEmail(e.target.value)} value = {email} label = "Email" name="email" type="email"></TextField>
                    <TextField onChange={(e) => setPassword(e.target.value)} value={password} label = "Password" name="passwor" type="password"></TextField>
                    <Button onClick={handleSubmit} variant="contained">Login</Button>
                    {err && <Typography sx={{color : "red"}}>{err}</Typography>}
                </Box>
            </Box>
            

        </Container>
    )
}

export default LoginPage