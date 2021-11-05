const path = require('path');

module.exports = env => {
    const config = {
        entry: './src/init.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'js'),
        },
    };

    return config;
};
