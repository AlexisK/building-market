const webpack = require('webpack');
const path = require('path');

// Webpack Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');


// SETTINGS
const CONST = {
    dir_source: 'src',
    dir_output: 'build',
    dir_environments: '../environments'
};

const PATH = [
    ['root', ''],
    ['source', CONST.dir_source],
    ['output', CONST.dir_output],
    ['environments', CONST.dir_environments]
].reduce((acc, pair) => {
    acc[pair[0]] = path.resolve.bind({}, __dirname, pair[1]);
    return acc;
}, {});


// MAIN
module.exports = (process_env) => {

    if (!process_env.name) {
        throw 'Environment not specified';
    }
    const ENV = require(PATH.environments(process_env.name + '.config.js'));
    if (!ENV) {
        throw 'Environment ' + process_env.name + ' not exists';
    }

    const resolve = {
        extensions: ['.js', '.json'],
        modules: [PATH.source(), 'node_modules', 'app_modules'],
    };

    const rules = [
        {
            test: /\.js$/,
            loaders: [],
            exclude: [/node_modules/, PATH.source('index.js')]
        },
        {
            test: /\.json$/, loader: 'json-loader',
            exclude: [/node_modules/, /src\/static/]
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)$/,
            loader: 'file?name=static/[name].[hash].[ext]?'
        }
    ];


    const plugins = [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(ENV.server)
        }),
        new CopyWebpackPlugin([
            {from: 'src/static'}
        ])
    ];

    if (ENV.build.compress) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        }));
    }


    return {
        devtool: ENV.build.devtool,
        mode: ENV.build.mode,
        target: 'node',
        entry: {
            app: PATH.source('app.js')
        },
        output: {
            filename: '[name].js',
            path: PATH.output()
        },
        plugins,
        resolve,
        module: {
            rules,
        }
    };
};
