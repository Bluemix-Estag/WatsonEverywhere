var express = require('express');
var osRouter = express.Router();
var osController = require('../controller/os.controller');
var multiPart = require('connect-multiparty');
var multipartMiddleware = multiPart();
var fs = require('fs');

var router = () => {

    osRouter.route('/objectStorage/find')
    .get(find);

    osRouter.route('/objectStorage/findByName')
    .post(findByName);

    osRouter.use(multipartMiddleware)
    .route('/objectStorage/insert')    
    .post(insert);

    osRouter.route('/objectStorage/getImage')
    .post(getImage);

    return osRouter;
}

var findByName = (req,res) => {
    var name = (req.body.name != undefined)?req.body.name:null;
    if(name != null){
        osController.findByName(name).then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.send(err);
        })
    }else{
        res.send({err: true, msg: 'Missing parameters'})
    }
    
}

var removeByName = (req,res) => {
    var name = (req.body.name != undefined)?req.body.name:null;
    osController.removeByName(name).then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    })
}

var insert = (req,res) => {
    var files = req.files;
    var filename = null;
    var file = null;
    for (idex in Object.keys(files)){
        filename = Object.keys(files)[0]
        break;
    }

    file = files[filename];


    osController.insert(file).then((resp) => {
        console.log(resp)
        res.send(resp);
        // fs.unlink('./')
    })
    .catch((err) => {
        console.log(err)
        res.send(err);
    })
}

var find = (req,res) => {
    osController.find().then((response) => {
        res.send(response);
    })
    .catch((err) => {
        res.send(err);
    })
}

var getImage = (req,res) => {
    var originalFilename = req.body.originalFilename;
    osController.getImage(originalFilename).then((photo) => {
        var img = fs.readFileSync('./uploads/' + originalFilename);
        var type = originalFilename.split('.')[1]
        res.writeHead(200, {'Content-Type': 'image/'+type });
        res.end(img, 'binary');
        // fs.unlink(photo, (err) => {
        //     if (err) console.log(err);
        // })
    })
    .catch((err) => {
        res.send(err);
    })
}



module.exports = router;