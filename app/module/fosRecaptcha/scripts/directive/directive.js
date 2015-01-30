/*
 * Copyright &#169; 2014-2015 Mivim IT Solutions.  All Rights Reserved.
 * 
 * Confidential, Proprietary and Trade Secrets Notice
 * 
 * Use of this software is governed by a license agreement. This software
 * contains confidential, proprietary and trade secret information of
 * Mivim IT Solutions. and is protected under India and
 * international copyright and other intellectual property laws. Use, disclosure,
 * reproduction, modification, distribution, or storage in a retrieval system in
 * any form or by any means is prohibited without the prior express written
 * permission of Mivim IT Solutions.
 * 
 * Mivim IT Solutions.
 * India
 * 
 * 
	Author Name: Ramesh Papaganti.
	Creation Date: 22/01/2015

*/
/*global angular, Recaptcha */
(function (ng) {
    'use strict';

    function throwNoKeyException() {
        throw new Error('You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create');
    }

    var app = ng.module('vcRecaptcha');

    app.directive('vcRecaptcha', ['$timeout', 'vcRecaptchaService', function ($timeout, vcRecaptcha) {

        return {
            restrict: 'A',
            require: "?^^form",
            scope: {
                response: '=?ngModel',
                key: '=',
                theme: '=?',
                onCreate: '&',
                onSuccess: '&',
                onExpire: '&'
            },
            link: function (scope, elm, attrs, ctrl) {
                if (!attrs.hasOwnProperty('key')) {
                    throwNoKeyException();
                }

                scope.widgetId = null;

                var removeCreationListener = scope.$watch('key', function (key) {
                    if (!key) {
                        return;
                    }

                    if (key.length !== 40) {
                        throwNoKeyException();
                    }

                    var callback = function (gRecaptchaResponse) {
                        // Safe $apply
                        $timeout(function () {
                            if(ctrl){
                                ctrl.$setValidity('recaptcha',true);
                            }
                            scope.response = gRecaptchaResponse;
                            // Notify about the response availability
                            scope.onSuccess({response: gRecaptchaResponse, widgetId: scope.widgetId});
                        });

                        // captcha session lasts 2 mins after set.
                        $timeout(function (){
                            if(ctrl){
                                ctrl.$setValidity('recaptcha',false);
                            }
                            scope.response = "";
                            // Notify about the response availability
                            scope.onExpire({widgetId: scope.widgetId});
                        }, 2 * 60 * 1000);
                    };

                    vcRecaptcha.create(elm[0], key, callback, {

                        theme: scope.theme || attrs.theme || null

                    }).then(function (widgetId) {
                        // The widget has been created
                        if(ctrl){
                            ctrl.$setValidity('recaptcha',false);
                        }
                        scope.widgetId = widgetId;
                        scope.onCreate({widgetId: widgetId});
                    });

                    // Remove this listener to avoid creating the widget more than once.
                    removeCreationListener();
                });
            }
        };
    }]);

}(angular));
