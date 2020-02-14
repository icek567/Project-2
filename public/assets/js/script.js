$(document).ready(function() {
  // references for the search input
  const userSearch = $("#submit");
  const searchResult = [];
  // const newSong = $("newSong");
  // const newYoutube = $("newYoutube");
  // const songContainer = $(".song-container");
  $.ajax({
    method: "GET",
    url: "/api/playlist"
  }).then(function(result){
    console.log(result)
    if (result === "empty database") {
    $.ajax({
      method: "POST",
      url: "/api/playlist",
      data: {'title': `Playlist`}
    })
    }
  })
  // adding listners for submit of search, save result and delete saved
  $("#search").on("submit", userInputSearch);
  $(document).on("click", "#add-song", addSongClick);
  $(document).on("click", "#play-song", playSongClick);
  $(document).on("click", "#delete-song", deleteSongClick);
  // main function of this js are the following
  // Listner for (we call it song but really, its anything with the name on youtube)
    // - submit search
    // - add video to playlist
    // - play video on playlist
    // - delete video on playlist
  // submit search
    // - GET youtube url for iframe src 
  // add video to playlist
    // - POST search text
  // play video on playlist
    // - GET youtube url and update iframe src
  // delete video on playlist
    // - DESTROY playlist obj
  // stuff i need on html
    // - id = search at searchbar
    // - id = add-song at the button to add searched link to playlist
    // - id = play-song at the playlist play button
    // - id = delete-song at the playlist delete button
    //  public/assets/img/404.jpeg 
      // - a src image for when there is nothing returned from submit search
  // start search from submit
  function userInputSearch(event) {
    event.preventDefault();
    // dont do shit if nothing is searched
    if (!userSearch.val().trim().trim()) {
      return;
    }
    searchYoutube({
      name: userSearch.val().trim()
    });
  }
  function searchYoutube(object) {
    const searchInput = object.name
    console.log(searchInput)
    $.ajax({
      method: "GET",
      url: "/api/search/?searchquery=" + searchInput,
    }).then(updateVideo);
  };
  function updateVideo(youtubeLink) {
      console.log(youtubeLink)
      $("#youtube").attr("src", youtubeLink);
  }
  // click listner for addSongClick (add video to playlist)
  function addSongClick(event) {
    event.preventDefault();
    const songName = userSearch.val().trim()
    $.ajax({
      method: "POST",
      url: "/api/song",
      data: {'name': `${songName}`}
    }).then(function(){
      window.location.href = "/"
    })
  }
  // click listner to play video from playlist - update iframe src
  function playSongClick() {
    // assuming that the title portion of this button's parent is what we saved from add-song
    const songName = $(this).parent().children().first().text();
    console.log(songName)
    searchYoutube({
      name: songName})
    ;
  };
  // click listner to delete video from playlist
  function deleteSongClick() {
    const songName = $(this).parent().children().first().text();
    console.log(songName)
    $.ajax({
      method: "DELETE",
      url: "api/song",
      data: {'name': `${songName}`}
    }).then(function() {
      window.location.href = "/"
    });
  }
});
// ---------------------------------------------
// OLD CODE BELOW
// ---------------------------------------------
//   // REDO IN PROGRESS
//   // create a card for the searched history
//   function createSearchCard(searchData) {
//     // elements for card
//     const newCard = $("<div>").attr("class", "card searchCard col-mt-6");
//     newCard.data("search", searchData);
//     const cardBodyEl = $("<div>").attr("class", "card-body mb-4");
//     let cardNameEl = $("<div>").attr("class", "card-title").text(searchData.newSong);
//     // the link to youtube (probably should change this to a actialy html video thing)
//     let cardLinkEl = $("<p>").attr("class", "youtube-link").text(searchData.newYoutube);
//     // add button
//     let cardAddButton = $("button").attr("class", "btn btn-light add-song").attr("style", "cursor:pointer;color:green").text("Add Song");
//     // append elements
//     newCard.append(cardBodyEl);
//     cardBodyEl.append(cardNameEl, cardLinkEl, cardAddButton);
//     return newCard;
//   }
//   // function to display search result
//   function getSearch() {
//     $.get("/api/songs/", function(data) {
//       var cardsToAdd = [];
//       for (var i = 0; i < data.length; i++) {
//         cardsToAdd.push(createSearchCard(data[i]));
//       }
//       renderSearchList(cardsToAdd);
//       userSearch.val("");
//     });
//   }
//   // render list of searchs to the page in our case its just 1
//   function renderSearchList(rows) {
//     searchList.children().not(":last").remove();
//     searchContainer.children(".alert").remove();
//   }
//   // Function for handling what happens when the add button is pressed
//   function addSongClick() {
//     const listItemData = $(this).parent("td").parent("tr").data("song");
//     const id = listItemData.id;
//     $.ajax({
//       method: "POST",
//       url: "/api/songs/" + id
//     })
//       .then(getSongs);
//   };
// // -------------------------------------------------------------------------------------
// // playlist portion below
// // -------------------------------------------------------------------------------------
//   // references for playlist
//   const playlistSong = $("#playlist-song");
//   const songList = $("songBody");
//   const playlistContainer = $(".playlist");
//   // adding listners for play song and delete from playlist
//   $(document).on("click", ".play-song", playSongClick);
//   $(document).on("click", ".delete-song", deleteSongClick);
//   // addling listners for play all songs on list
//   $(document).on("click", ".play-all-songs", playAllSongsClick);
//   // getting playlist
//   getPlaylist();
//   // create a tr row to display playlist
//   function createPlaylistRow(playlistData) {
//     const newTr = $("<tr>");
//     newTr.data("search", playlistData);
//     newTr.append("<td> " + playlistData.name + "</td>");
//     newTr.append("<td> " + playlistData.artist + "</td>");
//     // btn to play song on playlist and delete song
//     newTr.append("<td><a style='cursor:pointer;color:green' class='play-song'>Play Song</a></td>");
//     newTr.append("<td><a style='cursor:pointer;color:red' class='delete-song'>Delete Song</a></td>");
//     return newTr;
//   }
//   // function to display playlist
//   function getPlaylist() {
//     $.get("/api/songs", function(data) {
//       const rowsToAdd = [];
//       for (var i = 0; i < data.length; i++) {
//         rowsToAdd.push(createPlaylistRow(data[i]));
//       }
//       renderPlaylist(rowsToAdd);
//       playlistSong.val("");
//     });
//   }
//   // render list of searchs to the page
//   function renderPlaylist(rows) {
//     songList.children().not(":last").remove();
//     playlistContainer.children(".alert").remove();
//     if (rows.length) {
//       console.log(rows);
//       searchList.prepend(rows);
//     }
//     else {
//       renderEmpty();
//     }
//   }
//   // function for when there is nothing in playlist
//   function renderEmpty() {
//     const alertDiv = $("<div>");
//     alertDiv.addClass("alert alert-danger").text("The Playlist is Empty!");
//     playlistContainer.append(alertDiv);
//   }
//   // Function for handling what happens when the delete button is pressed
//   function deleteSongClick() {
//     const listItemData = $(this).parent("td").parent("tr").data("song");
//     const id = listItemData.id;
//     $.ajax({
//       method: "DELETE",
//       url: "/api/songs/:name" + id
//     })
//       .then(getPlaylist);
//   };
//   // function for play (changes the source link for the youtube iframe)
//   function playSongClick () {
//     const videoLink = $(this).parent("td").parent("tr").data("song")
//     const name = videoLink.name;
//     $.ajax({
//       method: "GET",
//       url: "api/search/" + name
//     })
//       .then(
//         $(".youtube").attr("src", youtube(name))
//       );
//   };
// });