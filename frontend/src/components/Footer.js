import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Link from '@mui/material/Link'

export default function Footer() {
  return (
    <Container
      id='footer'
      sx={{
        padding: '10px',
        mt: '10px',
        backgroundColor: '#7F957C',
        minWidth: '100%',
        color: 'white'
      }}
      disableGutters
    >
      <List>
        <ListItem><Typography sx={{fontWeight: '700'}}>
          <Link href='/' underline='none' color='inherit'>Hannah's Farmstand</Link>
        </Typography></ListItem>
        </List>
      <Typography align='center'>© {new Date().getFullYear()} Hannah's Farmstand</Typography>
    </Container>
  )
}