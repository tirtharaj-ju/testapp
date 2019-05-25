var responseString = "";
var parseresponseJson = "";
var channelid = "";
var totalChannelCount = 2;
var channelIds = [5532, 4789, 3342, 4468];
var checkBoxForChannels = ["saleeduc4973235"];
var customSearch = [];
var checkBoxForTopics = [];
var checkBoxForAuthors = [];
var clickedDuration = '';
var clickedUpload = 1;
var type = "videos";
var queryTxt = 'landscape';
var minIndex = 0;
var maxIndex = 10;
var listMaxLength = 72;


$(document).ready(function () {
    parseChanneljson();
});

/*-----------------------Create Channel Structure----------------------*/

function parseChanneljson() {
    $.ajax({
        url: "json/channeldata.json",
        dataType: 'json',
        success: function (channeldata) {
            createChannelstructure(channeldata);
        },
        error: function () {
            alert('error');
        }
    });
}

function createChannelstructure(channeldata) {
    var channelstring = "";
    for (var i = 0; i < channeldata.channels.length; i++) {
        var channelId = channeldata.channels[i].channel_id;
        var channelName = channeldata.channels[i].channel_name;
        var thumbnailUrl = channeldata.channels[i].thumbnail_Url;
        channelstring += "<div class='col-sm-6 col-md-3 channelIcon' channel-id='" + channelId + "' channel-name='" + channelName + "'><img class=' img-fluid' src='" + thumbnailUrl + "'>"
        channelstring += "</div>"
    }

    $(".channel-container").html(channelstring);
}


/*-----------------------Load Channel Content----------------------*/


$(document).on("click", '.channelIcon', function () {
    channelid = $(this).attr("channel-id");
    $(".container-main").load("html/channel-details.html");
    $.ajax({
//        url: "https://cognizant.kpoint.com/api/v1/xapi/channel/5532/content",
        url: "json/channel" + channelid + ".json",
        dataType: 'json',
        success: function (channeldetails) {
            loadChannelContent(channeldetails);
        },
        error: function () {
            alert('error');
        }
    });
});


function loadChannelContent(channeldetails) {
    var j = 0;
    for (var i = 0; i < channeldetails.list.length; i++) {
        if (channeldetails.list[i].type == "PLAYLIST") {
            var iconsrc1 = channeldetails.list[i].thumbnail_url;
            $(".playlistinerInner").attr('id', channelid);
            $("#playlistIcon_" + j).attr('src', iconsrc1);
            $("#playlistheader_" + j).text(channeldetails.list[i].displayname);
            $("#playlistdesc_" + j).text(channeldetails.list[i].description);
            $("#playlist_duration_" + j).text(channeldetails.list[i].duration);
            j++;
        }
    }

    for (var i = 0; i < channeldetails.list.length; i++) {
        if (channeldetails.list[i].type == "VIDEO") {
            var videothumb = channeldetails.list[i].thumbnail_url;
            //console.log(videothumb);
            $(".videoconatinerInner").attr('kapsule-channel-id', channelid);
            $(".videoconatinerInner_" + i).attr('id', "kapsule-" + channeldetails.list[i].kapsule_id);
            $("#videoIcon_" + i).attr('src', videothumb);
            $("#videoheader_" + i).text(channeldetails.list[i].displayname);
            $("#videodesc_" + i).text(channeldetails.list[i].description);
            $("#video_duration_" + i).text(channeldetails.list[i].duration);
            $("#video_views_" + i).text(channeldetails.list[i].view_count);
            $("#video_likes_" + i).text(channeldetails.list[i].like_count);
        }
    }
}

/*-----------------------Play Video----------------------*/


$(document).on("click", '.videoconatinerInner', function () {
    $(".container-main").load("html/video-play.html");
    
    setTimeout(function(){ $(".playlistContainer").hide();}, 100);
    var kapsuleid = $(this).attr('id');
    var emdcode = (kapsuleid.split("kapsule-"))[1];



    $.getScript("https://assets.kpoint.com/orca/media/embed/player-cdn.js", function (data, textStatus, jqxhr) {
        $(".videoPlayer").attr('data-kvideo-id', emdcode);


    });
});

$(document).on("click", '.playlistinerInner', function () {
    $(".container-main").load("html/video-play.html");
    var kapsuleid = $(this).attr('id');
    var emdcode = (kapsuleid.split("kapsule-"))[1];
    $(".videoPlayer").attr('id', emdcode);
    $(".videoPlayer").attr('data-kvideo-id', emdcode);
    $(".videoPlayer").attr('data-video-src', "https://cognizant.kpoint.com/kapsule/" + emdcode + "/v3/embedded");
});


/*-----------------------Search----------------------*/

$(document).on("keypress", function (e) {
    if (e.which == 13) {
        $(".container-main").load("html/search.html");
        emptyAppendDiv();
        createSearchList();
    }
});
function showTheChecked()
{
    $(".customRadio").each(function (i)
    {
        if ($(this).attr("custom-val") == clickedDuration)
            $(this).addClass("checked");
    });
    $(".customRadio1").each(function (i)
    {
        if ($(this).attr("custom-val") == clickedUpload)
            $(this).addClass("checked");
    });
}




function createSearchList()
{
    setTimeout(function () {
        var queryStringForTopics = '';
        for (var i = 0; i < checkBoxForTopics.length; i++) {
            queryStringForTopics += '&facet.topic=' + checkBoxForTopics[i];
        }
        var queryStringForChannels = '';
        for (var i = 0; i < checkBoxForChannels.length; i++) {
            queryStringForChannels += '&facet.channel[]=' + checkBoxForChannels[i];
        }
        $.ajax({
            type: "get",
            //url:"https://cognizant.kpoint.com/api/v1/xapi/search?qtext="+queryTxt+"&type="+type+"&facet.duration="+clickedDuration+"&facet.date="+clickedUpload+queryStringForTopics+queryStringForChannels+"&first="+minIndex+"&max="+maxIndex,						
            //url:"https://cognizant.kpoint.com/api/v1/xapi/search?qtext="+queryTxt+"&type="+type+"&facet.duration="+clickedDuration+"&facet.date="+clickedUpload+queryStringForTopics+"&first="+minIndex+"&max="+maxIndex,									
            url: "json/search.json",
            dataType: 'json',
            success: function (response) {
                if (type == "videos")
                    //listMaxLength=response.counts.videos;
                    //console.log(response.counts.videos);
                    var self = $(this);
                console.log(response);
                generateTopics(response.facets[6]);
                generateDuration(response.facets[0]);
                generateDate(response.facets[1]);
                var vidCount = 0;
                for (var i = 0; i < response.list.length; i++) {
                    vidCount++;
                    $(".appendDiv").append('<div class="row videoconatinerInner videoconatinerInner_' + i + '" id="">' +
                            '<div class="col-md-2 videoThumbnails">' +
                            '<img class="videoIcon img-fluid" id="videoIcon_' + i + '" />' +
                            '<img class="videoIcon img-fluid" id="videoIcon' + i + '" />' +
                            '</div>' +
                            '<div class="row col-md-10 videoDetails">' +
                            '<div class="videoheader col-md-4" id="videoheader_' + i + '"></div>' +
                            '<div class="duration info floatLeft col-md-4" id="video_duration_' + i + '"></div>' +
                            '<div  class="videofeaturesContainer col-md-3">' +
                            '<div class="views info floatLeft col-md-1" id="video_views_' + i + '"></div>' +
                            '<div class="likes info floatLeft col-md-1" id="video_likes_' + i + '">100</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="seperator"></div>');
                    var videothumb = response.list[i].thumbnail_url;
                    $(".videoconatinerInner").attr('kapsule-channel-id', channelid);
                    $(".videoconatinerInner_" + i).attr('id', "kapsule-" + response.list[i].kapsule_id);
                    $("#videoIcon_" + i).attr('src', videothumb);
                    $("#videoheader_" + i).text(response.list[i].displayname);
                    $("#videodesc_" + i).text(response.list[i].description);
                    var htmlText = '';
                    var daysDiff = Math.floor((Math.abs(new Date() - new Date(response.list[i].time_publish))) / 1000 / 60 / 60 / 24) + " d ago";
                    htmlText = daysDiff;
                    if (daysDiff == "0 d ago")
                    {
                        var hoursDiff = Math.floor((Math.abs(new Date() - new Date(response.list[i].time_publish))) / 1000 / 60 / 60) + " h ago";
                        htmlText = hoursDiff;
                        if (hoursDiff == "0 h ago")
                        {
                            var minsDiff = Math.floor((Math.abs(new Date() - new Date(response.list[i].time_publish))) / 1000 / 60) + " m ago";
                            htmlText = minsDiff;
                            if (minsDiff == "0 m ago")
                            {
                                var secsDiff = Math.floor((Math.abs(new Date() - new Date(response.list[i].time_publish))) / 1000) + " s ago";
                                htmlText = secsDiff;
                            }
                        }
                    }
                    var minutes = Math.floor(response.list[i].published_duration / 60) + "m";
                    var seconds = response.list[i].published_duration % 60 + "s";
                    var durationText = minutes + ' ' + seconds + '-';
                    $("#video_duration_" + i).text(durationText + htmlText);
                    $("#video_views_" + i).html('<span class="glyphicon floatLeft glyphicon-eye-open"></span><span class="glyphiconText">' + response.list[i].view_count + '</span>');
                    $("#video_likes_" + i).html('<span class="glyphicon floatLeft glyphicon-heart"></span><span class="glyphiconText">' + response.list[i].like_count + '</span>');
                }


                $(".search-video-count").text("Videos(" + vidCount + ")");
                if (maxIndex == listMaxLength)
                    $(".expandVideo").hide();
                else
                    $(".expandVideo").show();

                showTheChecked();
            },
            error: function (req, status, err) {
                console.log('something went wrong', status, err);
                alert('something went wrong' + status + err);
            }
        });
    }, 500);

}
function emptyAppendDiv()
{
    $(".appendDiv").html('');
    minIndex = 0;
    maxIndex = 10;
}
$(document).on("click", '.customRadio', function () {
    var self = $(this);
    $('.customRadio').removeClass('checked');
    self.addClass("checked");
    clickedDuration = self.attr("custom-val");
    setTimeout(function () {
        emptyAppendDiv();
        createSearchList();
    }, 500);
});
$(document).on("click", '.customRadio1', function () {
    var self = $(this);
    $('.customRadio1').removeClass('checked');
    self.addClass("checked");
    clickedUpload = self.attr("custom-val");
    setTimeout(function () {
        emptyAppendDiv();
        createSearchList();
    }, 500);
});
$(document).on("click", 'input:checkbox', function () {
    var self = $(this);
    if (self.prop("checked"))
        checkBoxForTopics.push(self.val());
    else
    {
        //for pop the element
        function checkTopic(topic)
        {
            return topic != self.val();
        }
        checkBoxForTopics = checkBoxForTopics.filter(checkTopic);
    }
    setTimeout(function () {
        emptyAppendDiv();
        createSearchList();
    }, 500);

});

$(document).on("click", '.expandTopic', function () {
    var self = $(this);
    if (!self.hasClass("clicked"))
    {
        self.addClass("clicked");
        $(".topics").css("height", "auto");
        self.html("Show Less");
    } else
    {
        self.removeClass("clicked");
        $(".topics").css("height", "216px");
        self.html("Show More");
    }
});
$(document).on("click", '.expandVideo', function () {
    var self = $(this);
    self.hide();
    minIndex = maxIndex;
    maxIndex = maxIndex + 10;
    if (maxIndex > listMaxLength)
        maxIndex = minIndex + (listMaxLength - minIndex);
    createSearchList();
});



function generateTopics(response)
{
    
    $(".leftPanelAppend .topics").html('<div class="pb-2"><span class="glyphicon floatLeft glyphicon-time"></span><span class="glyphiconText"> Topics</span></div>');
    for (var i = 0; i < response.tag.length; i++) {
        $(".leftPanelAppend .topics").append(
                '<div class="input-group pb-22">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<input type="checkbox" value=' + response.tag[i].displayname + ' aria-label="Radio button for following text input">' +
                '<span class="input-group-text-style">' + response.tag[i].displayname + '  (' + response.tag[i].count + ')</span>' +
                '</div>' +
                '</div>' +
                '</div>');
    }
}
function generateOwners(response)
{
    for (var i = 0; i < response.owner.length; i++) {
        $(".leftPanelAppend .authors").append('<div class="input-group pb-22">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<input type="checkbox" value=' + response.owner[i].displayname + ' aria-label="Radio button for following text input">' +
                '<span>' + response.owner[i].displayname + '</span>' +
                '</div>' +
                '</div>' +
                '</div>');
    }
}
function generateDuration(response)
{
    $(".leftPanelAppend .duration").html('<div class="pb-2"><span class="glyphicon floatLeft glyphicon-time"></span> <span class="glyphiconText">Duration</span></div>');
    for (var i = 0; i < response.duration.length; i++) {
        $(".leftPanelAppend .duration").append(
                '<div class="input-group pb-22">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<div class="customRadio" aria-label="Radio button for following text input" custom-val="' + response.duration[i].id + '"></div>' +
                '<span class="input-group-text-style">' + response.duration[i].displayname + '  (' + response.duration[i].count + ')</span>' +
                '</div>' +
                '</div>' +
                '</div>');
    }
}
function generateDate(response)
{alert("22");
    $(".leftPanelAppend .date").html('<div class="pb-2"><span class="glyphicon floatLeft glyphicon-time"></span><span class="glyphiconText"> Last updated</span></div>');
    for (var i = 0; i < response.date.length; i++) {
        $(".leftPanelAppend .date").append(
                '<div class="input-group pb-22">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<div class="customRadio1" aria-label="Radio button for following text input" custom-val="' + response.date[i].id + '"></div>' +
                '<span class="input-group-text-style">' + response.date[i].displayname + '  (' + response.date[i].count + ')</span>' +
                '</div>' +
                '</div>' +
                '</div>');
    }
}



