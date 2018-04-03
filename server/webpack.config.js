const path = require('path');
const PATH = path.resolve.bind(this, __dirname);

module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: PATH('build')
    }
};
