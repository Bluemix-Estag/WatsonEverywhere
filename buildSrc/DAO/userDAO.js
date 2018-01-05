const db = require('../DB/user_database');

let database;

db.getDatabase((result) => {
    database = result;
});

const getAdminsByEmail = (callback) => {
    database.find ({
        selector: {
            "permission": "admin"
        }, 
        fields: []
    },function (err, result) {
        if (err) {
            callback(err, null);
            
        } else {
            callback(null, result.docs);
            console.log(JSON.stringify(result, null, 2));
        }
    });
}

const getPermissionByEmail = (email, callback) => {
    database.find ({
        selector: {
            "email": email
        },
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

const getAllUsers = (callback) => {
    database.find ({
        selector : {

        },
        fields: []
    }, function (err,result) {
        if(err){
            callback(err,null);
        } else {
            callback(null,result.docs);
        }
    })
}

const insertUser = (form, callback) => {
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

const removeUser = (userID, callback) => {
    database.get(userID, function(err, body){
        if(!err){
            var latestRev = body._rev;
            database.destroy(userID, latestRev, function(err, body){
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

const updateUser = (userID,body, callback) => {
    database.get(userID, function(err,result){
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
            
            insertUser(result, (err, res) => {
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


module.exports = {
    getAdminsByEmail,
    getPermissionByEmail,
    getAllUsers,
    insertUser,
    updateUser,
    removeUser
}
