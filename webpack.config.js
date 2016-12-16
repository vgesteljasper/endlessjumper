const path = require(`path`);
const webpack = require(`webpack`);

// change for production build on different server path
const publicPath = `/`;
// const publicPath = `/jasper.van.gestel/20162017/COD/GAME/`;
// const publicPath = `/remco.van.gestel/20162017/COD/GAME/`;

const config = {
  entry: {
    game: [`./src/js/foxgame.js`, `./src/css/game.css`],
    stats: [`./src/js/stats.js`, `./src/css/stats.css`]
  },
  output: {
    path: path.resolve(`./dist`),
    filename: `js/[name].js`,
    publicPath: publicPath
  },
  devtool: `sourcemap`,
  devServer: {
    contentBase: `./src`,
    historyApiFallback: true,
    hot: true,
    port: 3000
  },
  resolve: {
    extensions: [`.js`, `.css`]
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: `babel-loader`
          },
          {
            loader: `eslint-loader`,
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif|webp)$/,
        loader: `url-loader`,
        options: {
          limit: 1000, // inline if < 1 kb
          context: `src`,
          name: `[path][name].[ext]`
        }
      }
    ]
  }
};

if (process.env.NODE_ENV === `production`) {
  const ExtractTextWebpackPlugin = require(`extract-text-webpack-plugin`);
  const {UglifyJsPlugin} = webpack.optimize;
  const extractCSS = new ExtractTextWebpackPlugin(`css/style.css`);
  config.entry[`styles`] = [`./src/css/game.css`, `./src/css/stats.css`];
  config.module.rules.push({
    test: /\.(css)$/,
    loader: extractCSS.extract([
      {
        loader: `css-loader`,
        options: {
          importLoaders: 1
        }
      },
      {
        loader: `postcss-loader`
      }
    ])
  });
  //image optimizing
  config.module.rules.push({
    test: /\.(svg|png|jpe?g|gif)$/,
    loader: `image-webpack-loader`,
    enforce: `pre`
  });
  config.plugins = [
    extractCSS,
    new UglifyJsPlugin({
      sourceMap: true, // false returns errors.. -p + plugin conflict
      comments: false
    })
  ];
} else {
  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: `style-loader`
      },
      {
        loader: `css-loader`,
        options: {
          importLoaders: 1
        }
      },
      {
        loader: `postcss-loader`
      }
    ]
  });
  config.plugins = [
    new webpack.HotModuleReplacementPlugin()
  ];
}

module.exports = config;
