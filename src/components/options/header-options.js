import template from './options-template.js';

const createChild = (state) => {
  const child = document.createElement('li');

  updateChild(child, state);

  return child;
};

const applyBindings = (child, state) => {

  const boundInputs = child.querySelectorAll('[data-bind]');

  boundInputs.forEach((input) => {
    const statePath = input.getAttribute('data-bind').split('.');
    let current = state;

    input.value = statePath.reduce((current, path, index) => {
      if ((index + 1) < statePath.length) {
        current = current[path];
      }
      else {
        input.addEventListener('change', (evt) => {
          current[path] = evt.target.value;
        });

        return current[path] || '';
      }

      return current;
    }, state);

    console.log(statePath);
  });
};

const getDescription = (state) => {

  if (state.description){
    const hosts = state.host ? `(${state.host})` : '(All hosts)'
    return `${state.description} ${hosts}`
  }

  return 'Incomplete Header';
};

const updateChild = (child, state) => {

  child.innerState = state;

  child.innerHTML = `
    <div class="collapsible-header row">
      <div class="col s10 valign-wrapper">
        <i class="material-icons">build</i>${getDescription(state)}
      </div>
      <div class="col s2 valign-wrapper">
        <a class="btn-flat waves-effect waves-light" title="save" style="color:#1B5E20">
          <i class="material-icons">check_circle_outline</i>
        </a>
        <a class="btn-flat waves-effect waves-light" title="delete" style="color:#B71C1C">
          <i class="material-icons">highlight_off</i>
        </a>
      </div>
    </div>
    <div class="collapsible-body">${template}</div>
  `;

  applyBindings(child, state);
};

class HeaderOptions extends HTMLElement {

  connectedCallback() {

    this.update = this.update.bind(this);
    this.clickHandler = this.clickHandler.bind(this);

    this.root = document.createElement('ul');
    this.root.classList.add('collapsible');

    this.appendChild(this.root);

    M.Collapsible.init(this.root, {accordion:false});

    chrome.storage.sync.get({options:[]}, (state) => {
      this._state = state;
      this.update();
    });
  }

  clickHandler (evt) {

    if (evt.target.nodeName === 'I') {
      const clicker = evt.target.closest('a');

      if (clicker.title === 'save') {
        this.update();
      }
      else if (clicker.title === 'delete') {
        const option = clicker.closest('li').innerState;
        const position = this._state.options.indexOf(option);
        
        this._state.options.splice(position, 1);
        this.update();
      }

      evt.preventDefault();
      evt.stopPropagation();
      return false;
    }
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
      let current = 0;

      this._state.options.forEach((option, index) => {
        let childNode = this.root.childNodes[current++];

        if (!childNode) {
          childNode = createChild(option);
          childNode.addEventListener('click', this.clickHandler);

          this.root.appendChild(childNode);
        }
        else {
          updateChild(childNode);
        }
      });

      const remove = this.root.childNodes.length - (current);

      if (remove > 0) {
        for (let i=0;i < remove;i++) {
          this.root.removeChild(this.root.lastChild);
        }
      }
    }

    chrome.storage.sync.set(this._state, () => {
      console.info('state saved successfully');
    });
  }

}

window.customElements.define('header-options', HeaderOptions);