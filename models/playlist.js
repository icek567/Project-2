module.exports = function(sequelize, DataTypes) {
    var Playlist = sequelize.define("Playlist", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true
        }
    });

    Playlist.associate = function(models) {
        Playlist.belongsToMany(models.Song, {through: "playlistsong"})
    }

    return Playlist
}

