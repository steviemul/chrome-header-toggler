class HeaderOptions extends HTMLElement {

  connectedCallback() {
    this.build = this.build.bind(this);
    this.build();
  }

  build (option, tabId, url) {
    this.innerHTML = this.template();
  }

  template (){
    return `
      <div class="options">
        <p>add</p>
        <input type="button>Add</input>
      </div>`;
  }
}

window.customElements.define('header-options', HeaderOptions);