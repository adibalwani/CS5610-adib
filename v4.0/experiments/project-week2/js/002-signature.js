var app = angular.module('MyApp', []);

app.controller("MyCntl", function ($scope, $http) {
    
    var api_url = "/v2/users/create";
    var client_id = "ext-adib-alwani";
    var client_secret = "2EF3313BABACC399ED2618E437CF2";

    //var body = {
    //    "lastName": "Alwani",
    //    "password": "xxxxxxxx",
    //    "email": "adib.alwani@hotmail.com",
    //    "gender": "m",
    //    "firstName": "Adib"
    //}
    //console.log(JSON.stringify(body));
    var body = "adib.alwani@hotmail.com";

    var sha256 = CryptoJS.algo.SHA256.create();
    
    sha256.update(api_url);
    sha256.update(body);
    sha256.update(client_secret);

    hash = sha256.finalize();

    hash = hash.toString(CryptoJS.enc.Hex);
    $scope.signature = hash;
    //console.log(hash);
});