'use strict';

/* Controllers */
var appEAF3 = angular.module('appEAF3', ['ngRoute', 'ngResource', 'angular-loading-bar', 'ngAnimate', 'ngCookies']); //

/* Config */
appEAF3.config([
    '$routeProvider', '$locationProvider',
    function($routeProvide, $locationProvider){
        $locationProvider.hashPrefix('');
        $routeProvide
            .when('/',{
                templateUrl:'template/home.html',
                controller:'homeCtrl'
            })
            .when('/report',{
                templateUrl:'template/reportall.html',
                controller:'ReportAllCtrl'
            })
            .when('/reportburner',{
                templateUrl:'template/report.html',
                controller:'ReportCtrl'
            })
            .when('/journal',{
                templateUrl:'template/journal.html', //journal.html
                controller:'JournalCtrl'
            })
            .when('/client',{
                templateUrl:'template/client.html',
                controller:'ClientCtrl'
            })
            .when('/heatprocess',{
                templateUrl:'template/heatprocess.html',
                controller:'HeatprocessCtrl'
            })
            .when('/contact',{
                templateUrl:'template/contact.html',
                controller:'ContactCtrl'
            })
            .when('/login',{
                templateUrl:'login/login.html',
                controller:'LoginCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

/* Factory */

/* Filter */
appEAF3.filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    }
});

appEAF3.controller('homeCtrl',[
    '$scope','$http', '$location',
    function($scope, $http, $location) {
    }
]);

appEAF3.controller('ReportAllCtrl',[
    '$scope','$http', '$location',
    function($scope, $http, $location) {
    }
]);

appEAF3.controller('JournalCtrl',[
    '$scope','$http', '$location', function($scope, $http) {
        $scope.enterJournal = function (teacher_maska) {
            $scope.disable = true;
            if (teacher_maska.length > 0) {
                $scope.teco = teacher_maska;
                var groupList = function () {
                    $http.post('php/groups.php?teco=' + $scope.teco)
                        .then(function onSuccess(response) {
                            $scope.lstGroups = response.data;
                            $scope.numGroup = $scope.lstGroups[0];
                        });
                };
                groupList();
            }
            else {
                $scope.lstGroups = null;
            }
        };
        $scope.loadGroupData = function (numGroup, dateJournal) {
            $scope.city_code = $scope.lstGroups[0].city_id;
            $scope.teacher_code = $scope.lstGroups[0].code;
            $scope.grJournal = null;
            if (numGroup.length > 0) {
                $scope.flag = 0;
                $scope.ll = 0;
                $scope.grco = numGroup;
                $scope.grti = dateJournal.toLocaleDateString();
                var groupJournal = function () {
                    $http.post('php/group-data.php?grco=' + $scope.grco + '&grti=' + $scope.grti)
                        .then(function onSuccess(response2) {
                            $scope.grJournal = response2.data;
                            $scope.ll = $scope.grJournal.length;
                            $scope.grHour = $scope.grJournal[0].hour;
                        });
                };
                groupJournal();
                var groupJournalTimeOut = function () {
                    if (!$scope.ll || $scope.ll == 0) {
                        $scope.flag = 1;
                        var groupJournal2 = function () {
                            $http.post('php/group-data-new.php?grco=' + $scope.grco)
                                .then(function onSuccess(response3) {
                                    $scope.grJournal = response3.data;
                                    $scope.grHour = 0;
                                });
                        };
                        groupJournal2();
                    }
                };
                setTimeout(groupJournalTimeOut, 2000);
                $scope.disable = false;
            }
            else {
                $scope.grJournal = null;
            }
        };
        $scope.saveGroupData = function (grJournal) {
            //window.alert($scope.flag);
            var isNumeric = function (n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            };
            var groupJournalS = function (id,chk,hour,flag,city_code,teacher_code,scholar_id,scholar_fname,scholar_lname,scholar_datebirth,scholar_code,payment,grti,grco) {
                $http.post('php/group-data-save.php?grid=' + id + '&grch=' + chk + '&grho=' + hour + '&flag=' + flag + '&city_code=' + city_code + '&teacher_code=' + teacher_code + '&scholar_id=' + scholar_id + '&scholar_fname=' + scholar_fname + '&scholar_lname=' + scholar_lname + '&scholar_datebirth=' + scholar_datebirth + '&scholar_code=' + scholar_code + '&payment=' + payment + '&grti=' + grti + '&grco=' + grco)
                    .then(function onSuccess(responseS) {
                        $scope.grJournalS = responseS.data;
                    });
            };
            if (isNumeric($scope.grHour) && $scope.grHour>0) {
                for (var i = 0; i < grJournal.length; i++) {
                    /*if (!isNumeric(grJournal[i].hour)) {
                        grJournal[i].hour = 0;
                    }*/
                    //window.alert(grJournal[i].id + " " + grJournal[i].presence + " " + grJournal[i].hour + " " + $scope.flag + " " + $scope.city_code + " " + $scope.teacher_code + " " + grJournal[i].scholar_id + " " + grJournal[i].scholar_fname + " " + grJournal[i].scholar_lname + " " + grJournal[i].scholar_datebirth + " " + grJournal[i].scholar_code + " " + grJournal[i].payment + " " + $scope.grti + " " + $scope.grco);
                    groupJournalS(grJournal[i].id,grJournal[i].presence,$scope.grHour,$scope.flag,$scope.city_code,$scope.teacher_code,grJournal[i].scholar_id,grJournal[i].scholar_fname,grJournal[i].scholar_lname,grJournal[i].scholar_datebirth,grJournal[i].scholar_code,grJournal[i].payment,$scope.grti,$scope.grco);
                }
                $scope.disable = true;
            }
            else
            {
                window.alert("Введите количество учебных часов !");
            }
        };
    }
]);

appEAF3.controller('ClientCtrl',[
    '$scope','$http', '$location', function($scope, $http) {
        $scope.enterJournal = function (client_maska) {
            $scope.disable = true;
            if (client_maska.length > 0) {
                $scope.teco = client_maska;
                var groupList = function () {
                    $http.post('php/client_groups.php?teco=' + $scope.teco)
                        .then(function onSuccess(response) {
                            $scope.lstGroups = response.data;
                            $scope.numGroup = $scope.lstGroups[0];
                        });
                };
                groupList();
            }
            else {
                $scope.lstGroups = null;
            }
        };
        $scope.loadGroupData = function (numGroup, dateJournal) {
            $scope.city_code = $scope.lstGroups[0].city_id;
            $scope.teacher_code = $scope.lstGroups[0].code;
            $scope.grJournal = null;
            if (numGroup.length > 0) {
                $scope.flag = 0;
                $scope.ll = 0;
                $scope.grco = numGroup;
                $scope.grti = dateJournal.toLocaleDateString();
                var groupJournal = function () {
                    $http.post('php/group-data.php?grco=' + $scope.grco + '&grti=' + $scope.grti)
                        .then(function onSuccess(response2) {
                            $scope.grJournal = response2.data;
                            $scope.ll = $scope.grJournal.length;
                            $scope.grHour = $scope.grJournal[0].hour;
                        });
                };
                groupJournal();
                var groupJournalTimeOut = function () {
                    if (!$scope.ll || $scope.ll == 0) {
                        $scope.flag = 1;
                        var groupJournal2 = function () {
                            $http.post('php/group-data-new.php?grco=' + $scope.grco)
                                .then(function onSuccess(response3) {
                                    $scope.grJournal = response3.data;
                                    $scope.grHour = 0;
                                });
                        };
                        groupJournal2();
                    }
                };
                setTimeout(groupJournalTimeOut, 2000);
                $scope.disable = false;
            }
            else {
                $scope.grJournal = null;
            }
        };
        $scope.saveGroupData = function (grJournal) {
            //window.alert($scope.flag);
            var isNumeric = function (n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            };
            var groupJournalS = function (id,chk,hour,flag,city_code,teacher_code,scholar_id,scholar_fname,scholar_lname,scholar_datebirth,scholar_code,payment,grti,grco) {
                $http.post('php/group-data-save.php?grid=' + id + '&grch=' + chk + '&grho=' + hour + '&flag=' + flag + '&city_code=' + city_code + '&teacher_code=' + teacher_code + '&scholar_id=' + scholar_id + '&scholar_fname=' + scholar_fname + '&scholar_lname=' + scholar_lname + '&scholar_datebirth=' + scholar_datebirth + '&scholar_code=' + scholar_code + '&payment=' + payment + '&grti=' + grti + '&grco=' + grco)
                    .then(function onSuccess(responseS) {
                        $scope.grJournalS = responseS.data;
                    });
            };
            if (isNumeric($scope.grHour) && $scope.grHour>0) {
                for (var i = 0; i < grJournal.length; i++) {
                    /*if (!isNumeric(grJournal[i].hour)) {
                     grJournal[i].hour = 0;
                     }*/
                    //window.alert(grJournal[i].id + " " + grJournal[i].presence + " " + grJournal[i].hour + " " + $scope.flag + " " + $scope.city_code + " " + $scope.teacher_code + " " + grJournal[i].scholar_id + " " + grJournal[i].scholar_fname + " " + grJournal[i].scholar_lname + " " + grJournal[i].scholar_datebirth + " " + grJournal[i].scholar_code + " " + grJournal[i].payment + " " + $scope.grti + " " + $scope.grco);
                    groupJournalS(grJournal[i].id,grJournal[i].presence,$scope.grHour,$scope.flag,$scope.city_code,$scope.teacher_code,grJournal[i].scholar_id,grJournal[i].scholar_fname,grJournal[i].scholar_lname,grJournal[i].scholar_datebirth,grJournal[i].scholar_code,grJournal[i].payment,$scope.grti,$scope.grco);
                }
                $scope.disable = true;
            }
            else
            {
                window.alert("Введите количество учебных часов !");
            }
        };
    }
]);

/* HeatprocessCtrl Controller */
appEAF3.controller('HeatprocessCtrl',[
    '$scope','$http','$timeout', function($scope, $http, $timeout) {
        //$scope.vsblPanelIn = "";
        //$scope.vsblPanelUg = "";
        var HeatDataRefresh = function () {
            $http.get('php/heatdata.php',{ignoreLoadingBar: true})
                .then(function onSuccess(response) {
                    $scope.dataHeat = response.data;
                });
            $timeout(HeatDataRefresh, 3000);
        };
        HeatDataRefresh();
        var burnRefresh = function () {
            $http.get('php/burner.php',{ignoreLoadingBar: true})
                .then(function onSuccess(response) {
                    $scope.dataBurner = response.data;
                });
            $timeout(burnRefresh, 3000);
        };
        burnRefresh();
        var celoxRefresh = function () {
            $http.get('php/celox_current.php',{ignoreLoadingBar: true})
                .then(function onSuccess(response) {
                    $scope.dataCelox = response.data;
                });
            $timeout(celoxRefresh, 3000);
        };
        celoxRefresh();
        var sampleRefresh = function () {
            $http.get('php/sample_current.php',{ignoreLoadingBar: true})
                .then(function onSuccess(response) {
                    $scope.dataSample = response.data;
                });
            $timeout(sampleRefresh, 3000);
        };
        sampleRefresh();
    }
]);

appEAF3.controller('ReportCtrl',[
    '$scope','$http', '$window', function($scope, $http, $window) {
        $scope.vsblReport="none";
        $scope.vsblPrintReport = "none";
        var heatList = function () {
            $http.get('php/heats.php')
                .then(function onSuccess(response) {
                    $scope.lstHeats = response.data;
                });
        };
        heatList();
        $scope.addHeatF = function (numHeat) {
            if(numHeat != "")
            {
                $scope.fistHeat=numHeat;
            }
        };
        $scope.addHeatL = function (numHeat) {
            if(numHeat != "")
            {
                $scope.lastHeat=numHeat;
            }
        };
        $scope.openReport = function () {
            if (($scope.fistHeat)||($scope.lastHeat)) {
                if (($scope.fistHeat)&&(!$scope.lastHeat)) {
                    $scope.lastHeat=$scope.fistHeat;
                }
                if ((!$scope.fistHeat)&&($scope.lastHeat)) {
                    $scope.fistHeat=$scope.lastHeat;
                }
                $scope.vsblReport = "";
                $scope.rptDate = new Date();
                if ($scope.fistHeat > $scope.lastHeat) {
                    var varNumHeat = $scope.fistHeat;
                    $scope.fistHeat = $scope.lastHeat;
                    $scope.lastHeat = varNumHeat;
                }
                var rptBurner = function () {
                    $http.post('php/rptburner.php?heatstart=' + $scope.fistHeat + '&heatend=' + $scope.lastHeat)
                        .then(function onSuccess(response2) {
                            $scope.dataBurners = response2.data;
                        });
                };
                rptBurner();
                $scope.vsblPrintReport = "";
            }
        };
        $scope.printReport = function(){
            $window.print();
        };
    }
]);

/* Contact Controller */
appEAF3.controller('ContactCtrl',[
    '$scope',function($scope) {}
]);

/* Login Controller */
appEAF3.controller('LoginCtrl',[
    '$rootScope', '$location', '$cookies', '$http', '$window',function($rootScope, $location, $cookies, $http, $window) {
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
]);