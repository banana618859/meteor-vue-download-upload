import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';   // here!
Vue.use(VueMeteorTracker); 

import App from './App.vue';

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './main.html';

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  });
});
