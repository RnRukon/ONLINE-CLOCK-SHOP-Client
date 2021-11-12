import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DashboardHome from './DashboardHome/DashboardHome';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import useAuth from '../../Hooks/useAuth';
import AdminRoute from './AdminRoute/AdminRoute';
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import AddedProduct from './AddedProduct/AddedProduct';
import MyOrder from './UserDashboard/MyOrder/MyOrder';
import ManageAllOrders from './ManageAllOrders/ManageAllOrders';
import UpdateProduct from './UpdateProduct/UpdateProduct';
import UpdateProductFrom from './UpdateProduct/UpdateProductFrom/UpdateProductFrom';
import Review from './UserDashboard/Review/Review';
import Pay from './UserDashboard/Pay/Pay';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { admin, logOut } = useAuth();
    const dashboard = () => {
        setMobileOpen(!mobileOpen);
    };
    let { path, url } = useRouteMatch();
    const drawer = (
        <div>
            <Toolbar />


            <Divider />
            <Link to='/' className="text-decoration-none"> <ListItem button>
                <HomeIcon />Go to Home
            </ListItem>
            </Link>
            <List>
                <Link to={`${url}`} className="text-decoration-none">
                    <ListItem button>
                        <HomeIcon />MY Order
                    </ListItem>
                </Link>
                <Link to={`${url}/pay`} className="text-decoration-none">
                    <ListItem button>
                        <HomeIcon />Pay
                    </ListItem>
                </Link>
                <Link to={`${url}/review`} className="text-decoration-none">
                    <ListItem button>
                        <HomeIcon />Review
                    </ListItem>
                </Link>

                {admin && <Box>
                    <Link to={`${url}/manageAllOrders`} className="text-decoration-none">
                        <ListItem button>
                            <AdminPanelSettingsIcon />   Manage All Orders
                        </ListItem>
                    </Link>
                    <Link to={`${url}/makeAdmin`} className="text-decoration-none">
                        <ListItem button>
                            <AdminPanelSettingsIcon />  Make Admin
                        </ListItem>
                    </Link>

                    <Link to={`${url}/updateProduct`} className="text-decoration-none">
                        <ListItem button>
                            <AddPhotoAlternateIcon /> Update Product
                        </ListItem>
                    </Link>
                    <Link to={`${url}/addedProduct`} className="text-decoration-none">
                        <ListItem button>
                            <AddPhotoAlternateIcon />  Add a Product
                        </ListItem>
                    </Link>
                </Box>}

                <ListItem button onClick={logOut} >
                    <ListItemIcon className='text-blue-600'>
                        <InboxIcon className='text-blue-600' /><span className='text-blue-600'>Logout</span>
                    </ListItemIcon>
                </ListItem>
            </List>


        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                color="secondary"
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={dashboard}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"

                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"

            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer

                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={dashboard}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}


                    sx={{

                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Switch>
                    <Route exact path={path}>
                        <MyOrder></MyOrder>
                    </Route>
                    <Route path={`${path}/pay`}>
                        <Pay></Pay>
                    </Route>
                    <Route path={`${path}/review`}>
                        <Review></Review>
                    </Route>
                    <AdminRoute path={`${path}/manageAllOrders`}>
                        <ManageAllOrders></ManageAllOrders>
                    </AdminRoute>
                    <AdminRoute path={`${path}/makeAdmin`}>
                        <MakeAdmin></MakeAdmin>
                    </AdminRoute>
                    <AdminRoute path={`${path}/updateProduct`}>
                        <UpdateProduct></UpdateProduct>
                    </AdminRoute>
                    <AdminRoute path={`${path}/updateProductFrom/:id`}>
                        <UpdateProductFrom></UpdateProductFrom>
                    </AdminRoute>
                    <AdminRoute path={`${path}/addedProduct`}>
                        <AddedProduct></AddedProduct>
                    </AdminRoute>
                </Switch>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;