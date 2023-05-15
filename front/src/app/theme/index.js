import { createTheme as createMuiTheme } from '@mui/material';
import { createPalette } from './create-palette';
import { createTypography } from './create-typography';
import { createComponents } from '@/app/theme/create-components';
import { createShadows } from '@/app/theme/create-shadows';


export const createTheme = () => {
  const palette = createPalette();
  const typography = createTypography();
  const components = createComponents({ palette });
  const shadows = createShadows();

  const breakpoints = {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440
    }
  };

  

  return createMuiTheme({
    breakpoints,
    palette,
    typography,
    components,
    shadows,
    shape: {
      borderRadius: 8
    },
  })
};