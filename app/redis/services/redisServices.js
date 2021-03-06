﻿exports.register = function(module) {
    'use strict';
    module
        .factory('$redisClientFactory', function() {
            var clientFactory =
                require('../model/redisClientFactory.js').createClient;
            return clientFactory;
        })
        .factory('$redisScanner', function() {
            return require('redisscan');
        })
        .factory('$redisSettings', function (appSettings, Notification) {
            return require('../model/redisSettings.js').create(appSettings, Notification);
        })
        .factory('$redisDataAccess', [
            '$activeDatabase', '$redisClientFactory', '$redisSettings', '$messageBus',
            function($activeDatabase, $redisClientFactory, $redisSettings, $messageBus) {
                return require('../model/redisDataAccess.js').create($activeDatabase, $redisClientFactory, $redisSettings, $messageBus);
            }
        ])
        .factory('$activeDatabase', [
            function() {
                return require('../model/activeDatabase.js').create();
            }
        ])
        .factory('$baseRepo', [
            '$redisDataAccess', '$utils',
            function($redisDataAccess, $utils) {
                return require('../model/baseRepository.js').create($redisDataAccess, $utils);
            }
        ])
        .factory('$stringRepo', [
            '$baseRepo', '$redisDataAccess',
            function($baseRepo, $redisDataAccess) {
                var stringRepo = require('../model/stringRepository.js').create($redisDataAccess);
                angular.extend(stringRepo, $baseRepo);
                return stringRepo;
            }
        ])
        .factory('$setRepo', [
            '$baseRepo', '$redisDataAccess',
            function($baseRepo, $redisDataAccess) {
                var setRepo = require('../model/setRepository.js').create($redisDataAccess);
                angular.extend(setRepo, $baseRepo);
                return setRepo;
            }
        ])
        .factory('$hashSetRepo', [
            '$baseRepo', '$redisDataAccess',
            function($baseRepo, $redisDataAccess) {
                var hashRepo = require('../model/hashRepository.js').create($redisDataAccess);
                angular.extend(hashRepo, $baseRepo);
                return hashRepo;
            }
        ])
        .factory('$redisRepositoryFactory', [
            '$stringRepo', '$setRepo', '$hashSetRepo',
            function($stringRepo, $setRepo, $hashSetRepo) {
                return require('../model/redisRepositoryFactory.js').create($stringRepo, $setRepo, $hashSetRepo);
            }
        ])
        .factory('redisRepo', [
            '$baseRepo', '$redisDataAccess', '$redisRepositoryFactory', 'Notification',
            function ($baseRepo, $redisDataAccess, $redisRepositoryFactory, Notification) {
                var redisRepo = require('../model/redisRepository.js').create($redisDataAccess, $redisRepositoryFactory, Notification);
                angular.extend(redisRepo, $baseRepo);
                return redisRepo;
            }
        ])
        .factory('$redisScannerFactory', [
            '$redisDataAccess', '$redisScanner',
            function($redisDataAccess, $redisScanner) {
                return require('../model/redisScannerFactory.js').create($redisDataAccess, $redisScanner);
            }
        ])
        .factory('dialog', [
            function() {
                var remote = require('remote');
                var dialog = remote.require('dialog');
                return dialog;
            }
        ]);
}