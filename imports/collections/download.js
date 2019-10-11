
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
// const Images = new FilesCollection({collectionName: 'Images'});
// 
import { Images }      from '/imports/collections/images.js';

if (Meteor.isServer) {
  // Load sample image into FilesCollection on server's startup:
  // https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png
  Meteor.startup(function () {
    // Images.load('http://www.xcaipu.cn/images/timg.jpg', {
    //   fileName: 'logo.jpg',
    //   meta: {}
    // });
  });

  Meteor.publish('Images', function () {
    console.log('files.images.all--99:',Images.find().count())
    // return Images.find().cursor;
    return Images.find().cursor;
  });
} else {
  // Subscribe on the client
  // Meteor.subscribe('files.images.all');
}