var app = angular.module('MyApp', []);

app.controller("MyCntl", function ($scope, $http) {
    
    var api_url = "https://api-dev.car.ma/v2/users/create?client_id=ext-adib-alwani&sendPhoneVerification=false";
    var client_id = "ext-adib-alwani";
    var client_secret = "2EF3313BABACC399ED2618E437CF2";
    var email = "adib.alwani@hotmail.com";

    var body = {
        "lastName": "Alwani",
        "password": "adibalwani",
        "email": "adib.alwani@hotmail.com",
        "gender": "m",
        "firstName": "Adib"
    }

    //{
    //    "middleName": "",
    //    "lastName": "",
    //    "driverLicense": {
    //        "dateOfBirth": "",
    //        "region": "",
    //        "carmaNote": "",
    //        "number": "",
    //        "country": ""
    //    },
    //    "locale": {
    //        "languageCode": "",
    //        "countryCode": ""
    //    },
    //    "carmaNote": "",
    //    "password": "",
    //    "country": "",
    //    "currentEmployment": {
    //        "position": "",
    //        "startDate": 0,
    //        "employer": {
    //            "id": "",
    //            "name": "",
    //            "locationId": "",
    //            "locationName": ""
    //        },
    //        "endDate": 0
    //    },
    //    "imageId": 0,
    //    "phoneNumber": "",
    //    "inviteId": 0,
    //    "bio": "",
    //    "email": "",
    //    "webpage": "",
    //    "gender": "",
    //    "firstName": ""
    //}

    var sha256 = CryptoJS.algo.SHA256.create();
    
    sha256.update(api_url);
    sha256.update(email);
    sha256.update(client_secret);

    hash = sha256.finalize();

    hash = hash.toString(CryptoJS.enc.Hex);
    $scope.signature = hash;

    //console.log($scope.searchResults[index].ownerUid);
    $http.post("https://api-dev.car.ma/v2/users/create?client_id=ext-adib-alwani&sendPhoneVerification=false&signature=" + hash, body)
    .success(function (response) {
        console.log("added");
        console.log(response);
    }).
    error(function (response) {
        console.log("error");
        console.log(response.description);
    });
});