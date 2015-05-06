﻿exports.create = function ($rootScope) {
    'use strict';

    return new function() {
        var self = this;
        self.IsBusy = false;
        self.Operations = {};
        self.setIsBusy = function (operation, value) {
            self.IsBusy = value;
            
            self.Operations[operation] = value;

            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        }

        self.getIsBusy = function (operation) {
            if (self.Operations[operation] === null || self.Operations[operation] === undefined) {
                self.Operations[operation] = false;
            }

            return self.Operations[operation];
        }
    }
};