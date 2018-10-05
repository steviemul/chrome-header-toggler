const defaultState = {
  options: []
};

let configEditor;

const buildDefaultOption = () => {

  return {
    host: '',
    description: '',
    value: '',
    header: '',
    on: {
      value: '',
      text: ''
    },
    off: {
      value: '',
      text: ''
    }
  }
};

const onOpen = () => {
  const headerOptions = document.querySelector('header-options');

  configEditor.set(headerOptions.state);
};

const onClose = () => {

  const headerOptions = document.querySelector('header-options');

  try {
    const config = configEditor.get()

    headerOptions.state = config;
  }
  catch (e) {}
}

const addOption = () => {
  const headerOptions = document.querySelector('header-options');

  const state = headerOptions.state || defaultState;
  
  state.options.push(buildDefaultOption());

  headerOptions.state = state;
};

 document.addEventListener('DOMContentLoaded', function () {
   document.getElementById('addOption').addEventListener('click', addOption);

   const options = {
     onOpenStart : onOpen,
     onCloseEnd : onClose
   };

   const dialog = document.getElementById('importExport');

   M.Modal.init(dialog, options);

   const txtConfig = document.getElementById('txtConfig');

   configEditor = new JSONEditor(txtConfig, {modes: ['code', 'tree']});
 });

