const Colors = {
  primary: 'rgba(240, 247, 238, 1)',
  primaryDark: 'rgba(153, 158, 152, 1)',
  primaryLight: 'rgba(245, 249, 244, 1)',
  secondary: 'rgba(97, 152, 142, 1)',
  secondaryDark: 'rgba(62, 97, 91, 1)',
  secondaryLight: 'rgba(154, 189, 183, 1)',
  accent: 'rgba(120, 89, 100, 1)',
  accentDark: 'rgba(77, 57, 64, 1)',
  accentLight: 'rgba(169, 149, 156, 1)',
  gray: 'rgba(221, 213, 208, 1)',
  grayDark: 'rgba(141, 136, 133, 1)',
  grayLight: 'rgba(233, 228, 225, 1)',
  black: 'rgba(40, 35, 28, 1)',
  blackDark: 'rgba(26, 23, 18, 1)',
  blackLight: 'rgba(118, 115, 110, 1)',
  red: 'red',
  maskFrameBackgroundColor: 'rgba(1,1,1,0.6)',
  transparent: 'transparent',
  maskOuterBackgroundColor: 'white',
};

function getColorOpacity(color, opacity) {
  const colorArraySplitByComma = color.split(',');

  colorArraySplitByComma[colorArraySplitByComma.length - 1] = ` ${opacity})`;

  const colorWithOpacity = colorArraySplitByComma.join(',');
  return colorWithOpacity;
}

Colors.getColorOpacity = getColorOpacity;

export default Colors;

/* Coolors Exported Palette - coolors.co/61988e-785964-f0f7ee-ddd5d0-28231c */
/* Coolors Exported light Palette - coolors.co/9abdb7-a9959c-f5f9f4-e9e4e1-76736e */
/* Coolors Exported dark Palette - coolors.co/3e615b-4d3940-999e98-8d8885-1a1712 */
