import { Container, Typography, Button, InputLabel, FormControl, Input } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../utils/getCookie";

export default function UserAddressesPage({user}) {

    const [addresses, setAddresses] = useState([])
    const [mode, setMode] = useState()
    const [recipientName, setRecipientName] = useState()
    const [addressLine1, setAddressLine1] = useState()
    const [addressLine2, setAddressLine2] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [postalCode, setPostalCode] = useState()
    const [country, setCountry] = useState()
    const [telephone, setTelephone] = useState()

    const getAddresses = async () => {
        const result = await axios.get(`/api/users/${user.id}/addresses`)
        setAddresses(result.data)
    }

    useEffect(() => {
        getAddresses()
    }, [])

    const handleEdit = (a) => {
        setMode(a.id)
        setRecipientName(a.recipient_name)
        setAddressLine1(a.address_line1)
        setAddressLine2(a.address_line2)
        setCity(a.city)
        setState(a.state)
        setPostalCode(a.postal_code)
        setCountry(a.country)
        setTelephone(a.telephone)
    }

    const handleSaveEdit = async () => {
        await axios({
            url: `/api/users/${user.id}/addresses/${mode}/`,
            method: 'PUT',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            data: {
                recipient_name: recipientName,
                address_line1: addressLine1,
                address_line2: addressLine2,
                city,
                state,
                postal_code: postalCode,
                country,
                telephone
            }
          })
          setMode(undefined)
          getAddresses()
    }

    const handleSaveNew = async () => {
        await axios({
            url: `/api/users/${user.id}/addresses/`,
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            data: {
                recipient_name: recipientName,
                address_line1: addressLine1,
                address_line2: addressLine2,
                city,
                state,
                postal_code: postalCode,
                country,
                telephone,
                user_id: user.id
            }
          })
          setMode(undefined)
          getAddresses()
    }


    const handleDelete = async (id) => {
        await axios({
            url: `/api/users/${user.id}/addresses/${id}/`,
            method: 'DELETE',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        getAddresses()
    }

    return (
        <Container>
            {addresses.map((address) => {
                return <Container>
                {address.id === mode ? 
                    <Container sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                        <FormControl>
                            <InputLabel>Recipient Name</InputLabel>
                            <Input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Address Line 1</InputLabel>
                            <Input value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Address Line 2</InputLabel>
                            <Input value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>City</InputLabel>
                            <Input value={city} onChange={(e) => setCity(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>State</InputLabel>
                            <Input value={state} onChange={(e) => setState(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Postal Code</InputLabel>
                            <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Country</InputLabel>
                            <Input value={country} onChange={(e) => setCountry(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Telephone</InputLabel>
                            <Input value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </FormControl>
                        <Button variant='contained' onClick={handleSaveEdit}>Save</Button>
                    </Container>
                : 
                    <Container sx={{m: '20px'}} key={address.id}>
                        <Typography>{address.recipient_name}</Typography>
                        <Typography>{address.address_line1}</Typography>
                        {address.address_line2 && <Typography>{address.address_line2}</Typography>}
                        <Typography>{address.city}, {address.state} {address.postal_code}</Typography>
                        <Typography>{address.telephone}</Typography>
                        <Button onClick={() => handleEdit(address)}>Edit</Button><Button onClick={() => handleDelete(address.id)}>Delete</Button>
                    </Container>
                } </Container>
            })}
            {mode !== 'new' && <Button sx={{m: '20px'}} onClick={() => setMode('new')}>Add new address</Button>}
            {mode === 'new' && 
                <Container>
                    <Container sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                        <FormControl>
                            <InputLabel>Recipient Name</InputLabel>
                            <Input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Address Line 1</InputLabel>
                            <Input value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Address Line 2</InputLabel>
                            <Input value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>City</InputLabel>
                            <Input value={city} onChange={(e) => setCity(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>State</InputLabel>
                            <Input value={state} onChange={(e) => setState(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Postal Code</InputLabel>
                            <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Country</InputLabel>
                            <Input value={country} onChange={(e) => setCountry(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Telephone</InputLabel>
                            <Input value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </FormControl>
                        <Button variant='contained' onClick={handleSaveNew}>Save</Button>
                    </Container>
                </Container>
            }
        </Container>
    )
}