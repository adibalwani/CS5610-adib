describe('AddController', function () {
    beforeEach(module('Add'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('Test suite for adding two number', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('AddController', { $scope: $scope });
        });

        it('Add two positive numbers', function () {
            $scope.number1 = 20;
            $scope.number2 = 10;
            $scope.change();
            expect($scope.answer).toEqual(30);
        });

        it('Add positive and negative number', function () {
            $scope.number1 = -10;
            $scope.number2 = 10;
            $scope.change();
            expect($scope.answer).toEqual(0);
        });

        it('Add both zeros', function () {
            $scope.number1 = 0;
            $scope.number2 = 0;
            $scope.change();
            expect($scope.answer).toEqual(0);
        });
    });
});