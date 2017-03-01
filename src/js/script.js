/**
 * Created by Michał_2 on 2017-02-28.
 */

var SpotifyApp = {
    URL: {
        url1: 'https://api.spotify.com/v1/albums/382ObEPsp2rxGrnsizN5TX',
        url2: 'https://api.spotify.com/v1/albums/1A2GTWGtFfWp7KSQTwWOyo',
        url3: 'https://api.spotify.com/v1/albums/2noRn2Aes5aoNVsU6iWThc'
    },


//    variables





//    init
    init: function(){
        SpotifyApp.getAlbums();
    },








//    function
    getAlbums: function () {
        $.ajax({
            url: 'https://api.spotify.com/v1/albums/382ObEPsp2rxGrnsizN5TX',
            method: 'GET',
            dataType: 'json',
            success: function(data){
                SpotifyApp.drawAlbums(data);
                console.log(data);
            },
            error: function() {
             console.log("Getting data error!")
            }
        });
            // @todo dupa
    },

    //selectAlbum: function(data) {
    //    var template = "";
    //    $.each(data, function(index, item){
    //        template += SpotifyApp.drawAlbums(item);
    //    });
    //    $(".album").prepend(template);
    //},

    drawAlbums: function (data) {
        var block = "";
        block += "<div class='album-detail'>";
        block += "<div class='artist'>" + data.artists["0"].name + "</div>";
        //block += "<div class='img'>" + data.images["2"].url + "</div>";
        block += "<div class='label'>" + data.label + "</div>";
        block += "<div class='name'>" + data.name + "</div>";
        block += "<div>" + data.release_date + "</div>";
        block +=  "<div class='popularity'>" + data.popularity + "</div>";
        block += "<div class='track'>" + data.tracks.items["0"].track_number + data.tracks.items["0"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["1"].track_number + data.tracks.items["1"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["2"].track_number + data.tracks.items["2"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["3"].track_number + data.tracks.items["3"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["4"].track_number + data.tracks.items["4"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["5"].track_number + data.tracks.items["5"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["6"].track_number + data.tracks.items["6"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["7"].track_number + data.tracks.items["7"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["8"].track_number + data.tracks.items["8"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["9"].track_number + data.tracks.items["9"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["10"].track_number + data.tracks.items["10"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["11"].track_number + data.tracks.items["11"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["12"].track_number + data.tracks.items["12"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["13"].track_number + data.tracks.items["13"].name + "</div>";
        block += "<div class='track'>" + data.tracks.items["14"].track_number + data.tracks.items["14"].name + "</div>";

        block += "</div>";

        $(".album").prepend(block);
    }







};

$(document).ready(function (){
    SpotifyApp.init();
});