var inputVal = '';

$(document).ready(function() {
    console.log('document ready!!!');

    document.getElementById('search-bar').onkeypress = function(e) {
        var event = e || window.event;
        var charCode = event.which || event.keyCode;
        if (charCode == '13') {
            // Enter pressed
            inputVal = $('#search-bar').val().toUpperCase();
            console.log('user asked for "' + inputVal + '"');
            fetchSearchResults(inputVal);
            //  fetchMovieData();
            return false;
        }
    }

    $('.back-btn').on('click', function() {
        $('.search-wrap').removeClass('active');
        $('#card').removeClass('active');
        $('#results-wrap').css('display', 'none');

    });
});

function fetchMovieData(searchTerm) {
    console.log('Fetching MetaData. . . ');
    $.getJSON("https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&r=json", function(movie) {
        console.log(movie);
        console.log('Fetched');
        $('.search-wrap').addClass('active');
        $( '#card' ).addClass('active');
        $('#movieTitle').html(movie.Title);
        $('#movieYear').html(movie.Year);
        $('#movieGenre').html(movie.Genre);
        $('#movieRunTime').html(movie.Runtime);
        $('#moviePlot').html(movie.Plot);
        $('#movieDirector').html(movie.Director);
        $('#movieCast').html(movie.Actors);
        $('#poster').css('background-image', 'url(' + movie.Poster + ')');
        console.log(movie.Poster);
        console.log(movie.Title);
    });
}

function fetchSearchResults(searchTerm) {
    console.log('Fetching Search Results . . ');
    $('.search-wrap').addClass('active');
    $('#results-wrap').html('');
    $.getJSON('https://www.omdbapi.com/?s=' + searchTerm + '&type=movie', function(SearchResult) {

        console.log('got the results');
        console.log('the whole Search JSON :');
        console.log(SearchResult);
        console.log('No of Results'+SearchResult.Search.length);

        if (SearchResult.Search.length < 2) {
          fetchMovieData(searchTerm);
        }else {

          $('#results-wrap').css('display', 'flex');

          $.each(SearchResult.Search, function(index, movie) {
              console.log(movie.Title);
              console.log(movie.Poster);

              if (movie.Poster =="N/A") {
                console.log('no way joze');
                return false;
              }

              $('<div class="movieThumbnail"><span>' + movie.Title + ' [' + movie.Year + ']</span></div>').appendTo("#results-wrap");

              $(".movieThumbnail").eq(index).css('background-image', 'url(' + movie.Poster + ')');

          });

        }


    });
}


/*{
    "Search": [{
        "Title": "The Hacker Wars",
        "Year": "2014",
        "imdbID": "tt4047350",
        "Type": "movie",
        "Poster": "http://ia.media-imdb.com/images/M/MV5BNzgwOTI0MjQwN15BMl5BanBnXkFtZTgwMjAwNzQ3MzE@._V1_SX300.jpg"
    }, {
        "Title": "The Hacker Wars",
        "Year": "2014",
        "imdbID": "tt4056570",
        "Type": "movie",
        "Poster": "http://ia.media-imdb.com/images/M/MV5BNzgwOTI0MjQwN15BMl5BanBnXkFtZTgwMjAwNzQ3MzE@._V1_SX300.jpg"
    }, {
        "Title": "Bedwin Hacker",
        "Year": "2003",
        "imdbID": "tt0368595",
        "Type": "movie",
        "Poster": "http://ia.media-imdb.com/images/M/MV5BMjI4MDI2ODkwNV5BMl5BanBnXkFtZTgwMjc5OTk1MDE@._V1_SX300.jpg"
    }, {
        "Title": "Hacker",
        "Year": "2010",
        "imdbID": "tt1769296",
        "Type": "movie",
        "Poster": "N/A"
    }, {
        "Title": "Hacker",
        "Year": "2015",
        "imdbID": "tt3173594",
        "Type": "movie",
        "Poster": "http://ia.media-imdb.com/images/M/MV5BMTUyMjM5OTEyNF5BMl5BanBnXkFtZTgwMzExMjU5MzE@._V1_SX300.jpg"
    }, {
        "Title": "The Hacker",
        "Year": "2001",
        "imdbID": "tt0292801",
        "Type": "series",
        "Poster": "N/A"
    }, {
        "Title": "Hacker Time",
        "Year": "2011–",
        "imdbID": "tt2104403",
        "Type": "series",
        "Poster": "N/A"
    }, {
        "Title": "The Armchair Hacker",
        "Year": "1985",
        "imdbID": "tt0088737",
        "Type": "movie",
        "Poster": "N/A"
    }, {
        "Title": "Der Hacker",
        "Year": "2006",
        "imdbID": "tt0799771",
        "Type": "movie",
        "Poster": "N/A"
    }, {
        "Title": "Happy Birthday Hacker John",
        "Year": "1986",
        "imdbID": "tt0226735",
        "Type": "movie",
        "Poster": "N/A"
    }],
    "totalResults": "25",
    "Response": "True"
}*/
