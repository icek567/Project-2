// const fs = require("fs");
// const axios = require("axios");
const searchYoutube = require("youtube-api-search")

$(document).ready(function() {
  // references for the search input
  const userSearch = $("#searchInput");
  const newSong = $("newSong");
  const newYoutube = $("newYoutube");
  const songContainer = $(".song-container");
  // adding listners for submit of search, save result and delete saved
  $(document).on("submit", "#search-bar", userInputSearch);
  $(document).on("click", ".add-song", addSongClick);

  // guessing this is how we do the search with npm youtube-search-api-with-axios
  searchYoutube();


  // function to use submitted for search. might not be required because of npm module
  function userInputSearch(event) {
    event.preventDefault();
    // dont do shit if nothing is searched
    if (!userSearch.val().trim().trim()) {
      return;
    }
    useSearch({
      title: userSearch.val().trim()
    });
  }

  function useSearch(searchData) {
    $.post("/api/search", searchData)
      .then(getSearch)
  }

  // create a card for the searched history
  function createSearchCard(searchData) {
    newCard.data("search", searchData);

    // elements for card
    const newCard = $("<div>").attr("class", "card searchCard col-mt-6");
    const cardBodyEl = $("<div>").attr("class", "card-body mb-4");
    let cardNameEl = $("<div>").attr("class", "card-title").text(searchData.newSong);

    // the link to youtube (probably should change this to a actialy html video thing)
    let cardLinkEl = $("<p>").attr("class", "youtube-link").text(searchData.newYoutube);

    // add button
    let cardAddButton = $("button").attr("class", "btn btn-light add-song").attr("style", "cursor:pointer;color:green").text("Add Song");

    // append elements
    newCard.append(cardBodyEl);
    cardBodyEl.append(cardNameEl, cardLinkEl, cardAddButton);

    return newCard;
  }

  // function to display search result
  function getSearch() {
    $.get("/api/songs", function(data) {
      var cardsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        cardsToAdd.push(createSearchCard(data[i]));
      }
      renderSearchList(cardsToAdd);
      userSearch.val("");
    });
  }

  // render list of searchs to the page in our case its just 1
  function renderSearchList(rows) {
    searchList.children().not(":last").remove();
    searchContainer.children(".alert").remove();
  }

  // Function for handling what happens when the add button is pressed
  function addSongClick() {
    const listItemData = $(this).parent("td").parent("tr").data("song");
    const id = listItemData.id;
    $.ajax({
      method: "POST",
      url: "/api/songs/" + id
    })
      .then(getSongs);
  };



// -------------------------------------------------------------------------------------
// playlist portion below
// -------------------------------------------------------------------------------------

  // references for playlist
  const playlistSong = $("#playlist-song");
  const songList = $("songBody");
  const playlistContainer = $(".playlist-container");
  // adding listners for play song and delete from playlist
  $(document).on("click", ".play-song", playSongClick);
  $(document).on("click", ".delete-song", deleteSongClick);
  // addling listners for play all songs on list
  $(document).on("click", ".play-all-songs", playAllSongsClick);

  // getting playlist
  getPlaylist();

  // create a tr row to display playlist
  function createPlaylistRow(playlistData) {
    const newTr = $("<tr>");
    newTr.data("search", playlistData);
    newTr.append("<td> " + playlistData.name + "</td>");
    newTr.append("<td> " + playlistData.artist + "</td>");
    // btn to play song on playlist and delete song
    newTr.append("<td><a style='cursor:pointer;color:green' class='play-song'>Play Song</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-song'>Delete Song</a></td>");
    return newTr;
  }


  // function to display playlist
  function getPlaylist() {
    $.get("/api/songs", function(data) {
      const rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createPlaylistRow(data[i]));
      }
      renderPlaylist(rowsToAdd);
      playlistSong.val("");
    });
  }

  // render list of searchs to the page
  function renderPlaylist(rows) {
    songList.children().not(":last").remove();
    playlistContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      searchList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // function for when there is nothing in playlist
  function renderEmpty() {
    const alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger").text("The Playlist is Empty!");
    playlistContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function deleteSongClick() {
    const listItemData = $(this).parent("td").parent("tr").data("song");
    const id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/songs/" + id
    })
      .then(getPlaylist);
  };

  // function for play
  
  // function for play all

});