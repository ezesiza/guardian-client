// @ts-nocheck
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import vuetify from "./plugins/vuetify";
import routes from "./router/index";
import store from "./store";
import axios from "axios";

import VueApollo from 'vue-apollo';
import ApolloClient from "apollo-client";
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import colors from "vuetify/es5/util/colors";
axios.defaults.baseURL = "http://localhost:3000/fruits/login/";
axios.defaults.headers.common["Authorization"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
axios.defaults.headers.get["Accepts"] = "application/json";
axios.defaults.headers.common = {
  Authorization: ` ${localStorage.getItem("idToken")}`,
};


// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueApollo)

Vue.use(vuetify, {
  theme: {
    primary: colors.purple.base,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3,
  },
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

const router = new VueRouter({ mode: "history", routes });

new Vue({
  router,
  vuetify,
  apolloProvider,
  store,
  render: (h) => h(App),
}).$mount("#app");

export default router;
