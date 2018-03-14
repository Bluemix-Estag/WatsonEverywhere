var express = require('express');
var userRouter = express.Router();
var userController = require('../controller/user.controller');
require('dotenv').load()

let userDAO = require('../buildSrc/DAO/userDAO');



var router = () => {
    userRouter.route('/checkUserPermission')
    .post(checkUserPermission)

    userRouter.route('/insert')
    .post(insert)

    userRouter.route('/getAllUsers')
    .get(getAllUsers)

    userRouter.route('/remove')
    .post(remove)

    userRouter.route('/update')
    .post(update)
    

    return userRouter;
}

var checkUserPermission = (req,res) => {
  if(req.body != null){
    let body = req.body;
    userDAO.getPermissionByEmail(body.email, (err,result) => {
      if(!err){
        res.send(result);
      } else {
        res.send(err);
      }
    })
  } else {
    res.send({err: true, msg: 'Missing parameters'})
  }
}

var insert = (req,res) => {
  if(req.body != null){

    let body = req.body;
    userDAO.insertUser(body, (err,result) => {
      if(!err){
        res.send('Successfully Inserted this User into Database');
      } else {
        res.send(err);
      }
    })
  } else {
    res.send({err: true, msg: 'Missing parameters'})
  }
}

var getAllUsers = (req,res) => {
  userDAO.getAllUsers((err,result) => {
    if(!err){
        res.send(result);
    } else {
        res.send(err);
    }
  })
}

var remove = (req,res) => {
  let body = req.body;
  if(req.body._id === undefined) {
    res.send("User ID not found. Confirm your request and try again");
  } else {
    userDAO.removeUser(req.body._id, (err, result) => {
        if(!err){
            res.send('Successfully Deleted This User From Database')
        } else {
            res.send(err);
        }
    })
  }
}

var update = (req,res) => {
  let body = req.body;
  if(body._id === undefined) {
    res.send("User ID not found. Confirm your request and try again");
  } else {
    
    userDAO.updateUser(body._id, body, (err,result) => {
        if(!err){
            res.send(result);
        } else {
            res.send(err);
        }
    })
  }
}

module.exports = router;