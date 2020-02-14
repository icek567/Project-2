var path = require("path")
var db = require("../models")

module.exports = function(app) {
    app.get("/", function(req, res){
        db.Playlist.findAll({
            include: [{
                raw: true,
                nest: true,
                model: db.Song, 
                through: {
                    attributes: ["name"]
                }
            }
            ]
        }).then(function(result){
            result = (result.map(item => item.get({
                plain:true
            })))
            res.render("index", result[0])
        })
    })
}