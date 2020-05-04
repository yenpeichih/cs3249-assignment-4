Project folders


client/----------------------> contains client side code
    -floor_plan.jpg----------> the floor plan of rooms
    -main.css----------------> css file for the main page of the app
    -main.html---------------> html file for the main page of the app
    -main.js-----------------> client side js code to run on startup
imports/---------------------> contains code for the main app
    -api/
        -data.js-------------> js file starting a new mongo collection for the temperature data
    -App.css-----------------> css file for the app components
    -App.js------------------> main file containing the code for the components
    -canvasjs.min.js---------> canvasjs file
    -canvasjs.react.js-------> code for canvasjs
    -react-datetime.css------> css file for the date and time input selectors
node_modules/----------------> contains all the nodes for the project
server/----------------------> contains server side code
    -Info.js-----------------> js code to reformat the data sent to client
    -main.js-----------------> server side code to receive requests from client and send send to client
tests/-----------------------> contains default test code
    -main.js-----------------> default test code testing the client and server
roomtemperature.json---------> json file containing all the temperature data in documents
xstate.js--------------------> statechart indicated in xstate form