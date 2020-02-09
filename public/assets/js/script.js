// const fs = require("fs");
// const axios = require("axios");
const searchYoutube = require("youtube-api-search")

$(document).ready(function() {
  // references for the search input
  const userSearch = $("#searchInput");
  const newSong = $("newSong");
  const songContainer = $(".song-container");
  // adding listners for submit of search, save result and delete saved
  $(document).on("submit", "search-bar", userInputSearch);
  $(document).on("click", ".add-song", addSongClick);
  $(document).on("click", ".delete-song", deleteSongClick);

  // guessing this is how to do the search with npm youtube-search-api-with-axios
  searchYoutube();


// function to use submitted for search. might not be required because of npm module
function userInputSearch(event) {
  event.preventDefault();
  // dont do shit if nothing is searched
  if (!searchInput.val().trim().trim()) {
    return;
  }
  useSearch({
    title: searchInput.val().trim()
  });
}

function useSearch(searchData) {
  $.post("/api/search", searchData)
    .then(getSearch)
}

// create a tr row to display searched history
function createSearchRow(searchData) {
  const newTr = $("<tr>");
  newTr.data("search", searchData);
  newTr.append("<td> " + searchData.newSong + "</td>");

  // btn to add and delete searched song
  newTr.append("<td><a style='cursor:pointer;color:green' class='add-song'>Add Song</a></td>");
  newTr.append("<td><a style='cursor:pointer;color:red' class='delete-song'>Delete Song</a></td>");
  return newTr;
}

// function to display search result
function getSearch() {
  $.get("/api/songs", function(data) {
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createSearchRow(data[i]));
    }
    renderSearchList(rowsToAdd);
    nameInput.val("");
  });
}

// render list of searchs to the page
function renderSearchList(rows) {
  searchList.children().not(":last").remove();
  searchContainer.children(".alert").remove();
  if (rows.length) {
    console.log(rows);
    searchList.prepend(rows);
  }
  else {
    return;
    // change to 
    // renderEmpty(); if necessary to specify when there is nothing searched. dont think this is possible for youtube
  }
}

// assuming all youtube searchs always return something
// function renderEmpty() {blahblah}; check 14-01-14-solved for example

// Function for handling what happens when the add button is pressed
function addSongClick() {
  var listItemData = $(this).parent("td").parent("tr").data("song");
  var id = listItemData.id;
  $.ajax({
    method: "POST",
    url: "/api/songs/" + id
  })
    .then(getSongs);
};

// Function for handling what happens when the delete button is pressed
function deleteSongClick() {
  var listItemData = $(this).parent("td").parent("tr").data("song");
  var id = listItemData.id;
  $.ajax({
    method: "DELETE",
    url: "/api/songs/" + id
  })
    .then(getSongs);
};

});
