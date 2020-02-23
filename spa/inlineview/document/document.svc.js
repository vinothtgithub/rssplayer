'use strict';

/* Setup actionrequiredListing SINGLETON Service
* @ApiService {}: SINGLETON Service to hanlde api http requests
* @AppSettings {}: SINGLETON Service hold app specific settings
*/
ClientPortalApp.service('DocumentService', ['AppSettings', 'DocumentCollectionService', function (AppSettings, DocumentCollectionService) {

    /** Capturing the SINGLETON Service intance **/
    var service = this;

    /* Api Service Function expects collection to be retreived
    * @data {}: parameter value to be passed for identification
    * @success {}: js Callback function reference to handle success response
    * @failure {}: js Callback function reference to handle failure response
    * @always {}: js Callback function reference to handle always response
    * @successmessage {}: user friendly message to display after success response, if any
    * @failuremessage {}: user friendly message to display after failure response, if any
    */
    service.getcontextitems = function (data, success, failure, always, successmessage, failuremessage) {
        DocumentCollectionService.getcontextitems(data, success, failure, always, successmessage, failuremessage);
    };

}]);