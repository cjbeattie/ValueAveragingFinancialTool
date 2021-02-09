import React from 'react';
import EnhancedTable from './EnhancedTable'
import AddToPortfolioButton from './AddToPortfolioButton'
import axios from "axios";
import { useParams } from 'react-router-dom'



const Portfolio = (props) => {
    const [portfolio, setPortfolio] = React.useState(
        {
            heldStocks: []
        }
    );

    let { windowUserID } = useParams();

    console.log("props.user from portfolio ", props.user)

    React.useEffect(() => {
        // console.log("in useEffect. windowUserID and user is ", windowUserID, user);
        props.checkForUserInURL(windowUserID);
    }, []);


    const handleAddNew = (dialogText) => {
        console.log("this is the dialog text", dialogText);
        if (props.user === null) {
            console.log("user state is null")
            return;
        }
        console.log("Adding new. props.user._id is ", props.user._id)
        console.log("Adding new. props.user is ", props.user)
        console.log("Adding new. props.user.portfolios[0]._id is ", props.user.portfolios[0]._id)

        // const data = {
        //     currentPortfolio: props.user.portfolios[0],
        //     dialogText: dialogText,
        // }

        const tempHeldStocks = props.user.portfolios[0].heldStocks

        tempHeldStocks.push({
            symbol: dialogText,
            targetPercent: 0,
            numHeldUnits: 0,
            currencyCode: "",
        })

        const tempPortfolio = {
            heldStocks: tempHeldStocks
        }

        axios
            .put(`/api/portfolio/${props.user.portfolios[0]._id}`, tempPortfolio)
            .then((res) => {
                console.log("Response", res);
                // const tempPortfoliosList = [
                //     ...props.user.portfolios
                // ]
                // tempPortfoliosList.push(res.data)
                // const tempUser = {
                //     ...props.user,
                //     portfolios: tempPortfoliosList
                // }
                const tempUser = {
                    ...props.user,
                    portfolios: res.data
                }
                props.updateUserState(tempUser)
                // setCreated(true);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };


    return (
        <>
            <h1>Portfolio</h1>
            { windowUserID ? <h2>User ID: {windowUserID}</h2> : <h2>No user</h2>}
            <AddToPortfolioButton handleAddNew={handleAddNew} />
            <EnhancedTable />

        </>
    )
}

export default Portfolio;