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
	ng.module('buyerModule')
	.factory('buyerFactory', [ '$http','$q', function($http,$q) {
		var registerBuyerUrl = '/fosiness-web/services/buyer/registerbuyer';
		return{
			registerBuyer:  function(file, seller){
				var deferred = $q.defer();
			    var formData = new FormData();
			    formData.append('file', file);
			    formData.append('buyer', JSON.stringify(seller));
			    var promise= $http.post(registerBuyerUrl, formData,{
			        transformRequest: angular.identity,
			        headers: {'Content-Type': undefined}
			    }
			    );
			    promise.then(function(response){
					var result = response.data.messages[0].description;
					deferred.resolve(result);
					});
				return deferred.promise;   
			   
			},			
	    }		
	  }]);
	
}(angular));