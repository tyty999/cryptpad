var Https = require('https');
var Config = require("./config.js");
var Package = require("./package.json");

var body = JSON.stringify({
    domain: Config.myDomain,
    adminEmail: Config.adminEmail,
    version: Package.version,
});

var options = {
    host: 'accounts.cryptpad.fr',
    path: '/api/getauthorized',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
    }
};

var req = Https.request(options, function (response) {
    if (!('' + response.statusCode).match(/^2\d\d$/)) {
        throw new Error('SERVER ERROR ' + response.statusCode);
    }
    var str = '';
    response.on('data', function (chunk) {
        str += chunk;
    });
    response.on('end', function () {
        try {
            var json = JSON.parse(str);
            console.log(json);
        } catch (e) {
            throw new Error(e);
        }
    });
}).on('error', function (e) {
    console.error(e);
}).end(body);
