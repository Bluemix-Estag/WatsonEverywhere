require('dotenv').load()
let userDAO = require('../buildSrc/DAO/userDAO');

var checkUserPermission = (email) => {
    return new Promise((resolve, reject) => {
        if(email != null){
            userDAO.getPermissionByEmail(email, (err,result) => {
                if(!err){
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        } else {
            reject({err: true, msg: 'Missing parameters'})
        }
    })
}

exports.checkUserPermission = checkUserPermission;