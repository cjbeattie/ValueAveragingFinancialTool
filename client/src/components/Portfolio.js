import React from 'react';
import EnhancedTable from './EnhancedTable'
import AddToPortfolioButton from './AddToPortfolioButton'
import axios from "axios";


const Portfolio = () => {
    const [portfolio, setPortfolio] = React.useState(
        {
            heldStocks: []
        }
    );

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
            <AddToPortfolioButton handleAddNew={handleAddNew} />
            <EnhancedTable />
        </>
    )
}

export default Portfolio;