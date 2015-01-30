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
	Creation Date: 28/01/2015

 */

/*global angular */

(function(ng) {
	'use strict';

	ng.module('fosUserModule')
	/**
	 * User registration controller
	 */
	.controller('fos.registration.userRegistrationCtrl',
	    ['$scope', 'userFactory','vcRecaptchaService', function($scope,userFactory,vcRecaptchaService) {
		$scope.operationStatus = {
		    regSuccess : false,
		    regFailur : true,
		    captchaFail : false,
		    message : ""
		};
		$scope.submitUserForm = function() {
		    var user = $scope.user;
		        $scope.user.type = 'admin';
		        userFactory.registerUser(user)
		        .then(function(data){
		        	$scope.operationStatus.message = data;
		        	 $scope.operationStatus.regSuccess = true;
				        $scope.operationStatus.regFailur = false;
		        });
		      

		  
		};
		/* Recaptcha Starts Here */
		$scope.captchaData = {
				response : null,
				widgetId : null,
			   
			};	   
	      $scope.model = {
	        key: '6LdvuAATAAAAAK3e6NjAQ1SQczDBBARw_2d0VXo6'
	    };

	    $scope.setResponse = function (response) {
	        console.info('Response available');
	        $scope.captchaData.response = response;
	    };

	    $scope.setWidgetId = function (widgetId) {
	        console.info('Created widget ID: %s', widgetId);
	        $scope.captchaData.widgetId = widgetId;
	    };
	   
	    console.log('sending the captcha response to the server', $scope.response);
	    $scope.verifyCaptchaAndSubmitFrom= function (){
	    	  var response=$scope.captchaData.response;    	 
	    	  userFactory.verifyCaptcha(response)
	      .success(function(data, status, headers, config) {	
	    	  console.log('Validation of captcha success');
	 	    	   $scope.submitUserForm();         
	       })
	      .error(function(data, status, headers, config) {     
	    	 console.log('Failed to validation of captcha');
	    	 $scope.operationStatus.message = data.messages[0].description;
	    	 $scope.operationStatus.captchaFail=true;
	    	// In case of a failed validation you need to reload the captcha
	         // because each response can be checked just once
	    	 vcRecaptchaService.reload($scope.captchaData.widgetId);
	    }); 
	    };
	    	
		/* Recaptcha Ends Here */

		

	}]);

}(angular));