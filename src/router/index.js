import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Participant from '../views/Participant.vue'
import ChristmasGift from '../views/ChristmasGift.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/gift/:giftToken',
    component: ChristmasGift,
    props: true
  },
  {
    path:'/:participantToken',
    name: 'Participant',
    component: Participant,
    props: true
  },
  { 
    path: '/',
    name: 'Home',
    component: Participant
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: "/christmas/",
  routes
})

export default router
