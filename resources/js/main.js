
$(function(){
    'use strict';

    // carousel demo
    $('#myCarousel').carousel();

    $('#trailApply').on('shown', refreshCaptcha );
    $('#captcha-img').on('click', refreshCaptcha );
    $('.fa-refresh').on('click', refreshCaptcha );

    function refreshCaptcha(){
      $.ajax('captcha')
      .done(function(data) {
          if (data) {
            var obj = JSON.parse(data);
            if (obj && obj.id && obj.image) {
              $('#captcha-img').attr('src', obj.image);
              $("#verifyHush").val(obj.id);
            }
          }
      });

      $("#btn-submit").addClass("disabled");
      $('#input-code').val("");
    };


    $('#input-code').on('keyup', function(ev) {
        var value = $("#input-code").val();
        if (value.length === 6) {
            if (value && verifyCaptcha(value)) {
                $('#btn-submit').removeClass('disabled');
            } else {
                $('#btn-submit').addClass('disabled');
                $('#input-code').addClass("error-code");
            }
        } else {
            $('#btn-submit').addClass('disabled');
            $('#input-code').removeClass("error-code");
        }
    });

    var verifyCaptcha = function(input) {
      if (CryptoJS.MD5(input + "SAPAnywhere").toString() === $("#verifyHush").val()) {
        return true;
      }
    };

    $(window).on("scroll", function(){
        var windowHeight = window.innerHeight;
        $("img.lazy-fading:not(.show)").each(function(i, dom){
            var rect = dom.getClientRects()[0];
            if (rect.top > -rect.height && rect.top < windowHeight) {
              $(dom).addClass("show");
            }

        });
    });
    $(window).trigger("scroll");

    $('.button-try').on('click', function (e) {
        $("#trailApply").modal("show");
    });



        // jcps.fader(300, '#switcher-panel');

        // $('a#profile1').click(function(e) {
        //     $('a#profile1 img').attr('src', '/static/img_fiori/profile1-active.png');
        //     $('a#profile1 img').attr('data-at2x', '../img_fiori/profile1-active@2x.png');

        //     $('#profile1-content').show();
        //     $('#profile2-content').hide();
        //     $('#profile3-content').hide();
        //     $('#profile4-content').hide();

        //     $("#profile1-content video")[0].play();
        //     $("#profile2-content video")[0].pause();
        //     $("#profile2-content video")[0].currentTime = 0;
        //     $("#profile3-content video")[0].pause();
        //     $("#profile3-content video")[0].currentTime = 0;
        //     $("#profile4-content video")[0].pause();
        //     $("#profile4-content video")[0].currentTime = 0;
        // });

        // $('a#profile2').click(function(e) {
        //     $('a#profile2 img').attr('src', '/static/img_fiori/profile2-active.png');
        //     $('a#profile2 img').attr('data-at2x', '../img_fiori/profile2-active@2x.png');

        //     $('#profile1-content').hide();
        //     $('#profile2-content').show();
        //     $('#profile3-content').hide();
        //     $('#profile4-content').hide();

        //     $("#profile1-content video")[0].pause();
        //     $("#profile1-content video")[0].currentTime = 0;
        //     $("#profile2-content video")[0].play();
        //     $("#profile3-content video")[0].pause();
        //     $("#profile3-content video")[0].currentTime = 0;
        //     $("#profile4-content video")[0].pause();
        //     $("#profile4-content video")[0].currentTime = 0;
        // });

        // $('a#profile3').click(function(e) {
        //     $('a#profile3 img').attr('src', '/static/img_fiori/profile3-active.png');
        //     $('a#profile3 img').attr('data-at2x', '../img_fiori/profile3-active@2x.png');

        //     $('#profile1-content').hide();
        //     $('#profile2-content').hide();
        //     $('#profile3-content').show();
        //     $('#profile4-content').hide();

        //     $("#profile1-content video")[0].pause();
        //     $("#profile1-content video")[0].currentTime = 0;
        //     $("#profile2-content video")[0].pause();
        //     $("#profile2-content video")[0].currentTime = 0;
        //     $("#profile3-content video")[0].play();
        //     $("#profile4-content video")[0].pause();
        //     $("#profile4-content video")[0].currentTime = 0;
        // });

        // $('a#profile4').click(function(e) {
        //     $('a#profile4 img').attr('src', '/static/img_fiori/profile4-active.png');
        //     $('a#profile4 img').attr('data-at2x', '../img_fiori/profile4-active@2x.png');

        //     $('#profile1-content').hide();
        //     $('#profile2-content').hide();
        //     $('#profile3-content').hide();
        //     $('#profile4-content').show();

        //     $("#profile1-content video")[0].pause();
        //     $("#profile1-content video")[0].currentTime = 0;
        //     $("#profile2-content video")[0].pause();
        //     $("#profile2-content video")[0].currentTime = 0;
        //     $("#profile3-content video")[0].pause();
        //     $("#profile3-content video")[0].currentTime = 0;
        //     $("#profile4-content video")[0].play();
        // });

        // $('#mainHero').videoBG({
        //     webm: 'https://experience.sap.com/videos/SAPFiori_0510_notext.webm',
        //     mp4: 'https://experience.sap.com/videos/SAPFiori_0510_notext.mp4',
        //     ogv: 'https://experience.sap.com/videos/SAPFiori_0510_notext.ogv',
        //     autoplay: true,
        //     loop: true,
        //     poster: '/static/img_fiori/fiori-teaser-ohneText.jpg',
        //     scale: true,
        //     zIndex: 1000
        // });




});

