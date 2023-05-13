import { Container, Typography, Button, Input, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import axios from 'axios'
import { getCookie } from "../utils/getCookie";

export default function UserEditAccountPage({user}) {

    const [mode, setMode] = useState('read')
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)

    const handleNameSave = async () => {
        const response = await axios({
            url: `/api/users/${user.id}/`,
            method: 'PUT',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            data: {
                first_name: firstName,
                last_name: lastName,
                username: user.username
            }
          })
    }

    if (mode === 'read') {
        return (
            <Container>
                <Typography><b>Email:</b> {user.username}</Typography>
                <Typography><b>Name:</b> {user.first_name || user.last_name ? user.first_name + ' ' + user.last_name : 'None'}</Typography>
                <Button onClick={() => setMode('edit')}>Edit</Button>
            </Container>
        )
    } else if (mode === 'edit') {
        return (
            <Container>
                <FormControl>
                    <InputLabel>First Name</InputLabel><Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </FormControl>
                <FormControl>
                    <InputLabel>Last Name</InputLabel><Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </FormControl>
                <FormControl>
                    <Button 
                        variant='contained' 
                        onClick={() => {
                            setMode('read')
                            handleNameSave()
                        }}
                    >Save</Button>
                </FormControl>
            </Container>
        )
    } else {
        return (
            <Container>
                Something went wrong...
            </Container>
        )
    }
}