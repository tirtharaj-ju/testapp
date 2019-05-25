var responseString = "";
var parseresponseJson = "";
var channelid = "";
var totalChannelCount = 2;
var channelIds = [5532, 4789, 3342, 4468];
$(window).on("load", function () {
    slick();
    //search();
    //createChannels();
    //createChannelHome();
    // $(".container-main").load("html/channel-home.html");
    $(document).on("click", '.channelIcon', function () {
        channelid = $(this).attr("channel-id");
        $(".container-main").load("html/channel-details.html");
        $.ajax({
//        url: "https://cognizant.kpoint.com/api/v1/xapi/channel/5532/content",
            url: "json/channel" + channelid + ".json",
            dataType: 'json',
            success: function (response) {
                createChannel(response);
            },
            error: function () {
                alert('error');
            }
        });
    });


});



//function createChannels() {
//
//    var contentString = "";
//    for (var i = 0; i < channelIds.length; i++) {
//        contentString += "<div class='card channel-icon' channel-id=channelIds[i]>"
//        contentString += "<img class='card-img-top' src='https://media-a.kpoint.com/data.ap-southeast-1.kpoint/cognizant-academy.kpoint.in/cognizant.kpoint.com/kapsule/gcc-a6097869-f849-48b9-bc54-420bd1a9b074/v3/i/16x9-thumb.jpg'>"
//    }
//}

//function createChannelHome() {
//    var channelHomeStr = "";
//    channelHomeStr+= "<img src='images/channel-home/SEF_banner.jpg' class='img-fluid'><div class='card-group'>"
//    
//    for (var i = 0; i < channelIds.length; i++) {
//        channelHomeStr += "<div class='card channel-icon' channel-id='"+channelIds[i]+"'>"
//        channelHomeStr += "<img class='card-img-top' src='https://media-a.kpoint.com/data.ap-southeast-1.kpoint/cognizant-academy.kpoint.in/cognizant.kpoint.com/kapsule/gcc-a6097869-f849-48b9-bc54-420bd1a9b074/v3/i/16x9-thumb.jpg'>"
//        channelHomeStr+="<div class='card-img-overlay'><h5 class='card-title'>CDB</h5><p class='card-text'>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p></div>"
//        
//        channelHomeStr+="</div>"
//    }
//    
//    channelHomeStr += "</div>";
//    
//		$(".container-main").append(channelHomeStr);	
//}



//function slick() {
//    $('.channel').slick({
//        dots: true,
//        infinite: true,
//        speed: 300,
//        slidesToShow: 4,
//        slidesToScroll: 4,
//        responsive: [
//            {
//                breakpoint: 1024,
//                settings: {
//                    slidesToShow: 5,
//                    slidesToScroll: 5,
//                    infinite: true,
//                    dots: true
//                }
//            },
//            {
//                breakpoint: 600,
//                settings: {
//                    slidesToShow: 2,
//                    slidesToScroll: 2
//                }
//            },
//            {
//                breakpoint: 480,
//                settings: {
//                    slidesToShow: 1,
//                    slidesToScroll: 1
//                }
//            }
//            // You can unslick at a given breakpoint now by adding:
//            // settings: "unslick"
//            // instead of a settings object
//        ]
//    });
//
//}

function createChannel(response) {
    responseString = JSON.stringify(response);
    parseresponseJson = JSON.parse(responseString);
    var contentString = "";
//    contentString += "<div class='playlistContainer'>";
//    for (var i=1; i<=parseresponseJson.totalcount; i++){
//        contentString +="<div class='playlist playlist_"+i+"'></div>"
//    }
//    contentString += "</div>";
    //$(".jsonchannel").html(contentString);
    //alert(response.list[0].displayname);
    //$(".channelHeader").text(response.list[0].displayname);
    //console.log(parseresponseJson);
    //console.log(parseresponseJson);
    var j = 0;
    for (var i = 0; i < parseresponseJson.list.length; i++) {
        if (parseresponseJson.list[i].type == "PLAYLIST") {
            var iconsrc1 = response.list[i].thumbnail_url;
            $(".playlistinerInner").attr('id', channelid);
            $("#playlistIcon_" + j).attr('src', iconsrc1);
            $("#playlistheader_" + j).text(response.list[i].displayname);
            $("#playlistdesc_" + j).text(response.list[i].description);
            $("#playlist_duration_" + j).text(response.list[i].duration);
            j++;
        }
    }
//console.log(contentString);

    for (var i = 0; i < parseresponseJson.list.length; i++) {
        if (parseresponseJson.list[i].type == "VIDEO") {
            var videothumb = response.list[i].thumbnail_url;
            //console.log(videothumb);
            $(".videoconatinerInner").attr('kapsule-channel-id', channelid);
            $(".videoconatinerInner_" + i).attr('id', "kapsule-" + response.list[i].kapsule_id);
            $("#videoIcon_" + i).attr('src', videothumb);
            $("#videoheader_" + i).text(response.list[i].displayname);
            $("#videodesc_" + i).text(response.list[i].description);
            $("#video_duration_" + i).text(response.list[i].duration);
            $("#video_views_" + i).text(response.list[i].view_count);
            $("#video_likes_" + i).text(response.list[i].like_count);
        }
    }

//   $(document).keypress(function (e) {
//        if (e.which == 13) {
//          alert(videothumb);
//          $(".container-main").load("html/search.html");
//        }
//    });

    $(document).on("keypress", function (e) {
        if (e.which == 13) {
            $(".container-main").load("html/search.html");
            
            setTimeout(function(){ 
              var vidCount=0; 
            for (var i = 0; i < parseresponseJson.list.length; i++) {
                if (parseresponseJson.list[i].type == "VIDEO") {
                    vidCount++;
                    var videothumb = response.list[i].thumbnail_url;
                    //console.log(videothumb);
                   // alert(videothumb);
                    $(".videoconatinerInner").attr('kapsule-channel-id', channelid);
                    $(".videoconatinerInner_" + i).attr('id', "kapsule-" + response.list[i].kapsule_id);
                    $("#videoIcon_" + i).attr('src', videothumb);
                    $("#videoheader_" + i).text(response.list[i].displayname);
                    $("#videodesc_" + i).text(response.list[i].description);
                    $("#video_duration_" + i).text(response.list[i].duration);
                    $("#video_views_" + i).text(response.list[i].view_count);
                    $("#video_likes_" + i).text(response.list[i].like_count);
                }
            }
            $(".search-video-count").text("Videos("+ vidCount+ ")");
            
            }, 500);
            
            
        }
    });


//$("#playlistIcon_0").append()
    $(document).on("click", '.videoconatinerInner', function () {
        $(".container-main").load("html/video-play.html");
        var kapsuleid = $(this).attr('id');
        var emdcode = (kapsuleid.split("kapsule-"))[1];
        // alert(emdcode);
        //$(".videoPlayer").attr('id', emdcode);
        // $(".videoPlayer").attr('data-kvideo-id', emdcode);
        //$(".videoPlayer").attr('data-kvideo-id', emdcode);


//     var player = kPoint.Player(document.getElementById("player-container"), {
//       "kvideoId"  : emdcode,
//       "videoHost" : "cognizant.kpoint.com",
//       "params"    : {"autoplay" : false}
//     });
//     player.addEventListener(player.events.ready, function() {
//       console.log("player ready");
//       player.playVideo();
//     });
//    }) 


        $.getScript("https://assets.kpoint.com/orca/media/embed/player-cdn.js", function (data, textStatus, jqxhr) {
            console.log(data); // Data returned
            console.log(textStatus); // Success
            console.log(jqxhr.status); // 200
            console.log("Load was performed.");
            $(".videoPlayer").attr('data-kvideo-id', emdcode);

            // $(".videoPlayer").attr('data-video-src', "https://cognizant.kpoint.com/kapsule/" + "gcc-eb08260a-e541-4ccd-bf60-2fe44fe2ae94" + "/v3/embedded");
            //$(".videoPlayer").
        });
    });

    $(document).on("click", '.playlistinerInner', function () {
        $(".container-main").load("html/video-play.html");
        var kapsuleid = $(this).attr('id');
        var emdcode = (kapsuleid.split("kapsule-"))[1];
        //alert(emdcode);
        $(".videoPlayer").attr('id', emdcode);
        $(".videoPlayer").attr('data-kvideo-id', emdcode);
        $(".videoPlayer").attr('data-video-src', "https://cognizant.kpoint.com/kapsule/" + emdcode + "/v3/embedded");
    });

//}
//function createPlaylist(response) {
//    responseString=JSON.stringify(response);
//     parseresponseJson=JSON.parse(responseString);
//     var contentString = "";
//    contentString += "<div class='playlistContainer'>";
//    for (var i=0; i<parseresponseJson.totalcount; i++){
//        contentString +="<div class='playlist_'"+i+"'>"
//    }
//    contentString += "</div>";
//}


}





		