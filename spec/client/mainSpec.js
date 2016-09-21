'use strict'

describe('MainController', function() {
  beforeEach(module('PU'));

  var $rootScope;
  var $httpBackend;
  var $scope;
  var createController;

  var testStus = [
        {
          name: "Elliot Cheung",
          uid: "0",
          role: "student"
        },
        {
          name: "Kathryn Hansen",
          uid: "1",
          role: "student"
        },
        {
          name: "Ryan Walter",
          uid: "2",
          role: "student"
        },
        {
          name: "Iliya Svirsky",
          uid: "3",
          role: "student"
        },
      ];

  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('MainController', {
        $scope: $scope
      });
    };
  }));

  describe('$scope.students', function() {
    it('should be defined', function() {
      createController();
      expect($scope.students).toBeDefined();
      //our very first test :')
    });
    it('should be able to remove students', function(){
      createController();
      $scope.students = testStus.slice();
      var removed = $scope.students[0];
      var origLength = $scope.students.length;
      $scope.removeFromStudent($scope.students[0]);
      expect($scope.students.length).toBeLessThan(origLength);
      expect($scope.students.includes(removed)).toBe(false);
    })
    it('should be able to add students', function(){
      createController();
      $scope.students = testStus.slice();
      var removed = $scope.students[0];
      var origLength = $scope.students.length;
      $scope.removeFromStudent($scope.students[0]);
      $scope.addStudentBackIn(removed);
      expect($scope.students.length).toBe(origLength);
      expect($scope.students.includes(removed)).toBe(true);
    })
  });

  describe('$scope.randomize', function(){
    it('should be defined', function(){
      createController();
      expect($scope.randomize).toBeDefined();
    })
    it('should make groups from $scope.students', function(){
      createController();
      $scope.students = testStus;
      var groupSize = 2;
      $scope.randomize(groupSize);
      expect($scope.groups.length).not.toBeLessThan($scope.students.length/groupSize);
    })
    it('should have clashes after too many pairings', function(){
      createController();
      $scope.students = testStus.slice(0, 2);
      $scope.pastPairs = {'0':{'1' : true}, '1': {'0' : true}};
      $scope.randomize(2);
      expect($scope.clashes.length).toBeGreaterThan(0);
    })
  })
});