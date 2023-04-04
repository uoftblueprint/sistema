// Ignore non-breaking error logs
if (__DEV__) {
  const ignoreWarns = [
    'VirtualizedLists should never be nested inside plain ScrollViews',
  ];

  const errorWarn = global.console.error;
  global.console.error = (...arg) => {
    for (const [index, error] of ignoreWarns) {
      if (arg[0].startsWith(error)) {
        return;
      } else {
        return {
          ...arg,
          key: index,
        };
      }
    }
    errorWarn(...arg);
  };
}
