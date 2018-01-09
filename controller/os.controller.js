var ObjectStorage = require('ibmcloud-objectstorage');
require('dotenv').load()

var config = {
    provider: 'openstack',
    useServiceCatalog: true,
    useInternal: false,
    keystoneAuthVersion: 'v3',
    authUrl: process.env.OBJECTSTORAGE_AUTHURL,
    tenantId: process.env.OBJECTSTORAGE_PROJECTID, //projectId from credentials
    domainId: process.env.OBJECTSTORAGE_DOMAINID,
    username: process.env.OBJECTSTORAGE_USERNAME,
    password: process.env.OBJECTSTORAGE_PASSWORD,
    region: process.env.OBJECTSTORAGE_REGION //dallas or london region
};

var os = new ObjectStorage(config, "my-container");


var find = () => {
    return new Promise((resolve, reject) => {
        os.find().then((response) => {
                console.log(response);
                resolve(response)
            })
            .catch((err) => {
                reject(err);
                console.log(err);
            })
    })
}

var findByName = (name = null) => {
    return new Promise((resolve, reject) => {
        if (name != null) {
            os.findByName(name).then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                })
        } else {
            reject({
                err: true,
                msg: 'Missing parameters'
            })
        }
    })
}

var create = (name) => {
    return new Promise((resolve, reject) => {
        os.create(name).then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
    })
}

var removeByName = (name) => {
    return new Promise((resolve, reject) => {
        if(name != null){
            os.removeByName(name).then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            })
        }else{
            reject({err: true, msg: "Missing parameters"})
        }
    })
}

var insert = (path) => {
    return new Promise((resolve,reject) => {
        if(path != null) {
            os.insert(path).then((response) => {
                resolve(response);
            })
            .catch((err) => {
               reject(err);
            })
        } else {
            reject({err: true, msg: "Missing parameters"})
        }
    })
}

var getImage = (name) => {
    return new Promise((resolve, reject) => {
        if (name != null) {
            os.getFile(name, "./uploads/").then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                })
        } else {
            reject({
                err: true,
                msg: 'Missing parameters'
            })
        }
    })
};


exports.find = find;
exports.findByName = findByName;
exports.removeByName = removeByName;
exports.insert = insert;
exports.getImage = getImage;