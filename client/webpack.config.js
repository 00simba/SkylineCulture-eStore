const webpack = require('webpack');

module.exports = {
    resolve: {
        fallback: {
            "fs": false,
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "stream": require.resolve('stream-browserify'),
            "crypto": require.resolve("crypto-browserify"),
            "buffer": require.resolve("buffer"),
            "process": require.resolve("process/browser"),
            "util": require.resolve("util/"),
            "assert": require.resolve("assert/"),
            "events": require.resolve("events/"),
            "url": require.resolve("url/"),
            "querystring": require.resolve("querystring-es3"),
            "http": false,
            "https": false,
            "net": false,
            "tls": false,
            "zlib": false,
            "child_process": false,
            "cluster": false,
            "dgram": false,
            "dns": false,
            "domain": false,
            "module": false,
            "punycode": false,
            "readline": false,
            "repl": false,
            "string_decoder": false,
            "sys": false,
            "timers": false,
            "tty": false,
            "v8": false,
            "vm": false,
            "worker_threads": false
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};