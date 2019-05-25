$(document).ready(function(){
    parseChanneljson();
});

function parseChanneljson(){
    
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

function createChannelstructure(channeldata){
 var channelstring="";
    for(var i=0; i<channeldata.channels.length; i++){
        var channelId=channeldata.channels[i].channel_id;
        var channelName=channeldata.channels[i].channel_name;
        var thumbnailUrl=channeldata.channels[i].thumbnail_Url;
        channelstring+= "<div class='col-sm-6 col-md-3'><img class='channelIcon img-fluid' src='"+thumbnailUrl+"'>"
        channelstring+="</div>"
    }
    
    $(".channel-container").html(channelstring);
    
//    var contentstring="";
//    for(var i=0; i<parseresponseJson.channels[0].length; i++){
//        var channelid=
//        contentstring+= "<div class='col-sm-6 col-md-3'><img class='channelIcon img-fluid' "
//    }
   
}