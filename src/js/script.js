/**
 * Created by Michał_2 on 2017-02-28.
 */

var SpotifyApp = {
//    variables
    BUTTON_SEARCH: null,
    API_URL: 'https://api.spotify.com/v1/',


//    init
    init: function () {
        //SpotifyApp.getAlbums();
        SpotifyApp.BUTTON_SEARCH = $('#search');
        SpotifyApp.onSend();
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

    getSearchValue: function (searchValue) {
        $.ajax({
            url: SpotifyApp.API_URL + 'search?q=' + searchValue + '&type=track,album,artist&market=US',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                SpotifyApp.drawSearchData(response);
                console.log(searchValue);
                console.log(response);
            },
            error: function () {
                console.log('Getting data error!')
            }
        });
    },
    onSend: function () {

        $('button#search').on('click', function (e) {
            SpotifyApp.getSearchValue($('.form-control').val());
        });
    },

    //selectAlbum: function(data) {
    //    var template = '';
    //    $.each(data, function(index, item){
    //        template += SpotifyApp.drawAlbums(item);
    //    });
    //    $('.album').prepend(template);
    //},

    drawSearchData: function (data) {
        var section = '';
        var block = '';
        for (var i = 0; i < data.albums.items.length; i++) {
            section += '<div class="album-name">' + data.albums.items[i].name + '</div>';
            $('.section').append(section);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
            block += '<div class="album-track">' + data.tracks.items[i].name + '</div>'
        }
        $('.section').append(block);
    }

    //drawAlbum function

    //drawAlbums: function (data) {
    //    var block = '';
    //    var blockTrack = '';
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