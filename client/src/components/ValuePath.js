// const ValuePath = () => {
//     return <h1>Value Path</h1>
// }

// export default ValuePath;

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import DatePicker from './DatePicker';
// import CurrencySelect from './CurrencySelect';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
// import CurrencyItems from './CurrencyItems'
import MenuItem from '@material-ui/core/MenuItem';
// import CycleSelect from './CycleSelect';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    // KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function ValuePath(props) {
    const classes = useStyles();

    const [created, setCreated] = React.useState(false);
    const [formData, setFormData] = React.useState({
        investmentGoal: 10000000,
        endDate: new Date('January 1, 2041 00:00:00'),
        startDate: new Date(),
        cycle: "Annually",
        r: 0.5,
        g: 1,
        currency: "AUD",
        currentValue: 3000
    });
    // const [currentUser, setCurrentUser] = React.useState(null);

    let { windowUserID } = useParams();
    console.log("windowUserID: ", windowUserID);

    let history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();

        const blankUser = {
            portfolios: [],
            valuePaths: [],
        }

        // Check if no user  // OLD: window.location.pathname === "/valuepath"
        if (!windowUserID) {
            // Create the user
            axios
                .post("/api/user", blankUser)
                .then((userRes) => {
                    console.log("Response to user creation", userRes);
                    // setCurrentUser({
                    //     ...currentUser,
                    //     _id: userRes.data._id,
                    // })

                    // window.location.pathname = `valuepath/${userRes.data._id}`
                    // window.location.href = `${window.location.hostname}/${userRes.data._id}` // Production?
                    // history.push(`/${userRes.data._id}/valuepath`);
                    // history.push(`/valuepath/${userRes.data._id}`);


                    // Create the value path
                    axios
                        .post("/api/valuePath", formData)
                        .then((valuePathRes) => {
                            console.log("Response to value path creation", valuePathRes);

                            // let newListID = res.data._id;
                            // let tempLists = user.lists;
                            // let updatedUser = {
                            //     ...user,
                            //     lists: [...tempLists, newListID],
                            // };
                            const tempValuePaths = [];
                            tempValuePaths.push(valuePathRes.data._id);

                            const tempUser = {
                                ...blankUser,
                                _id: userRes.data._id,
                                valuePaths: tempValuePaths,
                            }

                            // Add value path ID to the user
                            axios
                                .put(`/api/user/${userRes.data._id}`, tempUser)
                                .then((res) => {
                                    console.log("Response to adding value path to user", res);
                                    setCreated(true);
                                    history.push(`/${userRes.data._id}/valuepath`);
                                    props.updateUserState(tempUser);
                                })
                                .catch((error) => {
                                    console.log("Error to adding value path to user", error);
                                });
                        })
                        .catch((error) => {
                            console.log("Error to value path creation", error);
                        });
                })
                .catch((error) => {
                    console.log("Error to user creation", error);
                });
        } else {
            console.log("yay it detected that a user already exists! The windowUserID is ", windowUserID)
        }

        // // Old - add value path directly without user
        // axios
        //     .post("/api/valuePath", formData)
        //     .then((res) => {
        //         console.log("Response", res);
        //         setCreated(true);
        //     })
        //     .catch((error) => {
        //         console.log("Error", error);
        //     });
    };



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar> */}
                <Typography component="h1" variant="h5">
                    Value Path Settings
                </Typography>
                {windowUserID ? <h2>User ID: {windowUserID}</h2> : <h2>No user</h2>}
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                // autoComplete="fname"
                                name="investmentGoal"
                                variant="outlined"
                                required
                                fullWidth
                                id="investmentGoal"
                                label="Investment Goal"
                                // autoFocus
                                value={formData.investmentGoal}
                                onChange={(e) =>
                                    setFormData((state) => ({
                                        ...state,
                                        investmentGoal: e.target.value,
                                    }))
                                }
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* <DatePicker name="endDate" label="Goal End Date" /> */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    // margin="normal"
                                    name="endDate"
                                    id="date-picker-dialog"
                                    inputVariant="outlined"
                                    label="Goal End Date"
                                    format="dd/MM/yyyy"
                                    value={formData.endDate}
                                    onChange={(date) =>
                                        setFormData((state) => ({
                                            ...state,
                                            endDate: date,
                                        }))
                                    }
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                // openTo="month"
                                // views={["year", "month"]}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                // autoComplete="fname"
                                name="r"
                                variant="outlined"
                                required
                                fullWidth
                                id="r"
                                label="r"
                                // autoFocus
                                value={formData.r}
                                onChange={(e) =>
                                    setFormData((state) => ({
                                        ...state,
                                        r: e.target.value,
                                    }))
                                }
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                // autoComplete="fname"
                                name="g"
                                variant="outlined"
                                required
                                fullWidth
                                id="g"
                                label="g"
                                // autoFocus
                                value={formData.g}
                                onChange={(e) =>
                                    setFormData((state) => ({
                                        ...state,
                                        g: e.target.value,
                                    }))
                                }
                                type="number"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            {/* <CurrencySelect /> */}
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Currency</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={formData.currency}
                                    onChange={(e) =>
                                        setFormData((state) => ({
                                            ...state,
                                            currency: e.target.value,
                                        }))
                                    }
                                    label="Currency"
                                >
                                    {/* <CurrencyItems /> */}
                                    <MenuItem value="USD" label="US dollar">USD</MenuItem>
                                    <MenuItem value="SGD" label="Singapore dollar">SGD</MenuItem>
                                    <MenuItem value="AUD" label="Australian dollar">AUD</MenuItem>
                                    <MenuItem value="NZD" label="New Zealand dollar">NZD</MenuItem>
                                    <MenuItem value="EUR" label="Euro">EUR</MenuItem>
                                    <MenuItem value="GBP" label="Pound sterling">GBP</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                // autoComplete="fname"
                                name="currentValue"
                                variant="outlined"
                                required
                                fullWidth
                                id="currentValue"
                                label="Current Value"
                                // autoFocus
                                value={formData.currentValue}
                                onChange={(e) =>
                                    setFormData((state) => ({
                                        ...state,
                                        currentValue: e.target.value,
                                    }))
                                }
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* <CycleSelect /> */}
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Cycle</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={formData.cycle}
                                    onChange={(e) =>
                                        setFormData((state) => ({
                                            ...state,
                                            cycle: e.target.value,
                                        }))
                                    }
                                    label="Cycle"
                                >
                                    <MenuItem value="Monthly" selected="selected" label="Monthly">Monthly</MenuItem>
                                    <MenuItem value="Quarterly" selected="selected" label="Quarterly">Quarterly</MenuItem>
                                    <MenuItem value="Annually" selected="selected" label="Annually">Annually</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* <DatePicker name="startDate" label="Start Date" /> */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    // margin="normal"
                                    name="startDate"
                                    id="date-picker-dialog"
                                    inputVariant="outlined"
                                    label="Start Date"
                                    format="dd/MM/yyyy"
                                    value={formData.startDate}
                                    onChange={(date) =>
                                        setFormData((state) => ({
                                            ...state,
                                            startDate: date,
                                        }))
                                    }
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                    {created ? <Typography component="h3" variant="h5">Added!</Typography> : <></>}

                    {/* <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </div>
            {/* <Box mt={5}>
                <Copyright />
            </Box> */}
        </Container>
    );
}