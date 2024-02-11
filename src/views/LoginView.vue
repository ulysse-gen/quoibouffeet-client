<template>
  <div class="login">
    <div class="login-inputs">
      <h2 class="global-error" v-if="error.global && typeof error.global == 'string'">{{ error.global }}</h2>
      <div class="input-field-div">
        <label class="input-label" :class="{'error': error.username}">Username: {{ (typeof error.username == "string") ? error.username : "" }}</label>
        <input type="text" class="input-field username" placeholder="username" v-model="username" :class="{'error': error.username}" @keydown.prevent.enter="login">
      </div>
      <div class="input-field-div">
        <label class="input-label" :class="{'error': error.password}">Password: {{ (typeof error.password == "string") ? error.password : "" }}</label>
        <input type="password" class="input-field password" placeholder="password" v-model="password" :class="{'error': error.password}" @keydown.prevent.enter="login">
      </div>
      <button class="login-button" @click="login">Log In</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginView',
  data:() => {
    return {
      username: null as string | null,
      password: null as string | null,
      error: {
        global: null as string | null,
        username: null as string | boolean | null,
        password: null as string | boolean | null
      }
    }
  },
  async beforeMount() {
      if (this.$store.state.auth_token) {
        const user = await this.$store.dispatch('sync_user');
        if (user == null)return this.$store.commit('unset_token');
        this.$router.push((this.$route.query.goto as string) || '/');
      }
  },
  methods: {
    login: async function () {
      const username = this.username;
      const password = this.password;

      this.error.global = this.error.username = this.error.password = null;
      
      const loginRequest = await fetch("http://localhost:669/v1/users/auth", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, 
          password: password
        })
      }).catch(e => {
        this.error.global = `An error occured trying to login.`;
        console.log('Could not login', e)
        return;
      });
      if (!loginRequest)return;
      const responseBody = await loginRequest.json();

      if (loginRequest.status == 200) {
        this.$store.commit('set_token', responseBody.user.token);
        await this.$store.dispatch('sync_user');
        this.$router.push((this.$route.query.goto as string) || '/');
      } else if (loginRequest.status == 400) {
        if (responseBody.missing){
          if (responseBody.missing == "username")this.error.username = "Missing username";
          if (responseBody.missing == "password")this.error.password = "Missing password";
        }
      } else if (loginRequest.status == 404) {
        if (responseBody.error && responseBody.error == "wrongCombo"){
          this.error.username = true;
          this.error.password = true;
          this.error.global = `Wrong username and password combo.`;
        }
      } else {
        this.error.global = `Could not login.`;
        console.log(`Login errored..`, responseBody);
      }
    }
  },
  components: {},
});
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .global-error {
    color: var(--error-color);
  }

  .login-inputs {
    height: 50%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 5rem;
    align-items: center;
    background-color: var(--background-color-darker);
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

    .input-field-div {
      display: flex;
      flex-direction: column;

      .input-label {
        width: 18rem;
        height: 2rem;
        font-size: 1.2rem;

        &.error {
          color: var(--error-color);
        }
      }
      .input-field {
        width: 18rem;
        height: 2rem;
        border-radius: 0.5rem;
        border-style: solid;
        background-color: var(--background-color-lighter);
        color: var(--text-color);

        &.error {
          border-color: var(--error-color);
        }
      }
    }

    .login-button {
      color: var(--text-color);
      background-color: var(--call-to-action);
      border: none;
      outline: none;
      width: 18rem;
      height: 3rem;
      border-radius: 1rem;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
}
</style>