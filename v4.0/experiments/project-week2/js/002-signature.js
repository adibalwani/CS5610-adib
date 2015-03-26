var app = angular.module('MyApp', []);

app.controller("MyCntl", function ($scope, $http) {

    var api_url = "https://api-dev.car.ma/carmaapi/v2/users/create";
    var client_id = "ext-adib-alwani";
    var client_secret = "2EF3313BABACC399ED2618E437CF2";

    var hash1 = CryptoJS.SHA256(client_id);
    var hash2 = CryptoJS.SHA256(client_secret);
    console.log(hash1.toString(CryptoJS.enc.Hex) + hash2.toString(CryptoJS.enc.Hex));

    var body = {
        "lastName": "Alice",
        "imageId": 0,
        "bio": "",
        "inviteId": 0,
        "phoneNumber":"8572724442",
        "webpage": "",
        "email": "adib.alwani@hotmail.com",
        "locale": {
            "languageCode": "",
            "countryCode": ""
        },
        "gender": "M",
        "firstName": "Adib",
        "password": "adibalwani",
        "country": ""
    };

    var sha256 = CryptoJS.algo.SHA256.create();

    sha256.update(api_url);
    sha256.update(JSON.stringify(body));
    sha256.update(client_secret);

    hash = sha256.finalize();
    console.log(hash);

    hash = hash.toString(CryptoJS.enc.Hex);
    console.log(hash);
});