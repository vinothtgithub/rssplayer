/**
REFERENCES
==========

*** PROJECT ITEM TEMPLATES ***
==============================
1. Predefined code for View-Controller-Service(API) are built as Visual Studio 2012 "VisualC# Item Template" and available for use : $/Davenport Financial/Development/Main/LienService/Resources/Development/ProjectItemTemplate/AngularMVC.zip

*** EXISTING FEATURES ***
========================

1.  Angular State Route Mechanism built based on reference : https://github.com/angular-ui/ui-router/wiki
2.  Lazy load or Async resource download built based on Metronic Angular Framework and its reference TFS : $/Synergy/Main/Portfolio/Reference/Metronic/v4.0.2/theme/templates/admin/angularjs
**/

/** Setup App Instance and inheriting required modules **/
var RssApp = angular.module('RssApp', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
]);

/** **/
RssApp.run(function ($rootScope) {

    $rootScope.PreviousState = '';
    
    $rootScope.showmasterprogress = false;

    $rootScope.serverrequestcompleted = true;
});

/** Setup App Settings SINGLETON Service **/
RssApp.service('AppSettings', ['$location', '$rootScope', function ($location, $rootScope) {

    /** collection of app specific settings **/
    this.current = {
        demoMode: true,
        layout: {
            defaultmodalsize: 'xs'
        },
        animation: {
            modalFadeIO: true        
        }
    }    
}]);

/** Setup Shared Api SINGLETON Service **/
RssApp.service('ApiService', ['$http', '$state', '$stateParams', '$rootScope', '$timeout', 'AppSettings', 'AppGlobalModals', function ($http, $state, $stateParams, $rootScope, $timeout, AppSettings, AppGlobalModals) {

    this.get = function (path, success, failure, always, successmessage, failuremessage) {

        $rootScope.serverrequestcompleted = false;
        $timeout((function () { if ($rootScope.serverrequestcompleted === false) { $rootScope.showmasterprogress = true; } else { $rootScope.showmasterprogress = false; } }), 2000);

        //AppSettings.current.navigation.baseApi + 
        $http.get(path, null)
            .then(function (result) {

                $rootScope.serverrequestcompleted = true;
                $rootScope.showmasterprogress = false;

                success(result);
                if (always != null)
                    always(result);
                if (successmessage !== null && successmessage !== undefined) {
                    AppGlobalModals.MessageModal(successmessage)
                        .then(function (modaloutput) {
                            console.log('Modal submitted with: ' + modaloutput);
                        }, function () {
                            console.log('Modal dismissed at: ' + new Date());
                        });
                }
            }, function (result) {

                $rootScope.serverrequestcompleted = true;
                $rootScope.showmasterprogress = false;

                if (failure != null) {
                    failure(result);

                }
                else {

                    var errorMessage = result.status + ':' + result.statusText;
                    if (result.data != null && result.data.Message != null)
                        errorMessage += ' - ' + result.data.Message;
                    console.log(errorMessage);
                }
                if (always != null)
                    always(result);
                if (failuremessage !== null && failuremessage !== undefined) {

                    //AppGlobalModals.MessageModal(failuremessage)
                    //    .then(function (modaloutput) {
                    //        console.log('Modal submitted with: ' + modaloutput);
                    //    }, function () {
                    //        console.log('Modal dismissed at: ' + new Date());
                    //    });
                }
            });
    }

    this.jsonp = function (path, success, failure, always, successmessage, failuremessage) {

        $rootScope.serverrequestcompleted = false;
        $timeout((function () { if ($rootScope.serverrequestcompleted === false) { $rootScope.showmasterprogress = true; } else { $rootScope.showmasterprogress = false; } }), 2000);

        //AppSettings.current.navigation.baseApi + 
        $http.jsonp(path, null)
            .then(function (result) {

                $rootScope.serverrequestcompleted = true;
                $rootScope.showmasterprogress = false;

                success(result);
                if (always != null)
                    always(result);
                if (successmessage !== null && successmessage !== undefined) {
                    AppGlobalModals.MessageModal(successmessage)
                        .then(function (modaloutput) {
                            console.log('Modal submitted with: ' + modaloutput);
                        }, function () {
                            console.log('Modal dismissed at: ' + new Date());
                        });
                }
            }, function (result) {

                $rootScope.serverrequestcompleted = true;
                $rootScope.showmasterprogress = false;

                if (failure != null) {
                    failure(result);

                }
                else {

                    var errorMessage = result.status + ':' + result.statusText;
                    if (result.data != null && result.data.Message != null)
                        errorMessage += ' - ' + result.data.Message;
                    console.log(errorMessage);
                }
                if (always != null)
                    always(result);
                if (failuremessage !== null && failuremessage !== undefined) {

                    //AppGlobalModals.MessageModal(failuremessage)
                    //    .then(function (modaloutput) {
                    //        console.log('Modal submitted with: ' + modaloutput);
                    //    }, function () {
                    //        console.log('Modal dismissed at: ' + new Date());
                    //    });
                }
            });
    }
}]);

/** Setup Modal Windows or Toast Notifier Instantiator (Message Box, Confirmation Box, Toast Notification etc) SINGLETON Service **/
RssApp.service('AppGlobalModals', ['$modal', 'AppSettings', '$state', '$stateParams', function ($modal, AppSettings, $state, $stateParams) {

    var service = this;
    service.openModal = function (templateurl, controller, dependencies, size, data) {
        return $modal.open({
            animation: true,
            templateUrl: templateurl,
            controller: controller,
            size: size ? size : 'xs',
            backdrop: 'static',
            keyboard: 'false',
            replace: true,
            resolve: {
                parentdata: function () {
                    return angular.copy(data);
                },
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'RssApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: dependencies
                    });
                }]
            }
        }).result;
    }

}]);

/** Setup App Main Controller **/
RssApp.controller('AppController', ['$scope', '$rootScope', '$location', '$state', '$stateParams', 'ApiService', 'AppSettings', function ($scope, $rootScope, $location, $state, $stateParams, ApiService, AppSettings) {

    $scope.$on('$viewContentLoaded', function () {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });

    $scope.$on('$destroy', function () {

    });

    $scope.GotoState = function (statename, param) {

        if (param !== null || param !== undefined) {
            $stateParams.companyid = param;
        }

        $state.go(statename, $stateParams);
    };

}]);

RssApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/home");

    //$locationProvider.html5Mode(true);

    // State based url route definition
    $stateProvider
        
        .state('home', {
            url: "/home",
            templateUrl: "spa/viewmodel/home/home.html?v=1",
            data: { pageTitle: 'Home' },
            controller: "HomeController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'RssApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'spa/viewmodel/home/home.ctlr.js?v=1',
                            'spa/viewmodel/home/home.svc.js?v=1'
                        ]
                    });
                }]
            }
        });

}]);




