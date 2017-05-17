$(document).ready(function() {
    
    play = $('.play');
	pause = $('.pause');
	mute = $('.mute');
	muted = $('.muted');
	audio = 'http://93.75.217.95:8000/';
	song = new Audio(audio);
	vol = $('.volume');

    
    $('.player').on('click', '.play', function(e) {
		e.preventDefault();
		theVolume = vol.val()
// 		song.volume = .5;
		song.play();
	});
	
	$('.player').on('click', '.pause', function(e) {
		e.preventDefault();
		song.pause();
	});
	
	$('.player').on('click', '.mute', function(e) {
		e.preventDefault();
		song.volume = 0;
	});
    
    var theVolume;
    $('.player').on('click', '.muted', function(e) {
		e.preventDefault();
// 		theVolume = vol.val();
// 		song.volume = curVolume / 100;
		song.volume = theVolume / 100;
	});
    
    var curVolume;
    $('.player').on('change', '.volume', function(e) {
		e.preventDefault();
		curVolume = this.value;
		song.volume = curVolume / 100;
	});
 
    $(".big").click(function() {
        if($(".play, .pause").hasClass("on")) {
            $(".play, .pause").removeClass("on")
        } else {
            $(".play, .pause").addClass("on")
        }
    });
    
    $(".right").click(function() {
        if($(".mute, .muted").hasClass("on")) {
            $(".mute, .muted").removeClass("on")
        } else {
            $(".mute, .muted").addClass("on")
        }
    });



    $('nav ul li').click(function(){
        $('nav ul li').removeClass('active');
        $(this).addClass('active');
    });
    
    function changeBg() {
    var imgCount = 0;
    var img_array = [
        
        "http://imgur.com/zUuYI7A.jpg",
        "http://imgur.com/hCWiquW.jpg",
        "http://imgur.com/vsVMpJw.jpg",
        "http://imgur.com/EYnSPwY.jpg",
        "http://imgur.com/a4laEGW.jpg",
        "http://imgur.com/SaDD8dL.jpg",
        "http://imgur.com/UhMEDHc.jpg",

        ],
        _nxtIndex = 0,
        _curIndex = 0,
        interval = 15000;

    function nextIndex() {
        _nxtIndex = (_nxtIndex + 1) % img_array.length;
        return _nxtIndex;
    };

    function shiftIndexes() {
        _curIndex = _nxtIndex;
        nextIndex();
    };

    function createImgTags(){
        imgCount = img_array.length;
        var html = '';
        var slider = document.getElementById('slider');
        for(var i=0; i<imgCount;i++){
            html +='<div id="background-slide'+i+'" class="background-slider"></div>';
        }
        $(slider).html(html);
    }
    function assignBackgrounds() {
        imgCount = img_array.length;  
        for (var i = 0; i < imgCount; i++) {

            $('#background-slide' + i).css('backgroundImage', function() {
                return 'url(' + img_array[nextIndex()] + ')';
            });
            if (i == 0) {
                $('#background-slide' + i).css('opacity', 1);
            } else {
                $('#background-slide' + i).css('opacity', 0);
            }
        }
    }

    function startBackgroundOpacityToggle() {
        elem = $('#background-slide' + _curIndex);
        elem.animate({
            opacity: (elem.css('opacity') == 0) ? 1 : 0
        }, {
            duration: 5000,
            start: finishBackgroundOpacityToggle
        });
    };

    function finishBackgroundOpacityToggle() {
        elem = $('#background-slide' + _nxtIndex);
        elem.animate({
            opacity: (elem.css('opacity') == 0) ? 1 : 0
        }, {
            duration: 5000,
            complete: runSlider
        });

    };

    function runSlider() {
        shiftIndexes();
        setTimeout(startBackgroundOpacityToggle, interval);
    };

    createImgTags();
    assignBackgrounds();
    runSlider();
    };
    changeBg();
    
    
    
    $(".navToggle").on("click", function(){
      $(this).toggleClass("open");
    $("#menu").toggleClass("active");
    });
    
    $('.nav li, .left-menu li, .mobile, #social li').click(function(){
        $('.nav li, .left-menu li, .mobile, #social li').removeClass('active');
        $(this).addClass('active');
    });
    
    $(".navToggle").on("click", function(){
        $(".track").toggleClass("loaded");
        $(".player").toggleClass("loaded");
        $(".menu-hide").toggleClass("show");
        $(".nav").toggleClass("open");
        $(".navToggle").toggleClass("open");
    });
    
    
    
    
    
    $(".left").click(function() {
        if($(".list, .list-on").hasClass("on")) {
            $(".list, .list-on").removeClass("on")
        } else {
            $(".list, .list-on").addClass("on")
        }
        $(".track-list").toggleClass("show");
        $(".social").toggleClass("loaded");
    });
    
    
    
    
    
    
    
    
    setTimeout(function () {
        $('.nav, .figure, .navToggle, .track, .player, .social').addClass('loaded');
    }, 0.500);
    
    
    $(".shareBtn").on("click", function(){
        if($(".add-button").hasClass("show")) {
            $(".add-button").removeClass("show")
        } else {
            $(".add-button").addClass("show")
        }
    });
    
    
    function radioTitle() {
		var url = 'http://93.75.217.95:8000/json.xsl';
		$.ajax({
			type: 'GET',
			url: url,
			acync: true,
			jsonpCallback: 'parseMusic',
			contentType: "application/json",
			dataType: 'jsonp',
			success: function (json) {
				$('#track marquee').text(json["/listen"].title);
				$('#track-title').text(json["/listen"].title);
				$('#listeners').text(json["/listen"].listeners);
			},
			error: function (e) {
				// alert(e.message);
			}
		});
	}
	
	function upDate() {
		setTimeout(function() {
			radioTitle();
		}, 20000);
		setInterval(function() {
			radioTitle();
		}, 1500);
	}
	upDate();


	$(".add-like").on("click", function(e){
	    if($(this).hasClass("liked")) {
            $(this).removeClass("liked")
            $(this).addClass("un-liked")
        } else {
            $(this).removeClass("un-liked")
            $(this).addClass("liked")
            
        }
        var likeClasses = this.classList;
        var likeStatus = likeClasses[2];
            // alert(likeClasses.length + " " + likeClasses[2]);
	    
        $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
            
            $.ajax({
    	        type: "POST",
    	    	url: 'https://formspree.io/volodymyr.khvesyk@gmail.com',
    	        dataType: "JSON",
    	        data: {like: likeStatus, user: data},
    	        success: function (data, status) {
    	        },
    	        error: function (xhr, desc, err) {
    				alert("error"+ err.status + " " + err.statusText);
    	        }
    	    });
        });
	});
	
  
    $('.share-button').on('click', function() {
        $(this).addClass('open');
        $(document).on("click", function(e){
            if ($(e.target).closest(".share-button").length == 0) {
                $('.share-button').removeClass('open');
            }
        });
    });
    
    $('.find-button').on('click', function() {
        $(this).addClass('open');
        $(document).on("click", function(e){
            if ($(e.target).closest(".find-button").length == 0) {
                $('.find-button').removeClass('open');
            }
        });
    });
    
    $(".share-item").on('click', function() {
        
        $('.share-button').addClass('shared');
        setTimeout(function() {
            $('.share-button').addClass('thankyou');
        }, 800);
        setTimeout(function() {
            $('.share-button').removeClass('open');
            $('.share-button').removeClass('shared');
            $('.share-button').removeClass('thankyou');
        }, 2500);
    });


    $('.vk-share').on('click', function() {
        cache: false;
        var track = $('#track marquee').text();
        var image = $('#track-image img').attr('src');

        if (track != 'Misto FM') {
        }

        track = encodeURIComponent(track);
        image = encodeURIComponent(image);
        if (image === 'undefined') {
            image = 'http://remake-vovax.c9users.io/images/logo/logo.png';
        }

        var tex = "http://vkontakte.ru/share.php?url=http://remake-vovax.c9users.io";
        var tex3 = encodeURIComponent("Мне нравится ");
        var tex4 = encodeURIComponent(" на Misto FM Deep");
        var tex5 = encodeURIComponent("");

        var link_text = tex + "&title=" + tex3 + track + tex4 + "&description=" + tex5 + "&image=" + image + "&noparse=1";
        window.open(link_text, 'popup', 'width=640,height=520')

    });
    
    $(".vk-find").on('click', function() {
        cache: false;
        var name = $('#track marquee').text();
        var image = $('#track-image img').attr('src');

        if(name!='Misto FM') {
                            
        }

        name = encodeURIComponent(name);
        image = encodeURIComponent(image);
        if (image === 'undefined') { image = 'http://remake-vovax.c9users.io/images/logo/logo.png'; }

        var ttt = "http://vk.com/audio?q=";  
        var link_text = ttt+name;
        
        window.open(link_text,'_blank')

    });
    
    $('.find-button').on('click', function() {
        $(this).addClass('open');
        $(document).on("click", function(e){
            if ($(e.target).closest(".find-button").length == 0) {
                $('.find-button').removeClass('open');
            }
        });
    });
    
    
    $(".find-item").on('click', function() {
        
        $('.find-button').addClass('found');
        setTimeout(function() {
            $('.find-button').removeClass('open');
            $('.find-button').removeClass('found');
        }, 500);
    });
    
    
    $(".utube-find").on('click', function() {
        cache: false;
        var name = $('#track marquee').text();
        var image = $('#track-image img').attr('src');

        if(name!='Misto FM') {
                            
        }

        name = encodeURIComponent(name);
        image = encodeURIComponent(image);
        if (image === 'undefined') { image = 'http://remake-vovax.c9users.io/images/logo/logo.png'; }

        var ttt = "https://www.youtube.com/results?search_query=";  
        var link_text = ttt+name;
        
        window.open(link_text,'_blank')

    });
    
   

});