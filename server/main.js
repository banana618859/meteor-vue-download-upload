/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-10-09 14:52:02
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-02-15 18:37:47
 */
import { Meteor } from 'meteor/meteor';

import '/imports/collections/Time';
import '/imports/publications/Time';
import '/imports/methods/UpdateTime';

import '/imports/collections/test';

// download
import '/imports/collections/download.js';

Meteor.startup(() => {
  // Update the current time
  Meteor.call('UpdateTime');
  // Add a new doc on each start.
  Time.insert({ time: new Date() });
  // Print the current time from the database
  console.log(`The time is now ${Time.findOne().time}`);
});
