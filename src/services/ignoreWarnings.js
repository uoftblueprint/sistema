// Ignore non-breaking error logs
if (__DEV__) {
  const ignoreWarns = [
    'VirtualizedLists should never be nested inside plain ScrollViews',
  ];

  if (global && global.console && global.console.error) {
    const errorWarn = global.console.error;
    global.console.error = (...arg) => {
      if (arg) {
        for (const error of ignoreWarns) {
          if (
            error &&
            error[0] &&
            typeof error[0] === 'string' &&
            error[0].startsWith(error)
          ) {
            return;
          }
        }
        errorWarn(...arg);
      }
    };
  }
}
