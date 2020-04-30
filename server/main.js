import { Meteor } from 'meteor/meteor';
import {Data} from '../imports/api/data.js'
import Info from './Info.js'
import SimpleSchema, { MongoObject } from 'simpl-schema'; // Haven't implemented this!
Meteor.startup(() => {
  // code to run on server at startup
});

// convert the data to supported format
const parseData =(dataArray = []) =>  dataArray.map( (dataItem) =>
    // sent to a new object in another folder 
    new Info(
        dataItem.id,
        dataItem.RoomId,
        dataItem.temperature,
        dataItem.timestamp,

    )
);

// global variable so data can be used in any functions
let things;

// With the ID passed from client (App.js), we will filter out the full collection to only return the appropriate data
function handleInfo(id) {
  let filter = Data.find({'RoomId':id}).fetch();

  // Change to appropriate format 
  let info = parseData(filter);
  things = info;
}

Meteor.methods({
  // Return data to Client side when it calls
  "retrieveData": function() {
    return things;
  },
  // Retrieve data from Client (EG: about what room is clicked etc)
  getInfo(id) {
    handleInfo(id)
  }
})





