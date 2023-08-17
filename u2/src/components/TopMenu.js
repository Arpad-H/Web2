import {Container, Nav, Navbar} from "react-bootstrap";
import React, {Component} from "react";
import UserSessionWidget from "./UserSessionWidget";
import {connect} from "react-redux";
import PersonalPage from "./PersonalPage";
import LogoutButton from "./LogoutButton";
import UserManagementButton from "./UserManagementButton";
import OpenPersonalPageButton from "./OpenPersonalPageButton";
import OpenForumThreadOverviewButton from "./OpenForumThreadOverviewButton";

const mapStateToProps = state => {
    return state
}

class TopMenu extends Component {
    render() {
        const user = this.props.userID
        const admin = this.props.isAdministrator

        let LoginButton
        // console.log(user)
        let showUserManagement = false
        let loggedIn = false
        if (user) {
            loggedIn = true
            LoginButton = <LogoutButton/>
            if (admin) {
                showUserManagement = true
            }
        } else {
            loggedIn = false
            showUserManagement = false
            LoginButton = <UserSessionWidget/>
        }
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">WE2 Forum</Navbar.Brand>
                        {showUserManagement ? < UserManagementButton/> : null}
                        {loggedIn ? < OpenPersonalPageButton/> : null}
                        {loggedIn ? < OpenForumThreadOverviewButton/> : null}
                        {/*<Navbar.Toggle aria-controls="responsive-navbar-nav"/>*/}
                        {/*<Navbar.Collapse id="responsive-navbar-nav">*/}
                        <Nav className="me-auto">
                            {/*        <Nav.Link href="#features">Features</Nav.Link>*/}
                            {/*        <Nav.Link href="#pricing">Pricing</Nav.Link>*/}
                            {/*        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
                            {/*            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                            {/*            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                            {/*            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                            {/*            <NavDropdown.Divider/>*/}
                            {/*            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                            {/*        </NavDropdown>*/}
                        </Nav>
                        <Nav>
                            {LoginButton}

                        </Nav>
                        {/*</Navbar.Collapse>*/}
                    </Container>
                </Navbar>
            </div>)
    }
}

export default connect(mapStateToProps)(TopMenu)

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
//
// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
//
// const TopMenu = () => {
//     const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//     const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
//
//     const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorElNav(event.currentTarget);
//     };
//     const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorElUser(event.currentTarget);
//     };
//
//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };
//
//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };
//
//     return (
//         <AppBar position="static">
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>
//                     <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//                     <Typography
//                         variant="h6"
//                         noWrap
//                         component="a"
//                         href="/"
//                         sx={{
//                             mr: 2,
//                             display: { xs: 'none', md: 'flex' },
//                             fontFamily: 'monospace',
//                             fontWeight: 700,
//                             letterSpacing: '.3rem',
//                             color: 'inherit',
//                             textDecoration: 'none',
//                         }}
//                     >
//                         LOGO
//                     </Typography>
//
//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                         <IconButton
//                             size="large"
//                             aria-label="account of current user"
//                             aria-controls="menu-appbar"
//                             aria-haspopup="true"
//                             onClick={handleOpenNavMenu}
//                             color="inherit"
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Menu
//                             id="menu-appbar"
//                             anchorEl={anchorElNav}
//                             anchorOrigin={{
//                                 vertical: 'bottom',
//                                 horizontal: 'left',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'left',
//                             }}
//                             open={Boolean(anchorElNav)}
//                             onClose={handleCloseNavMenu}
//                             sx={{
//                                 display: { xs: 'block', md: 'none' },
//                             }}
//                         >
//                             {pages.map((page) => (
//                                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                                     <Typography textAlign="center">{page}</Typography>
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>
//                     <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//                     <Typography
//                         variant="h5"
//                         noWrap
//                         component="a"
//                         href=""
//                         sx={{
//                             mr: 2,
//                             display: { xs: 'flex', md: 'none' },
//                             flexGrow: 1,
//                             fontFamily: 'monospace',
//                             fontWeight: 700,
//                             letterSpacing: '.3rem',
//                             color: 'inherit',
//                             textDecoration: 'none',
//                         }}
//                     >
//                         LOGO
//                     </Typography>
//                     <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//                         {pages.map((page) => (
//                             <Button
//                                 key={page}
//                                 onClick={handleCloseNavMenu}
//                                 sx={{ my: 2, color: 'white', display: 'block' }}
//                             >
//                                 {page}
//                             </Button>
//                         ))}
//                     </Box>
//
//                     <Box sx={{ flexGrow: 0 }}>
//                         <Tooltip title="Open settings">
//                             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                             </IconButton>
//                         </Tooltip>
//                         <Menu
//                             sx={{ mt: '45px' }}
//                             id="menu-appbar"
//                             anchorEl={anchorElUser}
//                             anchorOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             open={Boolean(anchorElUser)}
//                             onClose={handleCloseUserMenu}
//                         >
//                             {settings.map((setting) => (
//                                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                                     <Typography textAlign="center">{setting}</Typography>
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     );
// };
// export default TopMenu;
