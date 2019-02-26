module.exports = {
  pwa: {
    name: "Data Collector",
    themeColor: "#000000"
  },
  productionTip = true,
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  errorHandler = (error, vm, info) => {
    debugger;
    vm.$pathPouch.exceptions.save(error);
  },
  warnHandler = function (msg, vm, trace) {
    debugger;
    vm.$pathPouch.exceptions.save({
      message: msg,
      stack: trace
    });
  }
};
