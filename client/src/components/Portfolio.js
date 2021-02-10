import React from 'react';
import EnhancedTable from './EnhancedTable'
import AddToPortfolioButton from './AddToPortfolioButton'
import axios from "axios";
import { useParams } from 'react-router-dom'
import { useImmer } from "use-immer";
import StockItemDisplay from './StockItemDisplay'
import StockItemHeader from './StockItemHeader'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import format from 'date-fns/format'
import isFuture from 'date-fns/isFuture'
import parseISO from 'date-fns/parseISO';


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



const Portfolio = (props) => {
    const [portfolioLiveDetails, setPortfolioLiveDetails] = React.useState([]);
    const [tableData, setTableData] = React.useState([]);
    const [highLevelData, setHighLevelData] = React.useState({
        calcCurrentPortfolioValue: 0,
        targetPortfolioValue: 0,
        calcNextInvestment: 0,
        nextInvestmentDate: undefined,
    })


    let { windowUserID } = useParams();

    console.log("props.user from portfolio ", props.user)





    React.useEffect(() => {
        // console.log("in useEffect. windowUserID and user is ", windowUserID, user);
        props.checkForUserInURL(windowUserID);

        if (props.user) {

            let tempTargetPortfolioValue = 0;

            let nextInvestmentDate;

            // Update the next value path value and date
            for (const valueItem of props.user.valuePaths[0].valuePath) {
                console.log("In the date checking loop **************************************")
                console.log("Date is ", valueItem.cycleDate)
                console.log("parseISO date is ", parseISO(valueItem.cycleDate))
                // This isFuture is temperamental, sometimes it wants you to parseISO(valueItem.cycleDate) and sometimes not....
                // if (isFuture(parseISO(valueItem.cycleDate))) {
                if (isFuture(valueItem.cycleDate)) {
                    // if (valueItem.cycleDate === props.user.valuePaths[0].startDate) {
                    //     continue;
                    // }
                    console.log("Date is in future **************************************")
                    console.log("valueItem.cycleDate is ", valueItem.cycleDate)
                    tempTargetPortfolioValue = valueItem.cycleValue;
                    nextInvestmentDate = new Date(valueItem.cycleDate);
                    // setHighLevelData({
                    //     ...highLevelData,
                    //     ,
                    // })
                    console.log('highLevelData first pass');
                    console.log(highLevelData);
                    break;
                }
            }

            // Update live data from API and make calculations
            axios
                // Get live data for each stock in the portfolio
                .get(`/api/portfolio/${props.user.portfolios[0]._id}`)
                .then((res) => {

                    console.log("Response for getting live data", res);
                    // const tempLiveDetails = portfolioLiveDetails;
                    // tempLiveDetails.push(res.data)
                    setPortfolioLiveDetails(res.data);

                    console.log('highLevelData');
                    console.log(highLevelData);

                    console.log("#######################")
                    console.log("Response for getting live data", res);
                    console.log("The current user is: ", props.user)
                    console.log("#######################")

                    // for (const heldStock of props.user.portfolios[0].heldStocks) {
                    //     heldStock.symbol
                    // }
                    // for (const stock of res.data) {
                    //     stock.symbol
                    // }

                    let tempTableData = [];
                    const heldStocks = props.user.portfolios[0].heldStocks
                    const arr2 = res.data

                    let portfolioValue = 0;

                    for (let i = 0; i < heldStocks.length; i++) {

                        // Combine static and live price data in a single object for this stock
                        const calcStock = {
                            ...heldStocks[i],
                            ...(arr2.find((itmInner) => itmInner.symbol === heldStocks[i].symbol))
                        };

                        //Add calculated values
                        calcStock.calcCurrentValue = Math.round(((calcStock.numHeldUnits * calcStock.price) + Number.EPSILON) * 100) / 100
                        // calcStock.calcCurrentPercent = Math.round(((calcStock.calcCurrentValue / tempTargetPortfolioValue * 100) + Number.EPSILON) * 100) / 100;
                        calcStock.calcTargetValue = tempTargetPortfolioValue * heldStocks[i].targetPercent / 100;
                        calcStock.calcValueDifference = Math.round(((calcStock.calcTargetValue - calcStock.calcCurrentValue) + Number.EPSILON) * 100) / 100;
                        calcStock.calcUnitsToBuy = Math.round(calcStock.calcValueDifference / calcStock.price)

                        tempTableData.push(calcStock);

                        portfolioValue += calcStock.calcCurrentValue;

                    }
                    // Calculating currentPercent for each stock, which depends on the previous iteration to be complete!
                    for (let i = 0; i < heldStocks.length; i++) {
                        tempTableData[i].calcCurrentPercent = Math.round(((tempTableData[i].calcCurrentValue / portfolioValue * 100) + Number.EPSILON) * 100) / 100;
                    }
                    // Update the data that gets sent to the table
                    setTableData(tempTableData);

                    // console.log('highLevelData');
                    // console.log(highLevelData)
                    // // Update the total current portfolio value
                    // setHighLevelData({
                    //     ...highLevelData,
                    //     calcCurrentPortfolioValue: portfolioValue,
                    // })

                    // Calculate the next investment
                    const tempNextInvestment = tempTargetPortfolioValue - portfolioValue;

                    setHighLevelData({
                        ...highLevelData,
                        calcNextInvestment: tempNextInvestment,
                        calcCurrentPortfolioValue: portfolioValue,
                        nextInvestmentDate: nextInvestmentDate,
                        targetPortfolioValue: tempTargetPortfolioValue
                    })

                    console.log("table data: ", tempTableData);

                })
                .catch((error) => {
                    console.log("Error", error);
                });
        }
    }, [props.user]);


    const handleAddNew = (dialogText) => {
        // console.log("this is the dialog text", dialogText);
        if (!props.user) {
            console.log("Cannot add new. User state is ", props.user)
            return;
        }
        // console.log("Adding new. props.user._id is ", props.user._id)
        // console.log("Adding new. props.user is ", props.user)
        // console.log("Adding new. props.user.portfolios[0]._id is ", props.user.portfolios[0]._id)

        // const data = {
        //     currentPortfolio: props.user.portfolios[0],
        //     dialogText: dialogText,
        // }

        // const tempHeldStocks = props.user.portfolios[0].heldStocks

        // tempHeldStocks.push({
        //     symbol: dialogText,
        //     targetPercent: 0,
        //     numHeldUnits: 0,
        //     currencyCode: "",
        // })

        // const tempPortfolio = {
        //     heldStocks: tempHeldStocks
        // }

        axios
            .put(`/api/portfolio/${props.user.portfolios[0]._id}`, dialogText)
            .then((res) => {
                console.log("Response from axios call to server when adding new: ", res);
                // const tempPortfoliosList = [
                //     ...props.user.portfolios
                // ]
                // tempPortfoliosList.push(res.data)
                // const tempUser = {
                //     ...props.user,
                //     portfolios: tempPortfoliosList
                // }
                const tempPortfolios = props.user.portfolios;
                tempPortfolios[0] = res.data;

                const tempUser = {
                    ...props.user,
                    portfolios: tempPortfolios
                }
                props.updateUserState(tempUser)
                // setCreated(true);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };



    const classes = useStyles();


    return (
        <>
            <h1>Portfolio</h1>
            {/* { windowUserID ? <h2>User ID: {windowUserID}</h2> : <h2>No user</h2>} */}
            <p>Current Portfolio Value: ${highLevelData.calcCurrentPortfolioValue.toFixed(2)}</p>
            <p>Target Portfolio Value: ${highLevelData.targetPortfolioValue}</p>
            <p>Next Investment: ${highLevelData.calcNextInvestment.toFixed(2)}</p>
            {/* <p>Next Investment Date: {format(highLevelData.nextInvestmentDate, 'dd/MM/yyyy')}</p> */}
            {/* <p>Next Investment Date: {highLevelData.nextInvestmentDate}</p> */}
            { highLevelData.nextInvestmentDate &&
                <p>Next Investment Date: {highLevelData.nextInvestmentDate.getUTCDate()}/{highLevelData.nextInvestmentDate.getUTCMonth() + 1}/{highLevelData.nextInvestmentDate.getUTCFullYear()}</p>
            }


            <AddToPortfolioButton handleAddNew={handleAddNew} />
            {/* <EnhancedTable portfolioLiveDetails={portfolioLiveDetails} /> */}
            <Grid container alignItems="center" className={classes.root} spacing={2}>
                <StockItemHeader />
                {tableData.map((stock) => (
                    <StockItemDisplay
                        key={stock._id}
                        stock={stock}
                        handleIncrementStockUnits={props.handleIncrementStockUnits}
                    />
                ))}
            </Grid>
        </>
    )
}

export default Portfolio;