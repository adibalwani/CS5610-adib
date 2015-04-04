var app = angular.module("MyApp", []);

app.controller("Controller", function ($scope, $http) {
    $scope.loc = "//placehold.it/100";
    var body = null;

    var handleFileSelect = function (evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                $scope.loc = "data:image/jpeg;base64," + btoa(binaryString);
                body = binaryString;
                console.log(body);

                $http.post("https://api-dev.car.ma/v1/images?client_id=ext-adib-alwani&mimeType=image%2Fjpeg%3Bbase64", body)
                .success(function (response) {
                    console.log(response);
                })
                .error(function (response) {
                    console.log(response);
                });
                
                $scope.$apply();
            };
            
            reader.readAsBinaryString(file);

        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        $('#filePicker').change(handleFileSelect);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
});