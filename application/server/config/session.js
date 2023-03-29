const session = require('express-session');

module.exports = app => {
    app.use(session({
        name: 'SFSUFF',
        secret: 'secret',
        resave: 'false',
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60  //1hr (Mult by 2 for 2hr)
        }
    }))
};