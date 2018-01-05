/**
 * This file contains all of the web and hybrid functions for interacting with
 * Cloudant service.
 *
 * @summary   Functions for Cloudant.
 * @author  Carlos Lobato
 * 
 *
 */


const fs = require('fs');

let database;

const DATABASE_NAME = "everywhere_users";


const initCloudant = (callback) => {
    let cloudantURL = process.env.CLOUDANT_URL;
    let cloudant = require('cloudant')({
        url: cloudantURL,
        plugin: 'retry',
        retryAttempts: 10,
        retryTimeout: 500
    });

    // Create the accounts Logs if it doesn't exist
    cloudant.db.create(DATABASE_NAME, (err, body) => {
        if (err) {
            console.log(`Database already exists: ${DATABASE_NAME}`);
        } else {
            console.log(`New database created: ${DATABASE_NAME}`);
        }
    });

    database = cloudant.db.use(DATABASE_NAME);
    callback(false);
}

const getDatabase = (callback) => {
    if (database == undefined) {
        initCloudant((error) => {
            if (error) {
                callback(database);
            } else {
                callback(database);
            }
        })
    } else {
        callback(database);
    }
}




module.exports = {
    getDatabase
};