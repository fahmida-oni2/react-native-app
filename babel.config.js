module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // If you use any other plugins, put them ABOVE reanimated
      "react-native-reanimated/plugin", 
    ],
  };
};