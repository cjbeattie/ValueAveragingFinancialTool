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

export default function ValuePath() {
    const classes = useStyles();

    const [formData, setFormData] = React.useState({
        investmentGoal: "",
        endDate: new Date(),
        startDate: new Date(),
        cycle: "",
        r: "",
        g: "",
        currency: "",
    });


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
                                autoFocus
                                value={formData.investmentGoal}
                                onChange={(e) =>
                                    setFormData((state) => ({
                                        ...state,
                                        investmentGoal: e.target.value,
                                    }))
                                }
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
                                autoFocus
                                value={formData.rl}
                                onChange={(e) =>
                                    setFormData((state) => ({
                                        ...state,
                                        r: e.target.value,
                                    }))
                                }
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
                                autoFocus
                                value={formData.g}
                                onChange={(e) =>
                                    setFormData((state) => ({
                                        ...state,
                                        g: e.target.value,
                                    }))
                                }
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
                                autoFocus
                                value={formData.currentValue}
                                onChange={(e) =>
                                    setFormData((state) => ({
                                        ...state,
                                        currentValue: e.target.value,
                                    }))
                                }
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
                                    <MenuItem value="Yearly" selected="selected" label="Yearly">Yearly</MenuItem>
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
                    >
                        Save
                    </Button>
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