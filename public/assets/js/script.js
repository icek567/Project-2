const fs = require("fs");
// const axios = require("axios");
const youtube = require("youtube-api-search")

$(function() {
    $(".searchBtn").on("click", function(event) {
      event.preventDefault();
      const queryUrl = `https://www.googleapis.com/youtube/v3/search`
      youtube.get(queryUrl).then(function(res) {
        const newSearch = res.body.name //user Input
      })
      // send put
      $.ajax("/api/songs/" + id, {
        type: "PUT",
        data: newSearch
      })
        // reload
      .then(
        function() {
          location.reload();
        }
      );
    });
  
    // on submit
    $(".submitPlaylist").on("submit", function(event) {
      event.preventDefault();
      const newSong = {
        artist: $("#newArtist").val().trim()
        title: $("#newTitle").val().trim()
      };
      // send post
      $.ajax("/api/playlist", {
        type: "POST",
        data: newSong
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