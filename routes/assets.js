var express = require('express');
var assetRouter = express.Router();
require('dotenv').load()

let assetDAO = require('../buildSrc/DAO/assetsDAO');


var router = () => {
    
    assetRouter.route('/insert')
    .post(insert)
    
    assetRouter.route('/getAllAssets')
    .get(getAllAssets)

    assetRouter.route('/remove')
    .post(remove)

    assetRouter.route('/update')
    .post(update)
    

    return assetRouter;
}


var insert = (req,res) => {
  if(req.body != null){
    let body = req.body;
    assetDAO.insertAsset(body, (err,result) => {
        if(!err){
            res.status(200).send('Successfully Inserted this Asset into Database');
        } else {
            res.status(400).send(err);
        }
    })
  } else {
    res.send({err: true, msg: 'Missing parameters'})
  }
}

var getAllAssets = (req,res) => {
    assetDAO.getAllAssets((err,result) => {
        if(!err) {
            res.status(200).send(result);
        } else {
            res.status(400).send(err);
        }
    })
}

var remove = (req,res) => {
    let body = req.body;
    if(body._id === undefined) {
        res.send("Asset ID not found. Confirm your request and try again");
    } else {
        assetDAO.removeAsset(body._id, (err,result) => {
            if(!err){
             res.send('Successfully Deleted This Asset From Database');
            } else {
             res.send(err);
            }
        })
    }
}

var update = (req,res) => {
    let body = req.body;
    if(body._id === undefined) {
        res.send("Asset ID not found. Confirm your request and try again");
    } else {
        let assetID = body._id;        
        delete body._id;
        
        assetDAO.updateAsset(assetID, body, (err,result) => {
            if(!err){
                res.send(result);
            } else {
                res.send(err);
            }
        })
    }
}

module.exports = router;