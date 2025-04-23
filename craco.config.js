module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Отключаем проверку на импорты вне src
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ModuleScopePlugin'
      );
      return webpackConfig;
    },
  },
}; 