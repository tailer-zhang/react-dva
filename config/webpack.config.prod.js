'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = 'static/css/[name].[contenthash:8].css';

const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ?
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

module.exports = {
  bail: true,
  devtool: shouldUseSourceMap ? 'source-map' : false,
  entry: [require.resolve('./polyfills'), paths.appIndexJs],
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path
        .relative(paths.appSrc, info.absoluteResourcePath)
        .replace(/\\/g, '/'),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
        'actions': path.resolve(__dirname, '../src/actions'),
        'components': path.resolve(__dirname, '../src/components'),
        'pages': path.resolve(__dirname, '../src/pages'),
        'reducers': path.resolve(__dirname, '../src/reducers'),
        'utils': path.resolve(__dirname, '../src/utils'),
        'routers': path.resolve(__dirname, '../src/routers')
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      // {
      //   test: /\.(js|jsx|mjs)$/,
      //   enforce: 'pre',
      //   use: [
      //     {
      //       options: {
      //         formatter: eslintFormatter,
      //         eslintPath: require.resolve('eslint'),
      //
      //       },
      //       loader: require.resolve('eslint-loader'),
      //     },
      //   ],
      //   include: paths.appSrc,
      // },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 1000,
              name: 'static/images/[name].[hash:8].[ext]',
            },
          },
            {
                test: /\.(svg)$/i,
                loader: 'svg-sprite-loader',
                include: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. svg files of antd-mobile
                    // path.resolve(__dirname, '../src/'),  // folder of svg files in your project
                ]
            },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
            },
          },
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]--[hash:base64:5]'
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
                                }),
                                require('postcss-pxtorem')({
                                    rootValue: 75,
                                    propWhiteList: ['*']
                                }),
                                require('precss')
                            ],
                        },
                    }
                ],
            },
            {
                test: /\.less$/,
                exclude: path.resolve(__dirname, '../node_modules'),
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
                                }),
                                require('postcss-pxtorem')({ rootValue: 75, propWhiteList: ['*'] }),
                            ],
                        },
                    },
                    {
                        loader:require.resolve('less-loader'),
                        options:{
                            javascriptEnabled: true,
                        }
                    }
                ],
            },
            {
                test: /\.less$/,
                include: [path.resolve(__dirname, '../node_modules/')],
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
                                }),
                                require('postcss-pxtorem')({ rootValue: 75,  propWhiteList: ['*'] }),
                            ],
                        },
                    },
                    {
                        loader:require.resolve('less-loader'),
                        options:{
                            modifyVars:require(path.resolve(__dirname, '../theme.js')),
                            javascriptEnabled: true,
                        }
                    }
                ],
            },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/,/\.less$/, /\.svg$/],
            options: {
              name: 'static/css/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
        hash: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: shouldUseSourceMap,
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }
        console.log(message);
      },
      minify: true,
      navigateFallback: publicUrl + '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
