import { extendTheme, StyleProps, useBreakpointValue } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  xs: '20rem',
  sm: '30rem',
  md: '48rem',
  lg: '64rem',
  xl: '75rem',
  xxl: '90rem',
})

export const theme = extendTheme({
  breakpoints,
  initialColorMode: 'dark',
  useSystemColorMode: false,
  shadows: {
    ourDark: '0px 8px 16px rgba(0, 0, 0, 0.25);',
    light: '2px 4px 8px rgba(0, 0, 0, 0.12);',
  },
  colors: {
    brand: {
      '100': '#1F1B2C80',
      '200': '#1F1B2C99',
      '300': '#1F1B2CB2',
      '400': '#1F1B2CCC',
      '500': '#1F1B2CE5',
      '600': '#1F1B2C',
    },
    skeleton: {
      end: 'rgba(35, 34, 52, 1)',
      start: 'rgba(56, 55, 72, 1)',
    },
    success: {
      main: '#296251',

      '200': '#3E6957',
    },
    warning: {
      main: '#941B0B',
      '200': '#EA9A91',
      '100': '#FDDCDE',
    },
    button: {
      nonActive: '#383748',
    },
    background: {
      paper: '#232234',
      white: '#F1EEF9',
    },
    info: {
      main: '#F1EEF9',
      '200': '#F1EEF9',
    },
    text: {
      primary: '#F1EEF9',
      secondary: '#8ECB7E',
      buttonNonActive: '#9492A0',
      button_back: '#9492A0',
    },
    icon: { gray: '#A5A5AC' },
    active: {
      primary: '#985EFF',
      secondary: '#BD5EF8',
    },
    nonactive: {
      lines: '#1F1B2C33',
      text: '#1F1B2C66',
      background: '#F7F9F9',
      tertiary: '#BD5EF8',
    },
    indicator: {
      primary: '#2669FF',
      secondary: '#D2369D',
    },
    gradient: {
      primary:
        'linear-gradient(90.07deg, #A265F2 -16.29%, #985EFF -9.5%, #EA9A91 118.76%, rgba(225, 147, 157, 0.77) 127.64%)',
    },
    //light
  },
  styles: {
    global: (props: StyleProps) => {
      return {
        h1: {
          fontSize: '2.125rem',
          lineHeight: '2.5rem',
          letterSpacing: '0.0156rem',
          fontWeight: 400,
        },
        h2: {
          fontSize: '1.5rem',
          lineHeight: '2rem',
          letterSpacing: '0rem',
          fontWeight: 400,
        },

        h3: {
          fontSize: '1.25rem',
          lineHeight: '1.625rem',
          letterSpacing: '0.0094rem',
          fontWeight: 500,
        },
        h4: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          letterSpacing: '0.0094rem',
          fontWeight: 400,
        },
        h5: {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          letterSpacing: '0.0063rem',
          fontWeight: 500,
        },
        p: {
          fontSize: '1rem',
          lineHeight: '1.25rem',
          letterSpacing: '0.0313rem',
          fontWeight: 400,
        },
        span: {
          fontSize: '1rem',
          lineHeight: '1.25rem',
          letterSpacing: '0.0313rem',
          fontWeight: 400,
        },
        button: {
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          letterSpacing: '0.0781rem',
          fontWeight: 500,
          textTransform: 'capitalize',
        },
        caption: {
          fontSize: '0.75rem',
          lineHeight: '1.125rem',
          letterSpacing: '0.025rem',
          fontWeight: 400,
        },
      }
    },
  },
  components: {
    Text: {
      baseStyle: {
        color: 'text.primary',
      },
      variants: {
        h: {
          fontSize: '3.125rem',
          lineHeight: '1.5rem',
          letterSpacing: '0rem',
          fontWeight: 'semibold',
        },
        h1: {
          fontSize: '2.125rem',
          lineHeight: '2.5rem',
          letterSpacing: '0.016rem',
          fontWeight: 'normal',
        },
        h2: {
          fontSize: '1.5rem',
          lineHeight: '2rem',
          letterSpacing: '0rem',
          fontWeight: 'normal',
        },
        h3: {
          fontSize: '1.25rem',
          lineHeight: '1.625rem',
          letterSpacing: '0.009rem',
          fontWeight: 'medium',
        },
        hb: {
          fontSize: '1rem',
          lineHeight: '1.125rem',
          letterSpacing: '0.063rem',
          fontWeight: 'semibold',
        },
        s1: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
          letterSpacing: '0.009rem',
          fontWeight: 'normal',
        },
        s2: {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          letterSpacing: '0.006rem',
          fontWeight: 'medium',
        },
        b1: {
          fontSize: '1rem',
          lineHeight: '1.25rem',
          letterSpacing: '0.031rem',
          fontWeight: 'normal',
        },
        b2: {
          fontSize: '0.875rem',
          lineHeight: '1.125rem',
          letterSpacing: '0.016rem',
          fontWeight: 'normal',
        },

        btn: {
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          letterSpacing: '0.078rem',
          fontWeight: 'medium',
        },
        caption: {
          fontSize: '0.75rem',
          lineHeight: '1.125rem',
          letterSpacing: '0.025rem',
          fontWeight: 'normal',
        },
        mini: {
          fontSize: '0.75rem',
          lineHeight: '0.875rem',
          letterSpacing: '0.025rem',
          fontWeight: 'semibold',
        },
        smallest: {
          fontSize: '0.625rem',
          lineHeight: '0.75rem',
          letterSpacing: '0.038rem',
          fontWeight: 'bold',
        },
      },
    },
    Button: {
      baseStyle: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        letterSpacing: '0.078rem',
        fontWeight: 'medium',
        _focus: { boxShadow: 'none', opacity: 0.9 },
        _hover: { boxShadow: 'none', opacity: 0.8 },
        _active: { opacity: 0.65 },
      },
      variants: {
        purple: {
          backgroundColor: 'active.primary',
          color: 'white',
          fontWeight: 'semibold',
          textTransform: 'none',
        },
        blue: {
          backgroundColor: 'indicator.primary',
          color: 'white',
          textTransform: 'none',
          _disabled: { opacity: 0.5, backgroundColor: 'indicator.primary' },
        },
        ghost: {
          color: 'text.primary',
          _hover: { backgroundColor: 'transparent' },
          _active: { backgroundColor: 'transparent' },
          _focus: { backgroundColor: 'transparent' },
        },
        filled: {
          bgColor: 'background.paper',
          color: 'text.primary',
          _hover: { bgColor: 'background.paper' },
          _active: { bgColor: 'background.paper' },
          _focus: { bgColor: 'background.paper' },
        },
      },
    },
    IconButton: {
      defaultProps: {
        _focus: { boxShadow: 'none', opacity: 0.9 },
        _hover: { boxShadow: 'none', opacity: 0.8 },
        _active: { opacity: 0.65 },
        bg: 'button.nonActive',
        color: 'text.primary',
      },
      variants: {
        grayTheme: {
          bgColor: 'button.nonActive',
          color: 'text.primary',
        },
      },
    },
    Switch: {
      baseStyle: {
        track: {
          _focus: {
            boxShadow: 'none',
          },
        },
      },
    },
  },
})

export const modalSize = createBreakpoints({
  xs: 'full',
  sm: 'full',
  md: 'md',
  lg: 'md',
  xl: 'md',
  xxl: 'md',
})
