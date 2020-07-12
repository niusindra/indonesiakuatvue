import Vue from 'vue';
import Vuetify, { VColorPickerSwatches } from 'vuetify/lib'; 

Vue.use(Vuetify); 
 
export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },

    theme: {
        white: true,
        themes: {
          light: {
            background: '#FFE0B2',
            background2: '#FFAB91',
            background3: '#FFF8E1',
          
            error: '#C62828',
            success: '#039BE5',
            warning: '#FF5252',
           
          }
        }
      }
});