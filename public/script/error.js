document.addEventListener("DOMContentLoaded", () => {
  window.onerror = function (messageOrEvent, source, lineno, colno, error) {
    let err = {
      message: messageOrEvent,
      error: {
        code: error.code,
        message: error.message,
        name: error.name,
        stack: error.stack
      },
      source: source,
      line: lineno,
      column: colno
    };
    if (pathVue && pathVue.$pathPouch)
      pathVue.$pathPouch.exceptions.save(err);
    return true;
  };
});
