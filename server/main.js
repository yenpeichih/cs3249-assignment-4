import { Meteor } from 'meteor/meteor';
import {Data} from '../imports/api/data.js'
import SimpleSchema, { MongoObject } from 'simpl-schema';
Meteor.startup(() => {
  // code to run on server at startup
});

let things;

function handleInfo(id) {
  let filter = Data.find({'RoomId':id}).fetch();
  things = filter
}

Meteor.methods({
  "retrieveData": function() {
    return things;
  },
  getInfo(id) {
    handleInfo(id)
  }
})





