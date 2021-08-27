import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

// import { createStore } from 'vuex';
// import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'



// const store = new createStore({
//     state: {
//       rawData: 'jamon',
//       calculatedData: null
//     },
//     mutations: {
      
//     },
//     plugins: [
//         createPersistedState({
//           getState: (key) => Cookies.getJSON(key),
//           setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
//         })
//       ]
//   })

//   createApp(App).use(router).use(store).mount('#app')
  createApp(App).use(router).mount('#app')