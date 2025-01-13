module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-import',
                                    'autoprefixer',
                                    // Add other plugins as needed
                                ],
                            },
                        },
                    },
                ],
            },
            // ... existing rules ...
        ],
    },
    // ... existing configuration ...
}; 