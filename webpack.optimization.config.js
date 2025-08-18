const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  // Production optimizations
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: process.env.NODE_ENV === 'production',
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info', 'console.debug']
          },
          mangle: {
            safari10: true
          },
          format: {
            comments: false
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ],

    // Code splitting configuration
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true
        },

        // React and React-DOM
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 20,
          reuseExistingChunk: true
        },

        // Chart.js and visualization libraries
        charts: {
          test: /[\\/]node_modules[\\/](chart\.js|react-chartjs-2|d3)[\\/]/,
          name: 'charts',
          chunks: 'all',
          priority: 15,
          reuseExistingChunk: true
        },

        // Calculator modules
        calculators: {
          test: /[\\/]src[\\/]calculators[\\/]/,
          name: 'calculators',
          chunks: 'async',
          priority: 5,
          minChunks: 1,
          reuseExistingChunk: true
        },

        // Common utilities
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },

    // Runtime chunk optimization
    runtimeChunk: {
      name: 'runtime'
    },

    // Module concatenation
    concatenateModules: true,

    // Side effects optimization
    sideEffects: false,

    // Tree shaking
    usedExports: true
  },

  // Performance hints
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000, // 500kb
    maxAssetSize: 512000, // 500kb
    assetFilter: (assetFilename) => {
      return !assetFilename.endsWith('.map');
    }
  },

  // Plugins for optimization
  plugins: [
    // Bundle analyzer (only in analyze mode)
    ...(process.env.ANALYZE === 'true' ? [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'bundle-report.html'
      })
    ] : []),

    // Compression
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),

    // Define environment variables
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
      'process.env.VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0')
    }),

    // Module federation for micro-frontends (if needed)
    new webpack.container.ModuleFederationPlugin({
      name: 'calculator_platform',
      filename: 'remoteEntry.js',
      exposes: {
        './CalculatorEngine': './src/engines/CalculatorEngine',
        './ValidationEngine': './src/engines/ValidationEngine',
        './MortgageCalculator': './src/calculators/finance/mortgage/MortgageCalculator',
        './InvestmentCalculator': './src/calculators/finance/investment/PortfolioCalculator'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.0.0'
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0'
        }
      }
    }),

    // Preload webpack plugin for critical resources
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Ignore moment.js locales to reduce bundle size
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    })
  ],

  // Resolve optimizations
  resolve: {
    // Module resolution optimization
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],

    // Extension resolution order
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],

    // Alias for common imports
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@calculators': path.resolve(__dirname, 'src/calculators'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@hooks': path.resolve(__dirname, 'src/hooks')
    },

    // Fallback for Node.js modules in browser
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer")
    }
  },

  // Module rules for optimization
  module: {
    rules: [
      // TypeScript/JavaScript optimization
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
                  },
                  modules: false,
                  useBuiltIns: 'usage',
                  corejs: 3
                }],
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                ['@babel/plugin-transform-runtime', {
                  regenerator: true
                }],
                // Tree shaking for lodash
                ['babel-plugin-lodash'],
                // Remove console.log in production
                ...(process.env.NODE_ENV === 'production' ? [
                  ['babel-plugin-transform-remove-console', {
                    exclude: ['error', 'warn']
                  }]
                ] : [])
              ],
              cacheDirectory: true,
              cacheCompression: false
            }
          }
        ]
      },

      // CSS optimization
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: process.env.NODE_ENV === 'production' 
                  ? '[hash:base64:5]' 
                  : '[name]__[local]--[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'tailwindcss',
                  'autoprefixer',
                  ...(process.env.NODE_ENV === 'production' ? [
                    ['cssnano', {
                      preset: ['default', {
                        discardComments: { removeAll: true },
                        normalizeWhitespace: true
                      }]
                    }]
                  ] : [])
                ]
              }
            }
          }
        ]
      },

      // Image optimization
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8192 // 8kb
          }
        },
        generator: {
          filename: 'images/[name].[hash:8][ext]'
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 85
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 85
              }
            }
          }
        ]
      },

      // Font optimization
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      }
    ]
  },

  // Cache configuration
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    },
    cacheDirectory: path.resolve(__dirname, '.webpack-cache')
  },

  // Development server optimization
  devServer: {
    compress: true,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/'
    }
  },

  // Source map optimization
  devtool: process.env.NODE_ENV === 'production' 
    ? 'source-map' 
    : 'eval-cheap-module-source-map',

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production'
      ? 'js/[name].[contenthash:8].js'
      : 'js/[name].js',
    chunkFilename: process.env.NODE_ENV === 'production'
      ? 'js/[name].[contenthash:8].chunk.js'
      : 'js/[name].chunk.js',
    assetModuleFilename: 'assets/[name].[hash:8][ext]',
    clean: true,
    publicPath: '/'
  }
};

// Performance budget configuration
const performanceBudget = {
  // Maximum sizes for different asset types
  maxAssetSize: {
    js: 250000,      // 250kb for JS files
    css: 100000,     // 100kb for CSS files
    images: 500000,  // 500kb for images
    fonts: 100000    // 100kb for fonts
  },
  
  // Maximum total bundle size
  maxBundleSize: 1000000, // 1MB total
  
  // Performance thresholds
  thresholds: {
    firstContentfulPaint: 2000,  // 2 seconds
    largestContentfulPaint: 4000, // 4 seconds
    firstInputDelay: 100,         // 100ms
    cumulativeLayoutShift: 0.1    // 0.1 CLS score
  }
};

module.exports.performanceBudget = performanceBudget;