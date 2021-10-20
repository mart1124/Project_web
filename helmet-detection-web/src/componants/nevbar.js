import React, { useState ,useEffect} from 'react';
import { useScrollTrigger ,AppBar, Toolbar, Typography, Button, IconButton, 
  Tabs, Tab, Link, useMediaQuery, Slide, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { makeStyles, useTheme } from '@material-ui/core/styles'


import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { useHistory } from 'react-router-dom';

{/* Style */}
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      width: "100%",
      justifyContent: 'center',
      background:'#90a4ae'
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    login: {
        position: 'absolute',
    },
    logo: {
        margin: theme.spacing(2),
        width: 65,
        height: 100
    },
    image: {
      width: 460,
      height: 120
    }

}));


function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
}

function Nevbar(props) {
    const { havetoken } = props
    const classes = useStyles();
    const history = useHistory()
    const [anchor, setAnchor] = useState(null);
    const [value, setValue] = useState(null);
    const open = Boolean(anchor);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    const handleMenu = (event) => {
      setAnchor(event.currentTarget);
    };

    const handleChange = (e, newValue) => {
      setValue(newValue)
    }


    const onLogout = () => {
      if (anchor) {
        setAnchor(null)
      }
      sessionStorage.clear();
    }

    useEffect(() => {
      if (havetoken) {
        if (value === 0) history.push("/")
        if (value === 1) history.push("/admin/usermanage")
        if (value === 2) history.push("/admin/recoverdata")
      }
      
     
    }, [value])

    if (havetoken) {
      return (
          <div className={classes.root}>
          <HideOnScroll {...props}>
            <AppBar position="static"  style={{ background: '#2E3B55' }} >
              <Toolbar >
                <img src="/Rmutt-logo.png" alt="rmuttlogo" className={classes.logo} />
                
                {isMobile ? (
                  <>
                    <Typography sx={{ flexGrow: 1 }}></Typography>
                    <IconButton
                      className={classes.menuButton}
                      edge="start"
                      aria-label="menu"
                      onClick={handleMenu}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchor}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={open}
                    >
                      <MenuItem
                        onClick={() => setAnchor(null)}
                        component={Link}
                        href='/'
                      >
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        <Typography variant="h6">Home</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => setAnchor(null)}
                        component={Link}
                        href="/admin/usermanage"
                      >
                        <ListItemIcon>
                          <ManageAccountsIcon />
                        </ListItemIcon>
                        <Typography variant="h6">UserMagnage</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => setAnchor(null)}
                        component={Link}
                        href="/admin/recoverdata"
                      >
                        <ListItemIcon>
                          <RestoreFromTrashIcon />
                        </ListItemIcon>
                        <Typography variant="h6">RecoverData</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => onLogout()}
                        component={Link}
                        href="/"
                      >
                        <Typography variant="h6" >Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                  <Tabs  
                      aria-label="Nav tabs HelmetDetection Webapp" 
                      textColor="inherit"
                      variant="fullWidth" 
                      value={value}
                      onChange={handleChange}
                    
                      >
                      <Tab icon={<HomeIcon />} label="HOME" />
                      <Tab icon={<ManageAccountsIcon />} label="UserManage" />
                      <Tab icon={<RestoreFromTrashIcon />} label="RecoverData" />
                    </Tabs>
                    <div style={{flexGrow: 1}}></div>
                    <div style={{ marginRight: "2rem" }}>
                      <Button className={classes.login} color="inherit" component='a' href='/' onClick={() => onLogout()} >Logout</Button>
                    </div>
                  </>
                )}
              </Toolbar>
            </AppBar>
          </HideOnScroll>
        </div>
      )
    }
    return (
        <div>
          <AppBar position="static"  style={{ background: '#2E3B55' }} >
            <Toolbar style={{display:"flex", justifyContent:"space-between"}} >
              <Typography component="a" href="/" >
                <img src="/Rmutt-logo.png" alt="rmuttlogo" className={classes.logo} />
              </Typography>
              <div style={{ marginRight: "2rem" }}>
                <Button className={classes.login} color="inherit" component="a" href="/admin/login">Login</Button>
              </div>
            </Toolbar>
          </AppBar>
        </div>
    )
}

export default Nevbar
