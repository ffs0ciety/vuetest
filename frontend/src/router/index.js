import { createWebHistory, createRouter } from "vue-router";
import vueConfig from "../../vue.config.js"

import Home from "../views/Home.vue";
import Results from "../views/Results.vue";

const routes = [
    {
      path : vueConfig.publicPath,
      name : "home",
      component : Home,
    },
    {
      path : vueConfig.publicPath + 'results',
      name : "results",
      component : Results,
      beforeEnter: async (to, from, next) => {
        if(window.sessionStorage.getItem('rawData') == undefined){
            next({ name: 'home'})
        }
        else next()
      },
    }
]



const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes,
  });
  
  export default router;