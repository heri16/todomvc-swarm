var path = require('path');
var webpack = require('webpack');


RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};


var sourceRoot = path.resolve(__dirname, '.');
console.log('sourceRoot', sourceRoot);
var reSourceRoute = RegExp.escape(sourceRoot);
console.log('reSourceRoute', reSourceRoute);
module.exports = {
  entry: {
    vendor: [
      'swarm',
      'material-ui',
      'react-hot-loader'
      // 'font-awesome-webpack'
    ],
    dev: [
      'webpack-dev-server/client', 
      'webpack/hot/only-dev-server'
    ],
    app:[    
      './TodoApp'
    ]
    // ,
    // style:[    
    //  '../client/css/main.styl'
    // ]
  },
  devtool: 'source-map',
  devServer: {
    proxy: {
      '*': 'http://localhost:8000'
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: "http://localhost:8080/",
    chunkFilename: '[name].part.js'
  },
  externals: {
    'react': 'React',
    'react/addons': 'React',
    'react/lib/ReactMount': 'undefined'
  },
  resolveLoader: {
    modulesDirectories: ['..', 'node_modules']
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx?harmony'] },
      
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },

      // { test: /\.png$/,    loader: "url-loader?prefix=img/&limit=5000" },
      // { test: /\.jpg$/,    loader: "url-loader?prefix=img/&limit=5000" },
      // { test: /\.gif$/,    loader: "url-loader?prefix=img/&limit=5000" },
      // { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000" },
      // { test: /\.eot$/,    loader: "file-loader?prefix=font/" },
      // { test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
      // { test: /\.svg$/,    loader: "file-loader?prefix=font/" },
      
      { test: /\.html$/,    loader: "raw" },    
      { test: /\.coffee$/, loader: "coffee" }
      // , 
      // { test: new RegExp(reSourceRoute + '.*\\.js$'), loaders: ['simple-hot'] }

    ]
  }, 
  plugins: [    
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")

    // new ExtractTextPlugin("[name].css")
  ]
};

function test(it){
  var matches = it.indexOf(sourceRoot)==0;
  console.log('testing', it, matches);
  return matches; 
} 