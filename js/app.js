/**
 * Created by Brandon on 8/27/2015.
 */

var searchApp = angular.module('search', []);

searchApp.constant('config', {
    limit: 24,
    sponsored: [ //This will be a way to make money on this, for temporary "stickies" in the results
        'caffeinewriter',
        'forceofhell775',
        'thebeardwhisperer',
        'theno1alex'
    ],
    client_id: 'kwt26b303n4vzix9ipdwytco8kqfa0q',
    default_profile_image: 'http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_300x300.png',
    random_terms: [
        'drunk',
        'fail',
        'minecraft',
        'learning',
        'hour',
        'beta',
        'extreme',
        'retro',
        'blind',
        'new',
        'league',
        'interact',
        'overwatch',
        'charity'
    ]
});

searchApp.controller('SearchController', ['$scope', '$http', 'config',
    function ($scope, $http, config) {
        $scope.search = {};
        $scope.liveStatus = {};
        $scope.default_profile_image = config.default_profile_image;
        $scope.getUrl = function (action) {
            $scope.type = $scope.search.type ? 'streams' : 'channels';
            switch (action) {
                case 'next':
                    $scope.url = $scope.links.next + '&callback=JSON_CALLBACK';
                    break;
                case 'prev':
                    $scope.url = $scope.links.prev + '&callback=JSON_CALLBACK';
                    break;
                default:
                    $scope.search.query = $scope.search.query || config.random_terms[Math.floor(Math.random() * config.random_terms.length)];
                    $scope.search.last = $scope.search.query;
                    $scope.url = 'https://api.twitch.tv/kraken/search/' + $scope.type + '?limit=' + config.limit + '&offset=0&q=' + encodeURIComponent($scope.search.query || 'random') + '&callback=JSON_CALLBACK&client_id=' + config.client_id;
                    break;
            }
        };
        $scope.doSearch = function (action) {
            $scope.getUrl(action);
            $http({
                method: 'JSONP',
                url: $scope.url
            })
                .success(function (data) {
                    ga('send', 'event', 'search', $scope.type, $scope.search.last);
                    $scope.channels = data[$scope.type];
                    $scope.links = data._links;
                });
        };

        $scope.feelingLucky = function () {
            $scope.search.query = config.random_terms[Math.floor(Math.random() * config.random_terms.length)];
            $scope.doSearch();
        };

        $scope.checkLive = function (channel) {
            $http({
                method: 'JSONP',
                url: 'https://api.twitch.tv/kraken/streams/' + encodeURIComponent(channel) + '?callback=JSON_CALLBACK&client_id=' + config.client_id
            })
                .success(function (data) {
                    console.log(data.stream);
                    if (data.stream !== null) {
                        $scope.liveStatus[channel.toLowerCase()] = true;
                    } else {
                        $scope.liveStatus[channel.toLowerCase()] = false;
                    }
                });

        };

        $scope.getChannel = function (channel) {
            $http({
                method: 'GET',
                url: 'https://api.twitch.tv/kraken/channels/' + encodeURIComponent(channel) + '?callback=JSON_CALLBACK&client_id=' + config.client_id
            })
                .success(function (data) {
                    $scope.channel[data.channel.name] = data.channel;
                });
        };

        $scope.getStreams = function () {
            var streams = Array.prototype.join.call(arguments, ',');
        };
        $scope.search.type = true;
        $scope.sponsoredStreams = config.sponsored;
        $scope.doSearch();
    }]);
