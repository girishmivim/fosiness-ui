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
	ng.module('sectorModule')
	.factory('sectorFactory', [ '$http','$q', function($http,$q) {
		var getSectorsUrl = '/fosiness-web/services/sector/getsectors';
		var getSubsectorsUrl = '/fosiness-web/services/sector/getsubsectors';
		return{
			getSectors : function(){
				 var deferred = $q.defer();
				 var promise= $http.get(getSectorsUrl);
				 promise.then(function(response){
						var result = response.data.sectors;
						deferred.resolve(result);
						});
					return deferred.promise;   
			},
			loadSubsectors : function(sectorId){
				 var deferred = $q.defer();
				var promise=  $http.get(getSubsectorsUrl,{
			           params : {sectorid : sectorId}
			       });
				promise.then(function(response){
					var result = response.data.subsectors;
					deferred.resolve(result);
					});
				return deferred.promise;  
	    	}
	}
	  }]);
}(angular));