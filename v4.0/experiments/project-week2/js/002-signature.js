﻿var app = angular.module('MyApp', []);

app.controller("MyCntl", function ($scope, $http) {
    
    var api_url = "https://api-dev.car.ma/v2/users/create?client_id=ext-adib-alwani&sendPhoneVerification=false";
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

    //{
    //    "lastName": "Ahluwalia",
    //    "password": "adibalwani",
    //    "email": "ahluwalia.p@husky.neu.edu",
    //    "gender": "m",
    //    "firstName": "Parth"
    //}

    //{
    //    "middleName": "",
    //    "lastName": "Ahluwalia",
    //    "driverLicense": {
    //        "id": 0,
    //        "dateOfBirth": 0,
    //        "region": "",
    //        "licenseCheckStatus": "",
    //        "number": "",
    //        "country": {
    //            "name": "",
    //            "iso3": "",
    //            "iso2": ""
    //        }
    //    },
    //    "locale": {
    //        "languageCode": "en",
    //        "countryCode": ""
    //    },
    //    "carmaNote": "",
    //    "password": "adibalwani",
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
    //    "email": "ahluwalia.p@husky.neu.edu",
    //    "webpage": "",
    //    "gender": "m",
    //    "firstName": "Parth"
    //}

    var body = "ahluwalia.p@husky.neu.edu";

    var sha256 = CryptoJS.algo.SHA256.create();
    
    sha256.update(api_url);
    sha256.update(body);
    sha256.update(client_secret);

    hash = sha256.finalize();

    hash = hash.toString(CryptoJS.enc.Hex);
    $scope.signature = hash;
    //console.log(hash);
});