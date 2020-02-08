// on click of search
$(function() {
    $(".searchBtn").on("click", function(event) {
      event.preventDefault();
      const id = $(this).data("id");
      const newSong = {
        user: id,
        artist: "userinput",
        song: "songTitle"
      };
      // send put
      $.ajax("/api/songs/" + id, {
        type: "PUT",
        data: newSong
      })
        // reload
      .then(
        function() {
          location.reload();
        }
      );
    });
  
    // on submit
    $(".create-selection").on("submit", function(event) {
      event.preventDefault();
      const newSearch = {
        searched: $("#newSearch").val().trim()
      };
  
      // send post
      $.ajax("/api/playlist", {
        type: "POST",
        data: newSearch
      })
        // reload
      .then(
        function() {
          console.log("added to playlist");
          location.reload();
        }
      );
    });
  });