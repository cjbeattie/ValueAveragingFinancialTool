import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink, Route, Switch } from "react-router-dom";
import Portfolio from './Portfolio';
import ValuePath from './ValuePath';
import { useParams } from 'react-router-dom'
import axios from "axios";
import About from "./About";



const drawerWidth = 240;

function ListItemLink(props) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <NavLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        // [theme.breakpoints.up('sm')]: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        //     marginLeft: drawerWidth,
        // },
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setUser] = React.useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const updateUserState = (user) => {
        setUser(user);
    }

    const checkForUserInURL = (windowUserID) => {
        console.log("in checkForUserInURL. windowUserID and user is ", windowUserID, user);
        // console.log("window.location.hostname is ", location.hostname)

        if (windowUserID && !user) {
            // const tempURL = `http://localhost:4000/api/user/${windowUserID}`;
            const tempURL = `/api/user/${windowUserID}`;

            axios.get(tempURL)
                .then((res) => {
                    console.log("Response", res);
                    setUser(res.data)
                })
                .catch((error) => {
                    console.log("Error", error);
                });
        }

    }

    const handleIncrementStockUnits = (incrementStockInfo) => {
        console.log("clicked! you want to add ", incrementStockInfo.numToAdd)
        let tempPortfolios = user.portfolios;
        // let tempPortfolio = user.portfolios[0];
        let tempHeldStocks = user.portfolios[0].heldStocks;
        let stockToUpdate = tempHeldStocks.find((itmInner) => itmInner.symbol === incrementStockInfo.stockSymbol)
        let stockToUpdateIndex = tempHeldStocks.findIndex((itmInner) => itmInner.symbol === incrementStockInfo.stockSymbol)
        console.log("zebra typeof stockToUpdate.numHeldUnits", typeof stockToUpdate.numHeldUnits)
        console.log("zebra typeof incrementStockInfo.numToAdd", typeof incrementStockInfo.numToAdd)
        stockToUpdate.numHeldUnits += incrementStockInfo.numToAdd;
        tempPortfolios[0].heldStocks[stockToUpdateIndex] = stockToUpdate;



        setUser({
            ...user,
            portfolios: tempPortfolios,
        })
    }

    // let { windowUserID } = useParams();

    // React.useEffect(() => {
    //     console.log("in useEffect. windowUserID and user is ", windowUserID, user);
    //     if (windowUserID && !user) {
    //         axios.get(`api/user/${windowUserID}`)
    //             .then((res) => {
    //                 console.log("Response", res);
    //                 setUser(res.data)
    //             })
    //             .catch((error) => {
    //                 console.log("Error", error);
    //             });
    //     }
    // }, []);

    let myListItems;
    if (user) {
        const portfolioLink = `/${user._id}/portfolio`;
        const valuepathLink = `/${user._id}/valuepath`;

        myListItems =
            <>
                <ListItemLink to={valuepathLink} primary="Value Path" icon={<ShowChartIcon />} />
                <ListItemLink to={portfolioLink} primary="Portfolio" icon={<AttachMoneyIcon />} />

            </>;
    } else {
        myListItems =
            <>
                <ListItemLink to="/valuepath" primary="Value Path" icon={<ShowChartIcon />} />
                <ListItemLink to="/portfolio" primary="Portfolio" icon={<AttachMoneyIcon />} />

            </>;
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {myListItems}
            </List>
            <Divider />
            <List>
                <ListItemLink to="/about" primary="About" icon={<AccountBalanceIcon />} />
            </List>
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Value Averaging Management Tool
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    {/* <Route exact path="/"><Portfolio user={user} updateUserState={updateUserState} checkForUserInURL={checkForUserInURL} /></Route> */}
                    <Route exact path="/"><ValuePath updateUserState={updateUserState} checkForUserInURL={checkForUserInURL} /></Route>
                    <Route path="/valuepath"><ValuePath updateUserState={updateUserState} checkForUserInURL={checkForUserInURL} /></Route>
                    <Route path="/portfolio"><Portfolio updateUserState={updateUserState} checkForUserInURL={checkForUserInURL} handleIncrementStockUnits={handleIncrementStockUnits} /></Route>
                    <Route path="/about"><About /></Route>
                    {/* <Route path="/valuepath/:windowUserID"><ValuePath /></Route>
                    <Route path="/portfolio/:windowUserID"><Portfolio /></Route> */}
                    <Route path="/:windowUserID/valuepath"><ValuePath user={user} checkForUserInURL={checkForUserInURL} /></Route>
                    <Route path="/:windowUserID/portfolio"><Portfolio user={user} updateUserState={updateUserState} checkForUserInURL={checkForUserInURL} handleIncrementStockUnits={handleIncrementStockUnits} /></Route>
                    <Route path="/:windowUserID/about"><About /></Route>
                </Switch>
            </main>
        </div>
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