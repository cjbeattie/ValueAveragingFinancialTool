import React from 'react';
import EnhancedTable from './EnhancedTable'
import AddToPortfolioButton from './AddToPortfolioButton'
import axios from "axios";
import { useParams } from 'react-router-dom'



const Portfolio = () => {
    const [portfolio, setPortfolio] = React.useState(
        {
            heldStocks: []
        }
    );

    let { windowUserID } = useParams();


    const handleAddNew = (dialogText) => {
        console.log(dialogText);
        // axios
        //     .put("/api/portfolio", dialogText)
        //     .then((res) => {
        //         console.log("Response", res);
        //         // setCreated(true);
        //     })
        //     .catch((error) => {
        //         console.log("Error", error);
        //     });
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