'use strict';

/* Setup HomeListing SINGLETON Controller
    * @$rootScope {}:
    * @$scope {}: service instance which helps data binding btw view and controller
    * @$state {}: service instance which has current route state information
    * @$stateParams {}: service instance which has parameter values or query string values information
    * @$filter {}:
    * @$http {}: 
    * @$timeout {}:
    * @AppSettings {}: SINGLETON Service hold app specific settings
    * @AppGlobalModals {}: 
    * @HomeService {}: service instance which has GETLIST, GET, SAVE api call definition specific to this controller
*/
RssApp.controller('HomeController', ['$rootScope', '$scope', '$state', '$stateParams', '$filter', '$http', '$timeout', '$interval', 'AppSettings', 'AppGlobalModals', 'HomeService', function ($rootScope, $scope, $state, $stateParams, $filter, $http, $timeout, $interval, AppSettings, AppGlobalModals, HomeService) {

    /** region: Initialization **/

    var successmessage;
    var failuremessage;
    var actionrequired;

    $scope.viewContentLoadCompleted = false;

    $scope.LastUpdatedOn = '';

    $scope.WeatherNow1 = {};
    $scope.WeatherNow2 = {};
    $scope.RssData = {};
    $scope.RssDataStock = {};
    $scope.RssDataReady = false;

    $interval(function () {
        $scope.DateEST = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
        $scope.DateIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    }, 1000);

    $interval(function () {
        $scope.RandomBackground();
    }, 360000);

    $interval(function () {
        $scope.GetWeather();
        $scope.GetRssFeed();
    }, 120000);

    $interval(function () {
        if ($scope.RssDataReady) {
            $('.carousel-control-next').trigger('click');
        }
    }, 15000);

    /** endregion: Initialization **/

    /** region: Listener **/

    /** On Content Include Complete Listener **/
    $scope.$on('$includeContentLoaded', function () {
    });

    /** On Content Load Complete Listener **/
    $scope.$on('$viewContentLoaded', function () {

        if (!$scope.viewContentLoadCompleted) {

            $rootScope.$emit("RootViewChange", 'home');

            $scope.viewContentLoadCompleted = true;

            $scope.ViewName = 'Home';

            $scope.RandomBackground();
            $scope.GetWeather();
            $scope.GetRssFeed();
        }
    });

    /** On Content Unload Listener **/
    $scope.$on('$destroy', function () {

    });

    /** endregion: Listener **/


    /** region: Controller Function **/

    /* generic state based navigation interface */
    $scope.GotoState = function (statename, param) {

        /** paramname should match with your state url dynamic segment.[ url: "/stateurlsegment/:paramname" ] ex: $stateProvider.state('LienDetail', { url: "/liendetail/:id" }) **/
        $stateParams.orderid = param;

        $state.go(statename, $stateParams);
    };

    /** endregion: Controller Function **/
        
    $scope.GetWeather = function () {

        HomeService.getweather('farmingtonhills',
            function (successresponse) {

                $scope.WeatherNow1 = successresponse.data;

                $scope.LastUpdatedOn = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
            },
            function (failureresponse) {

            },
            function (alwaysresponse) {

            },
            null,
            '');

        HomeService.getweatherforecast('farmingtonhills',
            function (successresponse) {

                $scope.WeatherForecast1 = successresponse.data;

                $scope.WeatherForecast1.list.splice(0, 1);

                $scope.LastUpdatedOn = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
            },
            function (failureresponse) {

            },
            function (alwaysresponse) {

            },
            null,
            '');

        HomeService.getweather('chennai',
            function (successresponse) {

                $scope.WeatherNow2 = successresponse.data;

                $scope.LastUpdatedOn = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
            },
            function (failureresponse) {

            },
            function (alwaysresponse) {

            },
            null,
            '');

        HomeService.getweatherforecast('chennai',
            function (successresponse) {

                $scope.WeatherForecast2 = successresponse.data;

                $scope.WeatherForecast2.list.splice(0, 1);

                $scope.LastUpdatedOn = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
            },
            function (failureresponse) {

            },
            function (alwaysresponse) {

            },
            null,
            '');
    };

    $scope.RandomBackground = function () {
        $http({
            method: "GET",
            header: {
                'Content-Type': "application/json",
            },
            url: "https://api.unsplash.com/photos/random/?client_id=Cr3UlMX90pb9sWBy6ym0RjjbUs2J-dFN4QIcRA_FCq4",
        }).then(function (res) {
            //var totalFound = res.data.length;

            var full = res.data.urls.full;
            var regular = res.data.urls.regular;
            var raw = res.data.urls.raw;
            var small = res.data.urls.small;
            var thumb = res.data.urls.thumb;

            $scope.photo = {
                full: full,
                regular: regular,
                raw: raw,
                small: small,
                thumb: thumb
            };
        },
        function (res) {
            console.log('error', res);
        });
    };

    $scope.GetRssFeed = function () {

        HomeService.getrssfeed('https://www.zdnet.com/us/rss.xml',
            function (successresponse) {
                var i
                for (i = 0; i < successresponse.data.items.length; i++) {
                    successresponse.data.items[i].title = successresponse.data.items[i].title.replace('&amp;', '&');
                    successresponse.data.items[i].content = successresponse.data.items[i].content.replace('&amp;', '&');
                } 

                $scope.RssData = successresponse.data;

                $scope.LastUpdatedOn = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');

                $scope.RssDataReady = true;
            },
            function (failureresponse) {

            },
            function (alwaysresponse) {

            },
            null,
            '');

        HomeService.getrssfeed('https://www.nasdaq.com/feed/rssoutbound?category=Stocks',
            function (successresponse) {
                var i;
                for (i = 0; i < successresponse.data.items.length; i++) {
                    successresponse.data.items[i].title = successresponse.data.items[i].title.replace('&amp;', '&');
                    successresponse.data.items[i].content = successresponse.data.items[i].content.replace('&amp;', '&');
                } 

                $scope.RssDataStock = successresponse.data;

                $scope.LastUpdatedOn = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');

                $scope.RssDataReady = true;
            },
            function (failureresponse) {

            },
            function (alwaysresponse) {

            },
            null,
            '');
    };
}]);