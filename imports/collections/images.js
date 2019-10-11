
// download
// import { Meteor } from 'meteor/meteor';
// import { FilesCollection } from 'meteor/ostrio:files';



// /imports/collections/images.js
import { FilesCollection } from 'meteor/ostrio:files';

// const Images = new FilesCollection({collectionName: 'Images'});
    Images = new FilesCollection({
        collectionName: 'Images',
        // storagePath: '/myupload', 
        storagePath: 'd:\\myupload\\', // add the absolute path for images
    });
// Export created instance of the FilesCollection



export { Images };