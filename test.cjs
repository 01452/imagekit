var ImageKit = require("imagekit");
var fs = require('fs');

var imagekit = new ImageKit({
    publicKey : "your_public_api_key",
    privateKey : "your_private_api_key",
    urlEndpoint : "https://ik.imagekit.io/your_imagekit_id/"
});

var authenticationParameters = imagekit.getAuthenticationParameters();
console.log(authenticationParameters);