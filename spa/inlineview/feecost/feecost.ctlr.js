'use strict';

/* Setup feecostListing SINGLETON Controller
    * @$rootScope {}:
    * @$scope {}: service instance which helps data binding btw view and controller
    * @$state {}: service instance which has current route state information
    * @$stateParams {}: service instance which has parameter values or query string values information
    * @$filter {}:
    * @$http {}: 
    * @$timeout {}:
    * @AppSettings {}: SINGLETON Service hold app specific settings
    * @feecostService {}: service instance which has GETLIST, GET, SAVE api call definition specific to this controller
*/
ClientPortalApp.controller('FeeCostController', ['$rootScope', '$scope', '$state', '$stateParams', '$filter', '$http', '$timeout', 'AppSettings', 'FeeCostService', function ($rootScope, $scope, $state, $stateParams, $filter, $http, $timeout, AppSettings, FeeCostService) {

    /** region: Initialization **/

    var successmessage;
    var failuremessage;

    $scope.viewContentLoadCompleted = false;

    $scope.LastUpdatedOn = '';

    $scope.ContextCriteria = {};
    $scope.Detail = {};

    /** endregion: Initialization **/

    /** region: Listener **/

    /** On Content Include Complete Listener **/
    $scope.$on('$includeContentLoaded', function () {
    });

    /** On Content Load Complete Listener **/
    $scope.$on('$viewContentLoaded', function () {

        $scope.OnLoad();
    });

    $scope.OnLoad = function (origin) {

        if (!$scope.viewContentLoadCompleted) {

            $scope.viewContentLoadCompleted = true;
            /** sample member definition and intialization **/
            $scope.ViewName = 'Attorney Fees and Costs';

            //$scope.ItemID = $stateParams.itemid;

            $scope.GetContext();
        };
    };

    /** On Content Unload Listener **/
    $scope.$on('$destroy', function () {

    });

    /** endregion: Listener **/


    /** region: Controller Function **/

    /** generic state based navigation interface **/
    $scope.GotoState = function (statename, param) {

        /** paramname should match with your state url dynamic segment.[ url: "/stateurlsegment/:paramname" ] ex: $stateProvider.state('LienDetail', { url: "/liendetail/:id" }) **/
        $state.params.paramname = param;

        $state.go(statename, $stateParams);
    };

    /** endregion: Controller Function **/

    $scope.Refresh = function () {

        $scope.GetContext();
    };

    $scope.GetContext = function () {

        FeeCostService.getcontextitems($scope.ContextCriteria,
            function (successresponse) {

                $scope.ItemSource = successresponse.data;

                $scope.LastUpdatedOn = $filter('date')(new Date(), 'MM/dd/yyyy hh:mm a');
            },
            function (failureresponse) {

            },
            function (alwaysresponse) {

            },
            null,
            '');
    };

    $scope.Go = function (param) {

        alert(param.Name);
    };

}]);