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

	ng.module('fosSellerModule')
/**
 * Seller registration controller
 */
.controller('fos.registration.sellerRegistrationCtrl',['$scope','sellerFactory','sectorFactory', function($scope,sellerFactory,sectorFactory) {
	$scope.sectors=[];
	$scope.subsectors=[];
	
	sectorFactory.getSectors().then(function(sectors){
		$scope.sectors=sectors;
		console.log('get sectors successful. '+sectors[0].id);
	   })
	$scope.loadSubsectors = function(){
		
		var sectorid = $scope.seller.selectedSector.id;
		console.log('selected sector id is :: '+sectorid);
		sectorFactory.loadSubsectors(sectorid).then(function(subsectors){
			$scope.subsectors=subsectors;
		})
		
	};

	$scope.submitSellerForm = function(){
		$scope.operationStatus = {
			    regSuccess : false,
			    regFailur : true,
			    captchaFail : false,
			    message : ""
			};
	   	
	   var seller = $scope.seller;
	   var file = $scope.fileModel.logo;
	   seller.sectorId = $scope.seller.selectedSector.id;
	   seller.subsectorId = $scope.seller.selectedSubsector.id;
	   /**
	    * TODO : Girish.
	    * Remove the userId after implementing the login service
	    */
	   seller.userId = '6878de80-1e72-45d0-8cda-e41d3eedcee5';
	   seller.selectedSector = undefined;
	   seller.selectedSubsector=undefined;
	   sellerFactory.registerSeller(file, seller).then(function(data){
		        	$scope.operationStatus.message = data;
		        	$scope.operationStatus.regSuccess = true;
				    $scope.operationStatus.regFailur = false;
		        })
	   	};
}])
}(angular));