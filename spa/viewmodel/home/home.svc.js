'use strict';

/* Setup HomeListing SINGLETON Service
* @ApiService {}: SINGLETON Service to hanlde api http requests
* @AppSettings {}: SINGLETON Service hold app specific settings
*/
RssApp.service('HomeService', ['AppSettings', 'ApiService', function (AppSettings, ApiService) {

    /** Capturing the VendorOrderDashboard SINGLETON Service intance **/
    var service = this;

    service.getweather = function (data, success, failure, always, successmessage, failuremessage) {
        if (data === 'farmingtonhills') {
            ApiService.get('https://openweathermap.org/data/2.5/weather/?appid=b6907d289e10d714a6e88b30761fae22&id=4992523&units=imperial', success, failure, always, successmessage, failuremessage);
        }
        else if (data === 'chennai') {
            ApiService.get('https://openweathermap.org/data/2.5/weather/?appid=b6907d289e10d714a6e88b30761fae22&id=1264527&units=imperial', success, failure, always, successmessage, failuremessage);
        }
    };

    service.getweatherforecast = function (data, success, failure, always, successmessage, failuremessage) {
        if (data === 'farmingtonhills') {
            ApiService.get('https://openweathermap.org/data/2.5/forecast/daily/?appid=b6907d289e10d714a6e88b30761fae22&id=4992523&units=imperial', success, failure, always, successmessage, failuremessage);
        }
        else if (data === 'chennai') {
            ApiService.get('https://openweathermap.org/data/2.5/forecast/daily/?appid=b6907d289e10d714a6e88b30761fae22&id=1264527&units=imperial', success, failure, always, successmessage, failuremessage);
        }
    };

    service.getrssfeed = function (data, success, failure, always, successmessage, failuremessage) {
        ApiService.jsonp('https://api.rss2json.com/v1/api.json?callback=JSON_CALLBACK&rss_url=' + encodeURIComponent(data), success, failure, always, successmessage, failuremessage);
    };
}]);