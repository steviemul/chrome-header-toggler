class HeaderOptions extends HTMLElement {

  connectedCallback() {
    this._state = {};

    this.update = this.update.bind(this);

    this.root = document.createElement('ul');

    this.root.classList.add('collapsible');

    this.appendChild(this.root);

    this.update();

    M.Collapsible.init(this.root, {accordion:false});
  }

  get state () {
    return this._state;
  }

  set state (state) {
    this._state = state;
    this.update();
  }

  update () {
    
    while (this.root.firstChild) {
      this.root.removeChild(this.root.firstChild);
    }
    
    if (this._state.options) {
      this._state.options.forEach((option) => {
        const headerOption = document.createElement('li');

        headerOption.innerHTML = `
          <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
          <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        `;

        this.root.appendChild(headerOption);
      });
    }
  }
}

window.customElements.define('header-options', HeaderOptions);