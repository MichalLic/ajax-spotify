/**
 * Created by Michał_2 on 2017-02-28.
 */

var SpotifyApp = {
    BUTTON_SEARCH_ID: "#search",

//    variables


//    init
    init: function () {
        //SpotifyApp.getAlbums();
        SpotifyApp.sendValue();
    },


//    function

    //getAlbums: function () {
    //    $.ajax({
    //        url: 'https://api.spotify.com/v1/albums/382ObEPsp2rxGrnsizN5TX',
    //        method: 'GET',
    //        dataType: 'json',
    //        success: function (response) {
    //            SpotifyApp.drawAlbums(response);
    //            console.log(response);
    //        },
    //        error: function () {
    //            console.log("Getting data error!")
    //        }
    //    });
    //    // @todo dupa
    //},
    // get first album

    showSearchingData: function (inputValue) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search?q=' + inputValue + '&type=track,album,artist&market=US',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                SpotifyApp.drawSearchData(response);
                console.log(inputValue);
                console.log(response);
            },
            error: function () {
                console.log("Getting data error!")
            }
        });
    },
    sendValue: function () {
        $(SpotifyApp.BUTTON_SEARCH_ID).on("click", function (e) {
            SpotifyApp.showSearchingData($(".form-control").val());
        });
    },

    //selectAlbum: function(data) {
    //    var template = "";
    //    $.each(data, function(index, item){
    //        template += SpotifyApp.drawAlbums(item);
    //    });
    //    $(".album").prepend(template);
    //},

    drawSearchData: function (data) {
        var section = "";
        var block = "";
        for (i = 0; i < data.albums.items.length; i++ ){
            section += "<div class='album-name'>" + data.albums.items[i].name + "</div>";
        }
        for(i = 0; i < data.tracks.items.length; i++ ){
            block += "<div class='album-track'>"+ data.tracks.items[i].name + "</div>"
        }
        $(".section").append(section);
        $(".section").append(block);
    }

    //drawAlbum function

    //drawAlbums: function (data) {
    //    var block = "";
    //    var blockTrack = "";
    //    block += "<div class='album-detail'>";
    //    block += "<div class='artist'>" + data.artists["0"].name + "</div>";
    //    //block += "<div class='img'>" + data.images["2"].url + "</div>";
    //    block += "<div class='label'>" + data.label + "</div>";
    //    block += "<div class='name'>" + data.name + "</div>";
    //    block += "<div>" + data.release_date + "</div>";
    //    block += "<div class='popularity'>" + data.popularity + "</div>";
    //    for(i = 0; i < data.tracks.items.length; i++){
    //       blockTrack = "<div class='track'>" + data.tracks.items[i].track_number + " " + data.tracks.items[i].name + "</div>";$(".album").append(blockTrack);
    //    }
    //    block += "</div>";
    //    $(".album").prepend(block);
    //}



};

$(document).ready(function () {
    SpotifyApp.init();
});