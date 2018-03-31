import { keyframes, style } from 'typestyle';

export const loaderAnimation = keyframes({
  '0%': {
    '-webkit-transform': 'rotate(0deg)',
    transform: 'rotate(0deg)'
  },
  '100%': {
    '-webkit-transform': 'rotate(360deg)',
    transform: 'rotate(360deg)'
  }
});

export const loaderClass = style({
  color: '#eeeeee',
  fontSize: 11,
  textIndent: '-99999em',
  margin: '55px auto',
  position: 'relative',
  width: '10em',
  height: '10em',
  borderRadius: '50%',
  boxShadow: 'inset 0 0 0 1em',
  '-webkit-transform': 'translateZ(0)',
  '-ms-transform': 'translateZ(0)',
  transform: 'translateZ(0)',
  $nest: {
    '&:after, &:before': {
      borderRadius: '50%',
      position: 'absolute',
      content: "''"
    },
    '&:before': {
      width: '5.2em',
      height: '10.2em',
      background: '#ffffff',
      borderRadius: '10.2em 0 0 10.2em',
      top: '-0.1em',
      left: '-0.1em',
      '-webkit-transform-origin': '5.2em 5.1em',
      transformOrigin: '5.2em 5.1em',
      '-webkit-animation': `${loaderAnimation} 2s infinite ease 1.5s`,
      animation: `${loaderAnimation} 2s infinite ease 1.5s`
    },
    '&:after': {
      width: '5.2em',
      height: '10.2em',
      background: '#ffffff',
      borderRadius: '0 10.2em 10.2em 0',
      top: '-0.1em',
      left: '5.1em',
      '-webkit-transform-origin': '0px 5.1em',
      transformOrigin: '0px 5.1em',
      '-webkit-animation': `${loaderAnimation} 2s infinite ease`,
      animation: `${loaderAnimation} 2s infinite ease`
    }
  }
});

export const spinnerContainerClass = style({
  textAlign: 'center',
  marginTop: 20
});
