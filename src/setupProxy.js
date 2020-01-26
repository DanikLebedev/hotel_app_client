const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    console.log(app)
    app.use(proxy('/api',
        { target: 'http://localhost:5000/',   secure: false,
         changeOrigin: true }
    ));
}