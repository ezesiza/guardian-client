
const Signin = (resolve) => {
  require.ensure(["../components/auth/Signin.vue"], () => {
    resolve(require("../components/auth/Signin.vue"));
  });
};
const List = (resolve) => {
  require.ensure(["../components/list/List.vue"], () => {
    resolve(require("../components/list/List.vue"));
  });
};
const ListView = (resolve) => {
  require.ensure(["../components/list/ListView.vue"], () => {
    resolve(require("../components/list/ListView.vue"));
  });
};

const routes = [
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/list/:id",
    name: "listview",
    component: ListView,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("idToken");
      if (token !== null) {
        next();
      } else {
        next("/signin");
      }
    },
    props: true,
  },
  {
    path: "/list",
    name: "list",
    component: List,
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("idToken");
      if (token !== null) {
        next();
      } else {
        next("/signin");
      }
    },
  },

  {
    path: "*",
    redirect: "/",
  },
];

export default routes;
