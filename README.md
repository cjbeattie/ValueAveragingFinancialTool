*A note on all projects: I merged a few Github old accounts into this new "clean" one since the GA course required an annoying mix of Github Enterprise and personal Github accounts. It was confusing and full of other in-class exercise mess. It's why you won't see commits from this account dating prior to February, but if you dig into the projects you can see the work I committed using my other GitHub accounts (cbeattie and cbeattie2).
All projects here were done in about 5 days so are very much MVPs at this stage, but I will continue to work on them when I get the time.*

# Value Averaging Financial Tool

## Project Link
https://valueaveragingfinancialtool.herokuapp.com/

## Technologies used
MERN (MongoDB, Express, React, Node)
Material-UI

## How to use it
Start by editing the values you would like for your value path and hit "save". There is no need to create an account! Once you save, you now have a unique URL which you can bookmark to come back to (this was something I saw [wireframe.cc](http://wireframe.cc/) do and really wanted to try to implement it myself).

Once your value path is created, head to your portfolio and add the stocks you would like to monitor. For now you will need to know the exact country code and ticker symbol, but down the track I plan to implement a search bar.

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
