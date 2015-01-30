/*
	Author Name: MIVIM IT Solution Pvt. Ltd.
	Creation Date: 26/12/2014

*/
$(document).ready(function(){

	//Actions at page load============================================================
	$(".fos-nav-brand").css("display","none");


  //================================================================================
	
	
    //Scroll to top button action
	
	
    $(window).scroll(function(){
      if ($(this).scrollTop() > 200) {
        $('.fos-scrollToTop').fadeIn();
      } else {
        $('.fos-scrollToTop').fadeOut();
      }
    }); 
    //Click event to scroll to top
    $('.fos-scrollToTop').click(function(){
      $('html, body').animate({scrollTop : 0},2000);
      return false;
    });

    //Sub Header and Logo switching

    $(window).scroll(function(){
        var posFromTop = $(window).scrollTop();

        if(posFromTop > 200){
          $("#fos-topNav").fadeOut(500);
          $(".navbar-fixed-top").addClass("fos-shadow-class");
          $(".fos-nav-brand").fadeIn(500);
        } else {
          $("#fos-topNav").fadeIn(300);
          $(".navbar-fixed-top").removeClass("fos-shadow-class");
          $(".fos-nav-brand").fadeOut(500);
        }
    });

    //Video demo active marker

    $(".fos-details").click(function () {
        $(".fos-details").removeClass("fos-active-video");
        $(this).addClass("fos-active-video");
    });

    /*Main Menu active switching*/

    $("#fos-primary-nav-wrap ul li").click(function () {
        $("#fos-primary-nav-wrap ul li").removeClass("fos-current-menu-item");
        $(this).addClass("fos-current-menu-item");
    });


  /*Smooth Scrolling*/
  if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
  window.onmousewheel = document.onmousewheel = wheel;
  function wheel(event) {
        var delta = 0;
        if (event.wheelDelta) delta = event.wheelDelta / 120;
        else if (event.detail) delta = -event.detail / 3;

        handle(delta);
        if (event.preventDefault) event.preventDefault();
        event.returnValue = false;
  }

  function handle(delta) {
      var time = 1500;
    var distance = 600;
      
      $('html, body').stop().animate({
          scrollTop: $(window).scrollTop() - (distance * delta)
      }, time );
  }

  /*Phone number Validation*/
  $("#phone-number").intlTelInput({
    autoFormat: true,
    //autoHideDialCode: false,
    defaultCountry: "in",
    //nationalMode: true,
    //numberType: "MOBILE",
    //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do','in'],
    //preferredCountries: ['cn', 'jp'],
    responsiveDropdown: true,
    utilsScript: "lib/libphonenumber/build/utils.js"
    });

  /*Reg. form field creation*/
  $('input[name="user-type"]').change(function() {
      var selValue = $('input[name="user-type"]:checked').val(); 
      var corporate = $(".fos-user-type-corp div.fos-header-marker");
      var individual = $(".fos-user-type-indiv div.fos-header-marker");
      var wrapper_company = $('#fos-company');
      var wrapper_title = $('#fos-company-title');
      var companyName_label = $('#fos-company label');
      var companyName_input = $('#fos-company input');
      var companyTitle_label = $('#fos-company-title label');
      var companyTitle_input = $('#fos-company-title input');
      
      if(selValue=="indiv"){
        corporate.removeClass  ("fos-active-user-type");
        corporate.addClass  ("fos-inactive-user-type");
        individual.removeClass ("fos-inactive-user-type");
        individual.addClass ("fos-active-user-type");
        wrapper_company.detach();
        wrapper_title.detach();
        
      }else{
        individual.removeClass ("fos-active-user-type");
        individual.addClass ("fos-inactive-user-type");
        corporate.removeClass  ("fos-inactive-user-type");
        corporate.addClass  ("fos-active-user-type");
        location.reload();
      }
    });
    function readURL(input) {
              if (input.files && input.files[0]) {
                  var reader = new FileReader();
                  
                  reader.onload = function (e) {
                      $('#buyer-logo').attr('src', e.target.result);
                  }
                  
                  reader.readAsDataURL(input.files[0]);
              }
          }
    
          $("#uploadBtn").change(function(){
              readURL(this);
    });

    /* Loged in User Menu switching*/
    $('.fos-user-profile').click(function(){

      $('.fos-seller-notification ul ul').fadeToggle(300);

    });
  
    /* Displaying selected file name java script version*/
   /* document.getElementById("uploadBtn").onchange = function () {
        document.getElementById("uploadFile").value = this.value; 
    };*/
});