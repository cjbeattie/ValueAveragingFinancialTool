import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function AddToPortfolioButton(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [dialogText, setDialogText] = React.useState({
        exchange: "",
        tickerSymbol: "",
        numHeldUnits: 0,
        targetPercent: 0,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    // const handleDialogTextChange = (e) => {
    //     setDialogText(e.target.value);
    // };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setOpen(false);
        props.handleAddNew(dialogText);
        setDialogText({
            exchange: "",
            tickerSymbol: "",
            numHeldUnits: 0,
            targetPercent: 0,
        });
    };

    return (
        <div>

            <Button
                variant="contained"
                color="default" // can put primary here
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
            >
                Add to Portfolio
            </Button>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add To Portfolio</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the exchange code and ticker symbol to add to your portfolio.
                    </DialogContentText>
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="exchange"
                        label="Exchange Code"
                        type="text"
                        fullWidth
                        value={dialogText.exchange}
                        onChange={(e) =>
                            setDialogText((state) => ({
                                ...state,
                                exchange: e.target.value,
                            }))}
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="symbol"
                        label="Ticker Symbol"
                        type="text"
                        fullWidth
                        value={dialogText.tickerSymbol}
                        onChange={(e) =>
                            setDialogText((state) => ({
                                ...state,
                                tickerSymbol: e.target.value,
                            }))}
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="numHeldUnits"
                        label="Number of held units"
                        type="number"
                        fullWidth
                        value={dialogText.numHeldUnits}
                        onChange={(e) =>
                            setDialogText((state) => ({
                                ...state,
                                numHeldUnits: e.target.value,
                            }))}
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="TargetPercent"
                        label="Target %"
                        type="number"
                        fullWidth
                        value={dialogText.targetPercent}
                        onChange={(e) =>
                            setDialogText((state) => ({
                                ...state,
                                targetPercent: e.target.value,
                            }))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}