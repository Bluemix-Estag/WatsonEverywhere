/**
 * Module dependencies.
 */

var hostname = "http://localhost:3000";

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var ObjectStorage = require('ibmcloud-objectstorage');

var saml2 = require('saml2-js');
var Saml2js = require('saml2js');
var cfenv = require('cfenv');
var cookieParser = require('cookie-parser');
require('dotenv').load();

var app = express();
var db;
var cloudant;
var fileToUpload;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();
var session = require('express-session')
var request = require('request');
var CryptoJS = require("crypto-js");
// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/style', express.static(path.join(__dirname, 'views/style')));
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret'
}));

var sess;

// Create service provider
var sp_options = {
    entity_id: "https://watsoneverywhere.mybluemix.net:443/metadata.xml",
    private_key: fs.readFileSync("cert/key.pem").toString(),
    certificate: fs.readFileSync("cert/cert.pem").toString(),
    assert_endpoint: "https://watsoneverywhere.mybluemix.net/assert"
};
var sp = new saml2.ServiceProvider(sp_options);

//

var idp_options = {
    sso_login_url: " https://w3id.alpha.sso.ibm.com/auth/sps/samlidp/saml20/logininitial?RequestBinding=HTTPPost&PartnerId=https://watsoneverywhere.mybluemix.net:443/metadata.xml&NameIdFormat=email&Target=http://watsoneverywhere.mybluemix.net",


    certificates: fs.readFileSync("cert/w3id.sso.ibm.com").toString()
};
var idp = new saml2.IdentityProvider(idp_options);

// ------ Define express endpoints ------
// Endpoint to retrieve metadata
app.get("/metadata.xml", function (req, res) {
    res.type('application/xml');
    res.send(sp.create_metadata());
});

// Starting point for login
app.get("/login", function (req, res) {
    //console.log(idp);
    sp.create_login_request_url(idp, {}, function (err, login_url, request_id) {
        if (err != null)
            return res.send(500);
        console.log(login_url);
        res.redirect(login_url);
    });
});

// Assert endpoint for when login completes
app.post("/assert", function (req, res) {
    sess = req.session;
    var options = {
        request_body: req
    };
    console.log("Options: " + options);
    var response = new Buffer(req.body.SAMLResponse || req.body.SAMLRequest, 'base64');
    console.log(response);
    var parser = new Saml2js(response);

    //return res.json(parser.toObject());
    sess.users = parser.toObject();
    console.log("Session" + sess);
    
    var cryptedUser = CryptoJS.AES.encrypt(JSON.stringify(sess.users), 'chavequeseráutilizada');

    res.redirect('http://urlquevaiserusada/?param='+cryptedUser);
});

app.get('/assert', function (req, res) {
    res.render('index.html');
})


app.get('/', function (req, res) {
    res.render('index.html');
})


var osRouter = require('./routes/objectstorage')();
var userRouter = require('./routes/user')();
var assetsRouter = require('./routes/assets')();
// Jeito certo
app.use('/watsoneverywhere/api/v1/', osRouter);
app.use('/watsoneverywhere/api/v1/users/', userRouter);
app.use('/watsoneverywhere/api/v1/assets/', assetsRouter);

http.createServer(app).listen(app.get('port'), '0.0.0.0', function () {
    console.log('Express server listening on port ' + app.get('port'));
});
