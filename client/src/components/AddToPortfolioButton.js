import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function AddToPortfolioButton() {
    const classes = useStyles();

    return (
        <div>

            <Button
                variant="contained"
                color="default" // can put primary here
                className={classes.button}
                startIcon={<AddIcon />}
            >
                Add to Portfolio
            </Button>

        </div>
    );
}