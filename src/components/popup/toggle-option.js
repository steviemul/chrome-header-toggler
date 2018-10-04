
class ToggleOption extends HTMLElement {

  connectedCallback () {
    this.build = this.build.bind(this);
  }

  build (option, tabId, url) {
    this.innerHTML = this.template(option);  

    const checkbox = this.querySelector('input');

    chrome.runtime.sendMessage({query: option.value, url: url}, function(response) {
      checkbox.checked = response[option.value];
    });

    checkbox.addEventListener('change', (evt) => {
      chrome.runtime.sendMessage({action: option.value, value: evt.target.checked, tabId:tabId, url: url});
    });
  }

  template (option) {
    return `
      <div class="option">
        <input type="checkbox" id="chk-${option.value}" class="switch-input">
        <label for="chk-${option.value}" class="switch-label">
          <span class="toggle--on">${option.on.text}</span>
          <span class="toggle--off">${option.off.text}</span>
        </label>
      </div>`;
  }
}

window.customElements.define('toggle-option', ToggleOption);