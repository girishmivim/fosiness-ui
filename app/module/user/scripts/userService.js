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
	Creation Date: 29/01/2015

*/
(function(ng) {
	'use strict';

	ng.module('fosUserModule')	
	.factory('userFactory', [ '$http','$q', function($http,$q) {
		var userFactory = {};
		var registerUserUrl = '/fosiness-web/services/user/registeruser';
		var captchaSiteVerificationUrl='/fosiness-web/services/recaptcha/verifyRecapchResponse';
		userFactory.registerUser = function(user) {
			var deferred = $q.defer();
			var promise= $http.post(registerUserUrl, user);
			promise.then(function(response){
				var result = response.data.messages[0].description;
				deferred.resolve(result);
				});
			return deferred.promise;
		};
		
		/* Recaptcha Verification Start*/

		userFactory.verifyCaptcha = function(response){	
		    return $http.get(captchaSiteVerificationUrl,{
		           params : {"response" : response }
		            });
		};

		/* Recaptcha Verification End*/

		return userFactory;
	} ]);

}(angular));