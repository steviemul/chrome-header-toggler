const filterOptions = (options, origin) => {

  return options.filter((option) => {
    if (!option.host) return true;

    const hosts = option.host.split(',');

    for (let i=0;i<hosts.length;i++) {
      try {
        const host = hosts[i].trim();
        const hostUrl = new URL(host);
        const originUrl = new URL(origin);

        if (hostUrl.host === originUrl.host) {
          return true;
        }
      }
      catch (e) {}
    }

    return false;
  });
};

export {
  filterOptions
};