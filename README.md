# Value Averaging Financial Tool

## Project Link
https://valueaveragingfinancialtool.herokuapp.com/

## Technologies used
MERN (MongoDB, Express, React, Node)
Material-UI

## Approach
Value Averaging is an investment technique which guides how to invest over the course of a predefined time frame. A value "path" is calculated based on input the user provides, which determines the target value the user should invest into their portfolio for each time period.  Each period the investor simply makes the proper investment at each time period according to the target value.

The problem, however, is that there is no user-friendly value path calculator available apart from a spreadsheet. 

If the user invests in more than one stock, the further calculation of how much should be invested into each stock based on a target weighting is only possible in a separate spreadsheet that the user must set up themselves.

Also, the calculation must be cross-referenced with real-time stock prices which further adds to the complexity.

In short, there is no easy way to follow this method without complex spreadsheets and time-consuming searches for the latest stock price.

The aim of this app is to create a Value Averaging investment path management tool with simple and aesthetic UI and easy visibility on what stocks need to be bought according to realtime stock price data.

## Screenshots
![ValuePathScreenshot](/documentation/ValuePathScreenshot.png)
![PortfolioScreenshot](/documentation/PortfolioScreenshot.png)

## Installation instructions
`npm i` in root folder and in client folder.

## User stories
As a user:
- I want to be able to input my value path settings and have a value path calculated for me
- I want the value path to be displayed as a table
- I want to see how many units I should buy of a particular stock

## Wireframes
![ValuePathWireframe](/documentation/ValuePathWireframe.png)
![PortfolioWireframe](/documentation/PortfolioWireframe.png)

## To Do List
- Allow editing of value path
- Add search bar for stocks
- Add graph showing value path
