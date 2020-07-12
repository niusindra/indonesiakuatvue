import Vue from 'vue';
import Router from 'vue-router';

const DashboardAdminLayout = () =>
  import( /* webpackChunkName: "dashboard" */ '../components/dashboardAdminLayout.vue');
const DashboardLurahLayout = () =>
  import( /* webpackChunkName: "dashboard" */ '../components/dashboardLurahLayout.vue');
const DashboardPusatLayout = () =>
  import( /* webpackChunkName: "dashboard" */ '../components/dashboardPusatLayout.vue');
const DashboardLayout = () =>
  import( /* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue');


function loadViewAdmin(view) {
  return () => import( /* webpackChunkName:"view-[reques]" */ `../components/dashboardAdminContents/${view}.vue`);
}
function loadViewLurah(view) {
  return () => import( /* webpackChunkName:"view-[reques]" */ `../components/dashboardLurahContents/${view}.vue`);
}
function loadViewPusat(view) {
  return () => import( /* webpackChunkName:"view-[reques]" */ `../components/dashboardPusatContents/${view}.vue`);
}
function loadLanding(view) {
  return () => import( /* webpackChunkName: "view-[request]" */ `../components/landingContents/${view}.vue`)
}


const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [{
        name: 'Home',
        path: '/',
        component: loadLanding('home')
      },
      {
        name: 'Login',
        path: '/login',
        component: loadLanding('login')
      }
    ]

  },

  {
    path: '/rt',
    component: DashboardAdminLayout,
    children: [
      {
        beforeEnter(to, from, next) {
          if (localStorage.getItem("type") == 0) {
            next()
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem("type")
            next({
              path: '/login'
            })
          }
        },
        name: 'MiskinAdmin',
        path: '/rt/miskin',
        component: loadViewAdmin('miskinController')

      },
      
      {
        beforeEnter(to, from, next) {
          if (localStorage.getItem("type") == 0) {
            next()
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem("type")
            next({
              path: '/login'
            })
          }
        },
        name: 'PHKAdmin',
        path: '/rt/phk',
        component: loadViewAdmin('phkController')

      },
    ]
  },

  {
    path: '/dinsos',
    component: DashboardLurahLayout,
    children: [
      {
        beforeEnter(to, from, next) {
          if (localStorage.getItem("type") == 1) {
            next()
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem("type")
            next({
              path: '/login'
            })
          }
        },
        name: 'MiskinLurah',
        path: '/dinsos/miskin',
        component: loadViewLurah('miskinController')

      },
      
      {
        beforeEnter(to, from, next) {
          if (localStorage.getItem("type") == 1) {
            next()
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem("type")
            next({
              path: '/login'
            })
          }
        },
        name: 'PHKLurah',
        path: '/dinsos/phk',
        component: loadViewLurah('phkController')

      },
    ]
  },

  {
    path: '/pusat',
    component: DashboardPusatLayout,
    children: [
      {
        beforeEnter(to, from, next) {
          if (localStorage.getItem("type") == 2) {
            next()
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem("type")
            next({
              path: '/login'
            })
          }
        },
        name: 'MiskinPusat',
        path: '/pusat/miskin',
        component: loadViewPusat('miskinController')

      },
      
      {
        beforeEnter(to, from, next) {
          if (localStorage.getItem("type") == 2) {
            next()
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem("type")
            next({
              path: '/login'
            })
          }
        },
        name: 'PHKPusat',
        path: '/pusat/phk',
        component: loadViewPusat('phkController')

      },
    ]
  },
]
Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: routes
});
export default router;