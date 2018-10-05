export default [
  {
    value: 'devmode-active',
    header: 'x-occ-sf-env',
    on: {
      value: 'development',
      text: 'Dev mode on' 
    },
    off: {
      value: 'production',
      text: 'Dev mode off'
    } 
  },
  {
    value: 'local-layouts-active',
    header: 'x-occ-sf-layout-mode',
    on: {
      value: 'local',
      text: 'Using local layouts'
    },
    off: {
      value: undefined,
      text: 'Use local layouts'
    }
  }
];