const log = (prefix: string, ...args) => {
  const _args = [`[${prefix}]`, ...args];
  console.log(..._args);
};

const warn = (prefix: string, ...args) => {
  const _args = [`[${prefix}]`, ...args];
  console.warn(..._args);
};

const error = (prefix: string, ...args) => {
  const _args = [`[${prefix}]`, ...args];
  console.error(..._args);
};

const info = (prefix: string, ...args) => {
  const _args = [`[${prefix}]`, ...args];
  console.info(..._args);
};

export { log, warn, error, info };
