import { Container, Tabs, Typography, Tab, Box } from "@mui/material";
import { useState } from "react";
import UserEditAccountPage from "./UserEditAccountPage";
import UserAddressesPage from "./UserAddressesPage";
import UserOrdersPage from "./UserOrdersPage";
import { withAuthenticationRequired } from "@auth0/auth0-react";

function UserPage({user}) {

    const [tab, setTab] = useState(0)

    const handleTabChange = (e, v) => {
        setTab(v)
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                {children}
              </Box>
            )}
          </div>
        );
      }

    if (user === undefined) {
        return <Container>
            Please login to view this page.
        </Container>
    }

    return (
        <Container sx={{p: '50px'}}>
            <Typography variant="h5" sx={{mb: '25px'}}>Hi, {user.first_name ? user.first_name : user.username}!</Typography>
            <Tabs value={tab} onChange={handleTabChange}>
                <Tab label="my account" />
                <Tab label="my addresses" />
                <Tab label="my orders" />
            </Tabs>
            <TabPanel value={tab} index={0}>
                <UserEditAccountPage user={user} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <UserAddressesPage user={user} />
            </TabPanel>
            <TabPanel value={tab} index={2}>
                <UserOrdersPage user={user} />
            </TabPanel>
        </Container>
    )
}

export default withAuthenticationRequired(UserPage)