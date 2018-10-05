class ToggleOptions extends HTMLElement {

  connectedCallback() {
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tabId = tabs[0].id;
      const url = tabs[0].url;

      chrome.storage.sync.get({options:[]}, (state) => {
        if (state.options.length > 0) {
          state.options.forEach((option) => {
            const optionElement = document.createElement('toggle-option');

            optionElement.build(option, tabId, url);

            this.appendChild(optionElement);
          });
        }
      });
    });
  }
}

window.customElements.define('toggle-options', ToggleOptions);