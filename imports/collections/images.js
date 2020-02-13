/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-10-09 15:05:50
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2019-12-07 11:22:01
 */

// download
// import { Meteor } from 'meteor/meteor';
// import { FilesCollection } from 'meteor/ostrio:files';



// /imports/collections/images.js
import { FilesCollection } from 'meteor/ostrio:files';

// const Images = new FilesCollection({collectionName: 'Images'});
    Images = new FilesCollection({
        collectionName: 'Images'
        //ddp: 'http://localhost:7000',
        //ddp: DDP.connect('http://172.16.66.165:7000'),
        //collectionName: 'files',
        // storagePath: '/myupload', 
        //storagePath: 'd:\\myupload2\\', // add the absolute path for images this is localhost url
    });
// Export created instance of the FilesCollection



export { Images };