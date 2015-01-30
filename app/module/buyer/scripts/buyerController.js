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
	.controller('fos.registration.buyerRegistrationCtrl',['$scope','buyerFactory','sectorFactory', function($scope,buyerFactory,sectorFactory) {
	
	
	$scope.sectors=[];
	$scope.subsectors=[];
	
	sectorFactory.getSectors().then(function(sectors){
		$scope.sectors=sectors;
		console.log('get sectors successful. '+sectors[0].id);
	   })
	$scope.loadSubsectors = function(){
		
		var sectorid = $scope.buyer.selectedSector.id;
		console.log('selected sector id is :: '+sectorid);
		sectorFactory.loadSubsectors(sectorid).then(function(subsectors){
			$scope.subsectors=subsectors;
		})
		
	};
	
	
	$scope.submitBuyerForm = function(){
		$scope.operationStatus = {
			    regSuccess : false,
			    regFailur : true,
			    captchaFail : false,
			    message : ""
			};
		alert($scope.fileModel.logo);
		var file = $scope.fileModel.logo;
		var buyer = $scope.buyer;
		buyer.sectorId = $scope.buyer.selectedSector.id;
		buyer.subSectorId = $scope.buyer.selectedSubSector.id;	
		console.log('inside buyer form :: '+buyer);

		/**
		 * TODO : Girish.
		 * Remove the userId after implementing the login service
		 */
		buyer.userId = 'c7079882-941f-4569-baf8-b38a9f0c2753';
		buyer.selectedSector = undefined;
		buyer.selectedSubsector=undefined;
		buyerFactory.registerBuyer(file, buyer).then(function(data){
        	$scope.operationStatus.message = data;
        	$scope.operationStatus.regSuccess = true;
		    $scope.operationStatus.regFailur = false;
        })
	}
	}])
}(angular));