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
        console.log(props.user._id)
        axios
            .put(`/api/portfolio/${props.user._id}`, dialogText)
            .then((res) => {
                console.log("Response", res);
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