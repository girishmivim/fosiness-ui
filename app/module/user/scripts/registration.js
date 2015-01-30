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
 

var fosRegistrationApp = angular.module('fosRegistrationApp', ['vcRecaptcha']);

/**
 * Custom directive to fetch the file as model attribute
 */
fosRegistrationApp.directive('fileModel', ['$parse', function ($parse) {
return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
};
}]);

/**
 * data factory which holds the rest service calls for user, buyer and seller
 * registration.
 */
fosRegistrationApp.factory('registrationDataFactory', ['$http', function($http){
var registrationDataFactory = {};
var getSectorsUrl = '/fosiness-web/services/sector/getsectors';
var getSubsectorsUrl = '/fosiness-web/services/sector/getsubsectors';
var registerUserUrl = '/fosiness-web/services/user/registeruser';
var registerSellerUrl = '/fosiness-web/services/seller/registerseller';
var registerBuyerUrl = '/fosiness-web/services/buyer/registerbuyer';
var captchaSiteverify='/fosiness-web/services/recaptcha/verifyRecapchResponse';
registrationDataFactory.registerUser = function(user){
    return $http.post( registerUserUrl, user);
};

registrationDataFactory.getSectors = function(){
    return $http.get(getSectorsUrl);
};

registrationDataFactory.getSubsectors = function(sectorId){
    return $http.get(getSubsectorsUrl,{
           params : {sectorid : sectorId}
       });
};

registrationDataFactory.registerSeller = function(file, seller){
    var formData = new FormData();
    formData.append('file', file);
    formData.append('seller', JSON.stringify(seller));
    return $http.post(registerSellerUrl, formData, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    });
};

registrationDataFactory.registerBuyer = function(file,buyer){
	var formData = new FormData();
	formData.append('file',file);
	formData.append('buyer',JSON.stringify(buyer));
	
	return $http.post(registerBuyerUrl,formData,{
		transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    });	
};

/* Recaptcha Verification Start*/

registrationDataFactory.verifyCaptcha = function(response){	
    return $http.get(captchaSiteverify,{
           params : {"response" : response          	   
                    }
                 
       });
};

/* Recaptcha Verification End*/

return registrationDataFactory;
}]);

/**
 * User registration controller
 */
fosRegistrationApp.controller('fos.registration.userRegistrationCtrl',
    ['$scope','$http', 'registrationDataFactory','vcRecaptchaService', function($scope, $http, registrationDataFactory,vcRecaptchaService) {
	$scope.operationStatus = {
	    regSuccess : false,
	    regFailur : false,
	    captchaFail : false,
	    message : ""
	};
	$scope.submitUserForm = function() {
	    var user = $scope.user;
	        $scope.user.type = 'admin';
	    registrationDataFactory.registerUser(user).
	    success(function(data, status, headers, config) {
	        $scope.operationStatus.message = data.messages[0].description;
	        $scope.operationStatus.regSuccess = true;
	        $scope.operationStatus.regFailur = false;

	    }).
	    error(function(data, status, headers, config) {
	        $scope.operationStatus.message = data.messages[0].description;
	        $scope.operationStatus.regSuccess = false;
	        $scope.operationStatus.regFailur = true;

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
    	 registrationDataFactory.verifyCaptcha(response)
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
/**
 * Seller registration controller
 */
fosRegistrationApp.controller('fos.registration.sellerRegistrationCtrl',['$scope', 
 '$http', 'registrationDataFactory', function($scope, $http, registrationDataFactory) {
    $scope.sectors = [];
    $scope.subsectors = [];
    registrationDataFactory.getSectors()
    .success(function (data, status, headers, config) {
       $scope.sectors = data.sectors;
    })
    .error(function(data, status, headers, config) {
       console.log('failed loading the sector service');
    });

	$scope.loadSubsectors = function(){
	   var sectorId = $scope.seller.selectedSector.id;
	   registrationDataFactory.getSubsectors(sectorId)
	   .success(function (data, status, headers, config) {
	       $scope.subsectors = data.subsectors;
	   })
	   .error(function(data, status, headers, config) {
	       console.log('failed loading the subsector service');
	   }); 
	};

	$scope.submitSellerForm = function(){
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
	   registrationDataFactory.registerSeller(file, seller)
	   .success(function (data, status, headers, config) {
		   alert(data.messages[0].description);
	   })
	   .error(function(data, status, headers, config) {
	       console.log('failed loading the sector service');
	   });
	};
}]);

/**
 * Buyer registration controller
 */
fosRegistrationApp.controller('fos.registration.buyerRegistrationCtrl',['$scope', 
                                                                         '$http', 'registrationDataFactory', function($scope, $http, registrationDataFactory) {
	alert(" inside fos.registration.buyerRegistrationCtrl .");
	
	$scope.sectors=[];
	$scope.subsectors=[];
	//debugger;
	registrationDataFactory.getSectors().success(function(data,status,headers,config){
		$scope.sectors = data.sectors;
		console.log('get sectors successful. '+data.sectors[0].id);
	}).error(function(data,status,headers,config){
		console.log('failed loading the sector service');
	});
	
	$scope.loadSubsectors = function(){
		//debugger;
		var sectorid = $scope.buyer.selectedSector.id;
		console.log('selected sector id is :: '+sectorid);
		registrationDataFactory.getSubsectors(sectorid).success(function(data,status,headers,config){
			$scope.subsectors=data.subsectors;
			
		}).error(function(data,status,headers,config){
			console.log('failed loading the subsector service');			
		});
		
	};
	
	
	$scope.submitBuyerForm = function(){
		var file = $scope.fileModel.logo;
		var buyer = $scope.buyer;
		buyer.sectorId = $scope.buyer.selectedSector.id;
		buyer.subSectorId = $scope.buyer.selectedSubSector.id;
		debugger;
		console.log('inside buyer form :: '+buyer);

		/**
		 * TODO : Girish.
		 * Remove the userId after implementing the login service
		 */
		buyer.userId = 'c7079882-941f-4569-baf8-b38a9f0c2753';


		buyer.selectedSector = undefined;
		buyer.selectedSubsector=undefined;
		registrationDataFactory.registerBuyer(file, buyer)
		.success(function (data, status, headers, config) {
			alert(data.messages[0].description);
		})
		.error(function(data, status, headers, config) {
			debugger;
			alert(data.messages[0].description);
			console.log('failed hitting registerBuyer service');
		});

	};
	
	
}]);


