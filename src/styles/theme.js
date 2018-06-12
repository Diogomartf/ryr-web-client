const colorPalette = {
  primaryColor: '#4a7fde',
  secondaryColor: '#5F6771',
  gray: ['#444', '#555', '#666', '#999', '#CFCFCF', '#eee', '#F5F5F5'],
  black: '#394047',
  dirtyWhite: '#f3f3f3',
  red: '#ff6767',
  yellow: '#ffecaf',
  brown: '#856404',
  lightGreen: '#d4edda',
  green: '#4c7d56'
};

const colors = {
  primaryColor: colorPalette.primaryColor,
  secondaryColor: colorPalette.secondaryColor,
  black: colorPalette.black,
  dirtyWhite: colorPalette.dirtyWhite,
  gray: colorPalette.gray,
  red: colorPalette.red,
  yellow: colorPalette.yellow,
  brown: colorPalette.brown,
  lightGreen: colorPalette.lightGreen,
  green: colorPalette.green,

  boxShadow: '0 5px 30px rgba(156,160,171,0.25)',
  boxShadowLight: '0 5px 12px rgba(156,160,171,0.22)',
  divider: colorPalette.gray[4],
  rangeTrack: colorPalette.secondaryColor,
  rangeHandle: colorPalette.gray[1],
  rangeHandleBorder: colorPalette.gray[1],
  cardBg: colorPalette.dirtyWhite,
  primaryButton: colorPalette.primaryColor,
  secondaryButton: colorPalette.secondaryColor,
  primaryLink: colorPalette.primaryColor,
  secondaryLink: colorPalette.gray[3],
  loading: colorPalette.secondaryColor,
  avatarBg: colorPalette.gray[5]
};

const font = {
  family: "'Noto Sans', sans-serif"
};

const shadows = [
  '0 5px 30px rgba(156,160,171,0.25)',
  '0 5px 12px rgba(156,160,171,0.22)'
];

const borders = [0, '1px solid', `2px solid ${colorPalette.gray[5]}`];

const fontSizes = [12, 14, 16, 20, 24, 34, 48, 64, 72, 96];

const breakpoints = [32, 40, 48, 64, 80].map(n => n + 'em');

const elements = {
  font,
  borderRadius: '3px',
  select: {
    color: colorPalette.gray[5]
  },
  input: {
    color: colorPalette.gray[5],
    backgroundColor: colors.white
  },
  text: {
    color: colors.black,
    noteColor: colorPalette.gray[3]
  },
  searchNavBar: {
    backgroundColor: colors.dirtyWhite
  },
  label: {
    color: colors.black
  },
  shadows
};

const theme = {
  colors,
  borders,
  elements,
  fontSizes,
  breakpoints
};

export default theme;
