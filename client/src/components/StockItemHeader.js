import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const StockItemHeader = (props) => {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper} xs={12}>
                <Grid container spacing={3} justify="space-between" wrap="nowrap">
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            Ticker Symbol
                        </Typography>

                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1">
                            Name
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            Price Now
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            Currency
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            Current Held Units
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            Current Value
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            Current %
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            Target %
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            Target Value
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            Value Difference
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            Units to Buy
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            Increment Units
                        </Typography>
                    </Grid>

                </Grid>

            </Paper>
        </Grid>
    )
}


export default StockItemHeader;
