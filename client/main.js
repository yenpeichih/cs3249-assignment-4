import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/App.js';
import { MongoObject } from 'simpl-schema';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});


