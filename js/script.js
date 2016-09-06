var searchTerm = '';

$(document).ready(function() {
  console.log('document ready!!!');
    /*
    $( ' #search-bar ' ).on('focus',function(){
      $( '.search-wrap' ).addClass('active');
      $( '#card' ).addClass('active');
    });

    */
    document.getElementById('search-bar').onkeypress = function(e) {
        var event = e || window.event;
        var charCode = event.which || event.keyCode;
        if (charCode == '13') {
            // Enter pressed
            searchTerm = $('#search-bar').val().toUpperCase();
            console.log('user asked for "' + searchTerm + '"');
            fetchMovieData();
            return false;
        }
    }
    $('#logo').on('click', function() {
      console.log('logo clicked');
      searchTerm = $('#search-bar').val().toUpperCase();
      console.log('user asked for "' + searchTerm + '"');
      fetchMovieData();
    });
});

function fetchMovieData() {
    console.log('Fetching MetaData. . . ');
    $.getJSON("http://www.omdbapi.com/?t="+searchTerm+"&y=&plot=short&r=json", function(movie) {
        console.log(movie);
      console.log('Fetched');
      $( '.search-wrap' ).addClass('active');
      $( '#card' ).addClass('active');
      $( '#movieTitle' ).html(movie.Title);
      $( '#movieYear' ).html(movie.Year);
      $( '#movieGenre' ).html(movie.Genre);
      $( '#movieRunTime' ).html(movie.Runtime);
      $( '#moviePlot' ).html(movie.Plot);
      $( '#movieDirector' ).html(movie.Director);
      $( '#movieCast' ).html(movie.Actors);
      $( '#poster' ).css('background-image', 'url('+ movie.Poster+')');
      console.log(movie.Poster);
      console.log(movie.Title);
    });
}
