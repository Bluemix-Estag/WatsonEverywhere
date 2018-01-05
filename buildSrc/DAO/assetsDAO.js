const db = require('../DB/assets_database');

let database;

db.getDatabase((result) => {
    database = result;
});



const insertAsset = (form, callback) => {
    database.insert (form, (err,doc) => {
        if(err){
            callback({
                error: true,
                error_reason: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }, null);
        }else {
            callback(null,doc);
        }
    })
}

const getAllAssets = (callback) => {
    database.find ({
        selector: {},
        fields: []
    }, function (err,result) {
        if(err) {
            callback(err,null);
        } else {
            callback(null, result.docs);
            console.log(JSON.stringify(result, null, 2));
        }
    })
}

const updateAsset = (assetID,body, callback) => {
    database.get(assetID, function(err,result){
        if(!err){
            for(var i in result){
                for(var key in body){
                    if(key == i){
                        result[i] = body[key];
                    } else {
                        result[key] = body[key]
                    }
                }
            }
            console.log(JSON.stringify(result, null, 2));
            
            insertAsset(result, (err, res) => {
                if(!err){
                    callback(null, res);
                } else {
                    callback(err,null);
                }
            })
        } else {
            callback({
                error: true,
                error_reason: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }, null);
        }
    })
}

const removeAsset = (assetID, callback) => {
    database.get(assetID, function(err, body){
        if(!err){
            var latestRev = body._rev;
            database.destroy(assetID, latestRev, function(err, body){
                if(!err){
                    callback(null, body)
                } else {
                    callback(err, null);
                }
            })
        } else {
            callback({
                error: true,
                error_reason: 'INTERNAL_SERVER_ERROR',
                statusCode: 500
            }, null);
        }
    })
}

module.exports = {
    insertAsset,
    getAllAssets,
    updateAsset,
    removeAsset
}
