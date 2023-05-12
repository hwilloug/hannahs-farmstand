import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Typography } from "@mui/material";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <></>;
  }

  return (
    isAuthenticated && (
      <Box sx={{ display: 'flex' }}>
        <Typography>{user.name}</Typography>
      </Box>
    )
  );
};

export default Profile;