// model for the about page of the app that gives information about the authors of the app

module.exports = (sequelize, DataTypes) => {
    const About = sequelize.define('About', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
    }, {});
    return About;
};

