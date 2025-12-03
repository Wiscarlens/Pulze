const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [],
  resolver: {
    blockList: [
      // Exclude android build folders from being watched
      /node_modules\/.*\/android\/build\/.*/,
      /android\/build\/.*/,
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
