import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { BASE_URL } from "../constants/BaseUrl";

const RegisterPage = () => {
    const [firstName,setFirstName] = useState<string>("");
    const [lastName,setLastName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [err,setErr] = useState("")

    const handleSubmit = async () => {
        //handle submit API
        
        const Response = await fetch(`${BASE_URL}/user/register`,{
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        });

        if (!Response.ok) {
            setErr("Unable to Register user");
            return;
        }

        const data = Response.json();
        console.log(data);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }
    
    return (
        <Container>
            <Box sx={{display : "flex" , justifyContent : "center" , alignItems : "center", flexDirection : "column" , mt : 4}}>
                <Typography variant="h3" >Register New Account</Typography>
                
                {/*The form Box*/}
                <Box sx={{display : "flex" , flexDirection : "column" , gap : "6px" , mt : 4, border : 1 , p : 2 , borderColor : "#f5f5f5"}}>
                    <TextField onChange={(e) => setFirstName(e.target.value)} value={firstName} label = "First Name" name="firstName"></TextField>
                    <TextField onChange={(e) => setLastName(e.target.value)} value={lastName} label = "Last Name" name="lastName"></TextField>
                    <TextField  onChange={(e) => setEmail(e.target.value)} value = {email} label = "Email" name="email" type="email"></TextField>
                    <TextField onChange={(e) => setPassword(e.target.value)} value={password} label = "Password" name="passwor" type="password"></TextField>
                    <Button onClick={handleSubmit} variant="contained">Register</Button>
                    {err && <Typography sx={{color : "red"}}>{err}</Typography>}
                </Box>
            </Box>
            

        </Container>
    )
}

export default RegisterPage