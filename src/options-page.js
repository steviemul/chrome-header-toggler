const optionsState = {
  options: []
};

const buildDefaultOption = () => {

  return {
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

  optionsState.options.push(buildDefaultOption());

  headerOptions.state = optionsState;
};

 document.addEventListener('DOMContentLoaded', function () {
   document.getElementById('addOption').addEventListener('click', addOption);
 });

