import {filterOptions} from './utils.js';

let options = [];

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

const addWebRequestListener = () => {
  chrome.webRequest.onBeforeSendHeaders.addListener(
    requestHandler , {
      urls: ["<all_urls>"]
    },
    ["blocking", "requestHeaders"]
  );
};

const addMessageListeners = () => {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    options.forEach((option) => {
      if (request.query === option.value) {
        sendResponse({
          [option.value]: (getStoredValue(request.url, option.value)) === 'true'
        });
      } else if (request.action === option.value) {
        localStorage.setItem(encodeProperty(request.url, option.value), request.value);

        if (request.tabId) {
          sendToTab(request.tabId, request);
        }
      }
    });
  });
};

const checkOptions = (state, tabId, tab) => {

  const filteredOptions = filterOptions(state.options, tab.url);

  if (filteredOptions.length > 0) {
    options = filteredOptions;

    chrome.pageAction.setTitle({
      tabId: tabId,
      title: 'Chrome Header Toggler'
    });

    chrome.pageAction.setPopup({
      tabId: tabId,
      popup: 'html/popup.html'
    });
  }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  chrome.pageAction.show(tabId);

  chrome.storage.sync.get({options:[]}, (state) => {
    checkOptions(state, tabId, tab);
  });
  
});

addWebRequestListener();
addMessageListeners();

const sendToTab = (tabId, payload) => {

  chrome.tabs.sendMessage(tabId, payload, () => {
    console.info('message acknowledge');
  });
};