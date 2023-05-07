import { useState } from "react"
import { Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Button } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import { userActions } from "../actions/userActions"
import { connectRedux } from "../utils/connect"

export default function SignUpPage({state, actions, props}) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (
        <Container sx={{m: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" required>
                <InputLabel htmlFor="outlined-firstname">First Name</InputLabel>
                <OutlinedInput
                    id="outlined-firstname"
                    type='text'
                    label="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" required>
                <InputLabel htmlFor="outlined-lastname">Last Name</InputLabel>
                <OutlinedInput
                    id="outlined-lastname"
                    type='text'
                    label="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" required>
                <InputLabel htmlFor="outlined-username">Username</InputLabel>
                <OutlinedInput
                    id="outlined--username"
                    type='text'
                    label="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" required>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </FormControl>
            <Button variant="contained" onClick={() => {
                actions.signUp({firstName, lastName, username, password})
            }}>Sign Up</Button>
        </Container>
    )
}

export function createSignUpPage() {
  return connectRedux(
    SignUpPage,
    (state) => state,
    userActions
  )
}