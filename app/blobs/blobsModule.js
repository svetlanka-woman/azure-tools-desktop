﻿exports.register = function (angular, angularRoute) {
    'use strict';

    var tablesModule = angular.module('tiles.blobs', [angularRoute]);
    require('./services/blobsServices.js').register(tablesModule);

    tablesModule.factory('blobsPresenter', [
        function () {
            return require('./presenter/blobsPresenter.js').create();
        }
    ]);

    require('./viewModel/blobsViewModel.js').register(tablesModule);
    tablesModule.factory('blobsSettings', ['appSettings', 'Notification',function (appSettings, Notification) {
        return require('./model/blobsSettings.js').create(appSettings, Notification);
    }]);
    tablesModule
       .config(function ($stateProvider) {
           $stateProvider
               .state('blobs', {
                   url: '/blobs',
                   templateUrl: 'blobs/view/index.html',
                   controller: 'BlobsController',
                   params: {
                       seq: {}
                   }
               });
       });
}