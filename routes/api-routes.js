const db = require("../models")

module.exports = function(app) {
    //Will return a JSON object with the playlist and its songs. Specified result[0] since we're only doing one playlist
    // ex:     
    // {
    //     "id": 3,
    //     "title": "Christmas Songs",
    //     "createdAt": "2020-02-07T02:31:17.000Z",
    //     "updatedAt": "2020-02-07T02:31:17.000Z",
    //     "Songs": [
    //         {
    //             "id": 1,
    //             "name": "Jingle Bells",
    //             "createdAt": "2020-02-07T02:18:42.000Z",
    //             "updatedAt": "2020-02-07T02:18:42.000Z",
    //             "playlistsong": {}
    //         },
    //         {
    //             "id": 3,
    //             "name": "Jingle Bells",
    //             "createdAt": "2020-02-07T02:35:36.000Z",
    //             "updatedAt": "2020-02-07T02:35:36.000Z",
    //             "playlistsong": {}
    //         }
    //     ]
    // }
    app.get("/api/playlist", function(req,res) {
        db.Playlist.findAll({
            include: [{
                model: db.Song, 
                through: {
                    attributes: ["name"]
                }
            }
            ]
        }).then(function(result){
            res.json(result[0])
        })
    })

    // Create a new playlist with title as a req.body parameter
    app.post("/api/playlist", function(req,res) {
        const newPlaylist = {
            title: req.body.title,
        }

        db.Playlist.create(newPlaylist).then(function(result) {
            res.status(201).send("Playlist post Successful")
        })
    })

    //Add a new song, specified playlist as "1" since we're only using one playlist for now.
    //Specified song to be added to the first playlist, since there should only be one
    app.post("/api/song", function(req, res) {
        db.Song.create({
            name: req.body.name
        }).then(function(newSong) {
            db.Playlist.findAll({}).then(function(result) {
                newSong.addPlaylist(result[0].id)
                res.status(201).send("Song post Successful")
            })
        })
    })

    // Fetch a youtube link from the first song retrieved from a search term, e.g. "Viva la Vida"
    app.get("/api/search/:name", function(req, res){
        //Youtube song matcher
        var youtube = require('youtube-api-search');
        const API_KEY = 'AIzaSyDRzxI21ptL6H0kJXoNqyQFaFOzxraS0uA';

        youtube({key: API_KEY, term: req.params.name, maxResults: 1}, (videos) => {
        res.send("https://www.youtube.com/watch?v=" + videos[0].id.videoId);
        });
    })

    //Work on a delete later
}