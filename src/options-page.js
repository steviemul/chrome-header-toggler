const defaultState = {
  options: []
};

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

const addOption = () => {
  const headerOptions = document.querySelector('header-options');

  const state = headerOptions.state || defaultState;
  
  state.options.push(buildDefaultOption());

  headerOptions.state = state;
};

 document.addEventListener('DOMContentLoaded', function () {
   document.getElementById('addOption').addEventListener('click', addOption);
 });

