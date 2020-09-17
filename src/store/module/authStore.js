import axios from "axios";
import router from "../../main.js";

const state = {
  idToken: null,
  isAuthenticated: false,
  authError: "",
};

const getters = {
  getToken: (state) => state.idToken !== null,
  authError: (state) => state.authError,
};

const actions = {
  signin({ commit }, authData) {
    axios
      .post("/", authData)
      .then((result) => {
        const item = result.data;
        localStorage.setItem("idToken", item.user.password);
        commit("authUser", {
          idToken: item.user.password,
          isAuthenticated: true,
        });
      })
  },
  logout({ commit }) {
    commit("clearAuth", {
      idToken: null,
      isAuthenticated: true,
    });
  },

 
  checkLogin({ commit }) {
    const token = localStorage.getItem("idToken");
    if (token === null) {
      return router.push("/signin");
    } else {
      commit("authUser", {
        token,
        isAuthenticated: true,
      });
    }
  },
};

const mutations = {
  authUser(state, userInfo) {
    state.idToken = userInfo.token;
    state.isAuthenticated = userInfo.isAuthenticated;
    if (userInfo.token && state.idToken !== null) {
      state.isAuthenticated = true;
    } else {
      state.isAuthenticated = false;
    }
  },
  clearAuth(state, userInfo) {
    state.idToken = userInfo.idToken;
    state.isAuthenticated = userInfo.isAuthenticated;
    localStorage.setItem("idToken", null);
  },
  authError(state) {
    state.isAuthenticated = false;
    state.authError = "Server Error, Auth failed!";
  },
};

export default {
  actions,
  mutations,
  state,
  getters,
};
