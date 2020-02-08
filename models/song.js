module.exports = function(sequelize, DataTypes) {
    var Song = sequelize.define("Song", {
        name: DataTypes.STRING
    })

    Song.associate = function(models) {
        Song.belongsToMany(models.Playlist, {through: "playlistsong"})
    }

    return Song
}