/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-10-09 14:52:02
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-07 10:50:14
 */
import { Meteor } from 'meteor/meteor';

import '/imports/collections/Time';
import '/imports/publications/Time';
import '/imports/methods/UpdateTime';

import '/imports/collections/test';

// download
// import '/imports/collections/download.js';

  // upload
  import { Images } from '/imports/collections/images.js';

var usb = require('usb')

Meteor.startup(() => {
  // Update the current time
  Meteor.call('UpdateTime');
  // Add a new doc on each start.
  Time.insert({ time: new Date() });
  // Print the current time from the database
  console.log(`The time is now ${Time.findOne().time}`);
});


Meteor.methods({
  getusb(){
    console.log('---usb2233---')
    var list = usb.getDeviceList();
    console.log('usb-list:',list);
    return list;
  }
})