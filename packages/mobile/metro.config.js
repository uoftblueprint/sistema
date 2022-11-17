/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const { getDefaultConfig } = require("metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const {
    getMetroTools,
    getMetroAndroidAssetsResolutionFix,
} = require("react-native-monorepo-tools");
const monorepoMetroTools = getMetroTools();
const androidAssetsResolutionFix = getMetroAndroidAssetsResolutionFix();

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    projectRoot: path.resolve(__dirname, '../../'),
    transformer: {
        publicPath: androidAssetsResolutionFix.publicPath,
        getTransformOptions: async () => ({
          transform: {
            experimentalImportSupport: false,
            inlineRequires: false,
          },
        }),
        babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    watchFolders: monorepoMetroTools.watchFolders,
    resolver: {
        // Ensure we resolve nohoist libraries from this directory.
        blockList: exclusionList(monorepoMetroTools.blockList),
        extraNodeModules: monorepoMetroTools.extraNodeModules,
        assetExts: assetExts.filter(ext => ext !== "svg"),
        sourceExts: [...sourceExts, "svg"]
    },
    server: {
      // ...and to the server middleware.
      enhanceMiddleware: (middleware) => {
        return androidAssetsResolutionFix.applyMiddleware(middleware);
      },
    }
  };
})();
