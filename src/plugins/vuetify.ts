import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/es5/util/colors';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3aa65e',
        secondary: '#848484',
        accent: '#FF8000',
        error: '#B20000',
        info: '#2196F3',
        success: '#397D02',
        warning: '#FFFF99',
        menubar: '#E4EDF5',
        textcolor: '#1A237E',
      },
      dark: {
        primary: colors.green.lighten3,
        secondary: '#ff0000',
      },
    },
  },
  icons: {
    iconfont: 'md', // default - only for display purposes
  },
  
});
