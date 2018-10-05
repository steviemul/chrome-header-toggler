const createChild = (state) => {
  const child = document.createElement('li');

  updateChild(child, state);

  return child;
};

const inputFields = () => {

  return `
    <div class="row">
      <form class="col s12">
        <div class="row">
           <div class="col s12">
            <label>Description</label>
            <input type="text" data-bind="description" class="validate">
          </div>
          <div class="col s12">
            <label>Host/s</label>
            <input type="text" data-bind="host" required>
          </div>
        </div>
        <div class="row section-label">
          <div class="col s12">
            <h6>Header Details</h6>
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            <label>Header Name</label>
            <input type="text" data-bind="header">
          </div>
          <div class="col s6">
            <label>Option Name</label>
            <input type="text" data-bind="value">
          </div>
        </div>

        <div class="row section-label">
          <div class="col s12">
            <h6>On</h6>
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            <label>Option Value</label>
            <input type="text" data-bind="on.value">
          </div>
          <div class="col s6">
            <label>Option Text</label>
            <input type="text" data-bind="on.text">
          </div>
        </div>

        <div class="row section-label">
          <div class="col s12">
            <h6>Off</h6>
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            <label>Option Value</label>
            <input type="text" data-bind="off.value">
          </div>
          <div class="col s6">
            <label>Option Text</label>
            <input type="text" data-bind="off.text">
          </div>
        </div>
      </form>
      
    </div>
  `;
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

const updateChild = (child, state) => {

  child.innerState = state;

  child.innerHTML = `
    <div class="collapsible-header row">
      <div class="col s10 valign-wrapper">
        <i class="material-icons">build</i>${state.description ? state.description : 'Header'}
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
    <div class="collapsible-body">${inputFields(state)}</div>
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
        const li = clicker.closest('li');
        const position = Array.from(li.parentNode.children).indexOf(li);

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