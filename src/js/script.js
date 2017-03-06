/**
 * Created by Michał_2 on 2017-02-28.
 */

var SpotifyApp = {
//    variables
    BUTTON_SEARCH: null,
    API_URL: 'https://api.spotify.com/v1/',
    SHOW_TRACKS_LABEL: 'Show tracks',
    HIDE_TRACKS_LABEL: 'Hide tracks',
    //ALBUM_ID: null,


//    init
    init: function () {
        //SpotifyApp.getAlbums();
        SpotifyApp.BUTTON_SEARCH = $('#search');
        //SpotifyApp.ALBUM_ID = $("#more").attr('data-id');
        SpotifyApp.onSend();
    },


//    function


    getSearchResults: function (searchValue) {
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
            SpotifyApp.getSearchResults($('.form-control').val());
        });
    },

    drawSearchData: function (data) {
        var section = '';

        for (var i = 0; i < data.albums.items.length; i++) {
            var ID = data.albums.items[i].id;
            section += '<div class="album-detail col-xs-12">';
            section += '<div class="match-detail col-xs-8">';
            section += '<div class="album-artist col-xs-12"><span>Artist: </span>' + data.albums.items[i].artists["0"].name + '</div>';
            section += '<div class="album-name col-xs-12"><span>Title album: </span>' + data.albums.items[i].name + '</div>';
            section += '<button id="more" class=" btn btn-inverse" data-id="' + ID + '" onclick="SpotifyApp.moreDetails(event.target)">Show tracks</button>';
            section += '</div>';
            section += '<div class="album-img col-xs-4"><img src=' + data.albums.items[i].images[2].url + '>' + '</div>';
            section += '</div>'
        }
        $('.album-section').append(section);
    },

    moreDetails: function (btn) {
        if (!$(btn).hasClass('loaded')){
            SpotifyApp.getTracks(btn);
        } else {
            SpotifyApp.slideContent(btn);
        }
    },

    getTracks: function (btn) {
        var albumId = $(btn).attr('data-id');
        $.ajax({
            url: SpotifyApp.API_URL + 'albums/' + albumId + '/tracks',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                SpotifyApp.showTracks(response, btn);
                $(btn).addClass('loaded');
                $(btn).text(SpotifyApp.HIDE_TRACKS_LABEL);
            },
            error: function () {
                console.log("Getting data error!");
            }
        });
    },

    slideContent: function (btn) {
        $(btn).next('.slide-content').slideToggle('slow', function () {
            if($(btn).text() == SpotifyApp.SHOW_TRACKS_LABEL ){
                $(btn).text(SpotifyApp.HIDE_TRACKS_LABEL);
            } else {
                $(btn).text(SpotifyApp.SHOW_TRACKS_LABEL);
            }
        });
    },

    showTracks: function (data, e) {
        var track = "";
        track += '<div class="slide-content">';
        track += '<table class="table table-striped">';
        track += '<tbody>';
        for (var i = 0; i < data.items.length; i++) {
            track += '<tr><td><div class="album-track">'
            + '<span class="track-number">' +
            data.items[i].track_number +
            '</span>' + data.items[i].name + '</div></td></tr>'
        }
        track += '</tbody></table>';
        track += '</div>';

        $(e).parent(".match-detail").append(track);

        //  @todo dopoprawki!
    }


    //selectAlbum: function(data) {
    //    var template = '';
    //    $.each(data, function(index, item){
    //        template += SpotifyApp.drawAlbums(item);
    //    });
    //    $('.album').prepend(template);
    //},

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

    //getAlbumfunction

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
};

$(document).ready(function () {
    SpotifyApp.init();
});