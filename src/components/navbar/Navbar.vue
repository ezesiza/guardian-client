<template>
  <v-app-bar color="indigo" dark fixed app>
    <v-toolbar-title>
      <router-link to="/list" style="text-decoration: none; color: inherit;">
        <v-btn class="ma-2" tile color="indigo">Fruits and Veggies</v-btn>
      </router-link>
      <router-link v-if="auth" to="/list" style="text-decoration: none; color: inherit;">
        <v-btn class="ma-2" tile color="indigo">My List</v-btn>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!auth">
      <span class="mr-2" @click.prevent="onLogin">Login</span>
    </v-btn>
    <v-btn v-if="auth">
      <span class="mr-2" @click.prevent="onLogout">Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {

  computed: {
    auth() {
      // return this;
      return this.$store.getters.getToken;
    }
  },

  created() {
    this.$store.dispatch("checkLogin");
  },

  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      return this.$router.push("/signin");
    },
    onLogin() {
      return this.$router.push("/list");
    }
  }
};
</script>
