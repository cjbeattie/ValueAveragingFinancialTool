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
    const [dialogText, setDialogText] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDialogTextChange = (e) => {
        setDialogText(e.target.value);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setOpen(false);
        props.handleAddNew(dialogText);
        setDialogText("");
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
                        Enter the name of the stock ticker symbol below to add this stock to your portfolio.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="symbol"
                        label="Stock Symbol"
                        type="text"
                        fullWidth
                        value={dialogText}
                        onChange={handleDialogTextChange}
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