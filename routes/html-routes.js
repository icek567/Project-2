var path = require("path")
var db = require("../models")

module.exports = function(app) {
    app.get("/", function(res, req){
        db.Playlist.findAll({
            include: [{
                model: db.Song, 
                through: {
                    attributes: ["name"]
                }
            }
            ]
        }).then(function(result){
            res.render("index", result)
        })
    })
}