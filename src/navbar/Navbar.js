import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from "../images/logo.png";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Tooltip } from "react-tooltip";
import CartList from "../view/public/CartList";
import IsCart from "../images/IsCart.png";
import { connect } from 'react-redux';
import { Grid } from '@mui/material';
import './navbar.css'
const drawerWidth = 240;
const linkPage = (url) => {
    window.location.replace(window.location.origin + url);
}
function DrawerAppBar(props) {
    const { window } = props;
    const { search } = useLocation();
    const queryParams = React.useMemo(() => search.substring(4, search?.length), [search]);
    const [auth, setAuth] = React.useState(false);
    const [current, setCurrent] = React.useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [showCart, setShowCart] = React.useState(false);

    console.log(current)
    const name = auth ? 'Profile' : "Login";
    const link = auth ? '/profile_account' : "/login";

    const navItems = [{ name: 'Shop All', link: '/product?id=0' }, { name: 'Fresh Milled', link: '/product?id=1' }, { name: 'Powdered Spices', link: '/product?id=2' }, { name: 'Location', link: '/location' }, { name: name, link: link }];
    const navItems1 = [{ name: 'Shop All', link: '/product?id=0' }, { name: 'Fresh Milled', link: '/product?id=1' }, { name: 'Powdered Spices', link: '/product?id=2' }];
    const navItems2 = [{ name: 'Shop All', link: '/product?id=0' }, { name: 'Fresh Milled', link: '/product?id=1' }];
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const currentPage = (val) => {
        if (val) {
            setCurrent(val.substring(0, 1))
        }else{
            setCurrent(0);
        }
    }
    React.useEffect(() => {
        currentPage(queryParams)
        var token = localStorage.getItem('token');
        if (token?.length > 0) {
            setAuth(!auth);
        }
    }, []);
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, ml: 3 }}>
                <img src={Logo} className="object-cover mt-1 cursor-pointer" onClick={() => linkPage("/home")} />
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText className='hover:text-[#009898]' primary={item.name} onClick={() => linkPage(item.link)} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    const drawer1 = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, ml: 3 }}>
                <img src={Logo} className="object-cover mt-1 cursor-pointer" onClick={() => linkPage("/home")} />
            </Typography>
            <Divider />
            <List>
                {navItems2.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText className='hover:text-[#009898]' primary={item.name} onClick={() => linkPage(item.link)} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    const containerStyle = {
        marginTop: window?.innerWidth <= 600 ? '40px' : '52px',
        backgroundColor: 'white', color: 'black'
      };
    //console.log(props.cartList.length > 0)
    return (
        <Box sx={{ display: 'flex', }}>
            <CssBaseline />
            <AppBar className='navbarMarginHeight' component="nav" style={containerStyle}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ display: { sm: 'none' } }}
                        className='w-full'
                    >
                        <Grid container spacing={6}>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'left' }} onClick={handleDrawerToggle}> <MenuIcon /></Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'center', height: "60px" }}><img src={Logo} className="object-cover cursor-pointer" onClick={() => linkPage("/home")} />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'right' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6} style={{ textAlign: 'left', color: 'black' }} onClick={() => linkPage("/search")}>
                                        <i className="ml-5 m-2 fa fa-search search fa-sm fa-fw text-xl" aria-hidden="true"></i>
                                    </Grid>
                                    <Grid item xs={6} sm={6} style={{ textAlign: 'right', color: 'black' }} onClick={() => setShowCart(true)}>
                                        <i className="ml-5 m-2 fa fa-shopping-cart carts fa-sm fa-fw text-xl" aria-hidden="true">{props.cartList?.length > 0 && <img src={IsCart} className="ml-2" />}</i>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </IconButton>
                    {/* medium device */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer1"
                        edge="start"
                        className='navbarsubdiv'>
                    <Grid container spacing={6} className=''>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'left'}} onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'center', height: "60px" }}>
                            <img src={Logo} className="object-cover cursor-pointer h-12" onClick={() => linkPage("/home")} />
                        </Grid>
                        <Grid item className=''  xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'right', marginTop: '12px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Tooltip anchorSelect=".location" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>Location</Tooltip>
                            <Tooltip anchorSelect=".search" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>Search</Tooltip>
                            <Tooltip anchorSelect=".login" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>{auth ? "Profile" : "Login"}</Tooltip>
                            <Tooltip anchorSelect=".carts" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>Go To cart</Tooltip>
                            <Button key={1} sx={{ color: 'black' }} onClick={() => linkPage("/location")}>
                                <i className="fa fa-location-dot location fa-sm fa-fw text-xl" aria-hidden="true"></i>
                            </Button>
                            <Button key={2} sx={{ color: 'black' }} onClick={() => linkPage("/search")}>
                                <i className="fa fa-search search fa-sm fa-fw text-xl" aria-hidden="true"></i>
                            </Button>
                            <Button key={3} sx={{ color: 'black' }} onClick={() => linkPage(auth ? "/profile_account" : "/login")}>
                                <i className="fa-regular fa-user fa-sm fa-fw login text-xl" aria-hidden="true"></i>
                            </Button>
                            <Button key={4} sx={{ color: 'black' }} onClick={() => setShowCart(true)}>
                                <i className="fa fa-shopping-cart carts fa-sm fa-fw text-xl" aria-hidden="true">
                                    {props.cartList?.length > 0 && <img src={IsCart} className="ml-2" />}
                                </i>
                            </Button>
                        </Grid>
                    </Grid>
                    </IconButton>

                    {/* <IconButton
                        color="inherit"
                        aria-label="open drawer1"
                        edge="start"
                        sx={{ mr: 2 }}
                        className='navbarsubdiv'
                    >
                        <Grid container spacing={6}>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'left' }} onClick={handleDrawerToggle}> <MenuIcon /></Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'center', height: "60px" }}><img src={Logo} className="object-cover cursor-pointer" onClick={() => linkPage("/home")} />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'right', marginTop: '12px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className='navbarsubdivicons'>
                                <Button key={1} sx={{ color: 'black' }} onClick={() => linkPage("/location")}><i className="fa fa-location-dot location fa-sm fa-fw text-xl" aria-hidden="true"></i></Button>
                                <Button key={2} sx={{ color: 'black' }} onClick={() => linkPage("/search")}><i className="fa fa-search search fa-sm fa-fw text-xl" aria-hidden="true"></i></Button>
                                <Button key={3} sx={{ color: 'black' }} onClick={() => linkPage(auth ? "/profile_account" : "/login")}><i className="fa-regular fa-user fa-sm fa-fw login text-xl" aria-hidden="true"></i></Button>
                                <Button key={4} sx={{ color: 'black' }} onClick={() => setShowCart(true)}><i className="fa fa-shopping-cart carts fa-sm fa-fw text-xl" aria-hidden="true">{props.cartList.length > 0 && <img src={IsCart} className="ml-2" />}</i></Button>
                                <Tooltip anchorSelect=".location" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>Location</Tooltip>
                                <Tooltip anchorSelect=".search" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>Search</Tooltip>
                                <Tooltip anchorSelect=".login" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>{auth ? "Profile" : "Login"}</Tooltip>
                                <Tooltip anchorSelect=".carts" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>Go To cart</Tooltip>
                            </Grid>
                        </Grid>
                    </IconButton> */}
                    {/* large Device */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, padding: 2, display: { xs: 'none', sm: 'block' } }}
                        className='navbarmainDiv'
                    >
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'left' }}>
                                <img src={Logo} className="object-cover cursor-pointer" onClick={() => linkPage("/home")} />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'center', marginTop: '14px', display: 'flex', gap: '8px' }}>
                                {navItems1.map((item, i) => (
                                    <Button key={item.link} onClick={() => linkPage(item.link)} >
                                       <span className={(current==i ? 'text-[#009898]':'text-[#000]')+' hover:text-[#009898]'}>{item.name}</span>
                                    </Button>
                                ))}
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'right', marginTop: '12px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                                <Tooltip anchorSelect=".location" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>Location</Tooltip>
                                <Tooltip anchorSelect=".search" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>Search</Tooltip>
                                <Tooltip anchorSelect=".login" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>{auth ? "Profile" : "Login"}</Tooltip>
                                <Tooltip anchorSelect=".carts" place="bottom" style={{ backgroundColor: "#D9D9D9", color: "#222" }}>Go To cart</Tooltip>
                                <Button key={1} sx={{ color: 'black' }} onClick={() => linkPage("/location")}><i className="fa fa-location-dot location fa-sm fa-fw text-xl" aria-hidden="true"></i></Button>
                                <Button key={2} sx={{ color: 'black' }} onClick={() => linkPage("/search")}><i className="fa fa-search search fa-sm fa-fw text-xl" aria-hidden="true"></i></Button>
                                <Button key={3} sx={{ color: 'black' }} onClick={() => linkPage(auth ? "/profile_account" : "/login")}><i className="fa-regular fa-user fa-sm fa-fw login text-xl" aria-hidden="true"></i></Button>
                                <Button key={4} sx={{ color: 'black' }} onClick={() => setShowCart(true)}><i className="fa fa-shopping-cart carts fa-sm fa-fw text-xl" aria-hidden="true">{props.cartList?.length > 0 && <img src={IsCart} className="ml-2" />}</i></Button>
                            </Grid>
                        </Grid>

                    </Typography>
                </Toolbar>
            </AppBar>
            {
                showCart &&
                <CartList cartList={props.cartList} setShowModal={(v) => setShowCart(v)} />
            }
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Box>
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {drawer}
                </Drawer>
            </nav>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Box>
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {drawer1}
                </Drawer>
            </nav>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        cartList: state?.cart?.cartList,
    }
}

export default connect(mapStateToProps)((DrawerAppBar));
