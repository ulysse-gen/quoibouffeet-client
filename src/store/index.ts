import { createStore } from 'vuex';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { Router } from 'vue-router';

export default createStore({
  state: {
    auth_token: getCookie('auth_token') || null as string | null,
    user: null as null | QuoiBouffeEt.UserData
  },
  getters: {
  },
  mutations: {
    set_token(state, auth_token) {
      state.auth_token = auth_token;
      setCookie('auth_token', auth_token);
    },
    unset_token() {
      removeCookie('auth_token');
    },
    set_user(state, user) {
      state.user = user;
    },
    log_out(state, router: Router) {
      state.auth_token = null;
      state.user = null;
      removeCookie('auth_token');
      router.push('/login');
    }
  },
  actions: {
    async sync_user() {
      if (!this.state.auth_token)return null;
      const user = await fetch("http://localhost:669/v1/users/@me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.state.auth_token}`
        }
      });
      if (user.status != 200)return null;
      this.commit('set_user', await user.json());
      return user;
    }
  },
  modules: {
  }
})
