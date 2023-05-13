import React from "react";
import { Box, Button, Menu, Container, Link, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = ({user}) => {

  const { logout } = useAuth0()

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }

  return (
    user && (
      <Container>
        <Box sx={{ display: 'flex' }}>
          <Button sx={{color: 'white'}} onClick={handleOpenNavMenu}>{user.first_name || user.username}</Button>
        </Box>
        <Menu
          id="user-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: 'block'
          }}
        >
          <MenuItem>
            <Link href="/account">My Account</Link>
          </MenuItem>
          <MenuItem>
            <Link onClick={logout}>Logout</Link>
          </MenuItem>
        </Menu>
      </Container>
    )
  );
};

export default Profile;