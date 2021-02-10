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


const StockItemDisplay = (props) => {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper} xs={12}>
                <Grid container spacing={3} justify="space-between" wrap="nowrap">
                    <Grid item xs={1}>
                        <Typography variant="h5">
                            {props.stock.symbol}
                        </Typography>

                    </Grid>
                    <Grid item xs={2}>
                        {props.stock.name}
                    </Grid>
                    <Grid item xs={1}>
                        {props.stock.price}
                    </Grid>
                    <Grid item xs={1}>
                        {props.stock.currencyCode}
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={1}>
                        {props.stock.numHeldUnits}
                    </Grid>
                    <Grid item xs={1}>
                        {props.stock.calcCurrentValue}
                    </Grid>
                    <Grid item xs={1}>
                        {props.stock.calcCurrentPercent}%
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={1}>
                        {props.stock.targetPercent}%
                    </Grid>
                    <Grid item xs={1}>
                        {props.stock.calcTargetValue}
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={1}>
                        {props.stock.calcValueDifference}
                    </Grid>
                    <Grid item xs={1}>
                        {props.stock.calcUnitsToBuy}
                    </Grid>


                </Grid>

            </Paper>
        </Grid>
    )
}


export default StockItemDisplay;
