import options from './options.js';

console.log('loading bg');

const encodeProperty = (url, property) => {

  const origin = new URL(url).origin;

  const propertyString = [origin, property].join('|');

  return btoa(propertyString);
};

const getStoredValue = (url, key) => {
  return localStorage.getItem(encodeProperty(url, key))
};

const requestHandler = (details) => {

  options.forEach((option) => {
    const header = ((getStoredValue(details.url, option.value)) === 'true') ? option.on.value : option.off.value;

    if (header) {
      details.requestHeaders.push({
        name: option.header,
        value: header
      })
    }
  });

  return {
    requestHeaders: details.requestHeaders
  };  
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.pageAction.show(tabId);
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  requestHandler , {
    urls: ["<all_urls>"]
  },
  ["blocking", "requestHeaders"]
);

const sendToTab = (tabId, payload) => {

  chrome.tabs.sendMessage(tabId, payload, () => {
    console.info('message acknowledge');
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  options.forEach((option) => {
    if (request.query === option.value) {
      sendResponse({[option.value]: (getStoredValue(request.url, option.value)) === 'true'});  
    }
    else if (request.action === option.value) {
      localStorage.setItem(encodeProperty(request.url, option.value), request.value);

      if (request.tabId) {
        sendToTab(request.tabId, request);
      }
    }
  });
});