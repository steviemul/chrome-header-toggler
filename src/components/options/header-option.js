class HeaderOption extends HTMLElement {

  connectedCallback() {
    this._state = {};

    this.update = this.update.bind(this);
    this.update();
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    this.update();
  }

  update() {
    this.innerHTML = this.template();
  }

  template() {
    return `
      <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
      <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
      `;
  }
}

window.customElements.define('header-option', HeaderOption);