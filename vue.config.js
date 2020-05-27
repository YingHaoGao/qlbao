module.exports = {
    publicPath : '',
    devServer: {
        proxy: {
            "/api": {
                target: "http://test.api.meisheapp.com",
                headers: {
                    'origin': 'http://m.meisheapp.com'
                },
                // changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        },
    }
}