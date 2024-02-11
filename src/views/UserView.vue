<template>
  <div class="user">
    <HeaderComponent :user="user" />
    User page for user @{{ username }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import HeaderComponent from '../components/HeaderComponent.vue';

export default defineComponent({
  name: 'UserView',
  async beforeMount() {
      if (!this.user)this.$router.push('/login?goto='+this.$route.path);
      if (!this.username)this.$router.push('/');
      const user = await fetch("http://localhost:669/v1/users/@"+this.username, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.$store.state.auth_token}`
        }
      });
      if (user.status != 200)this.$router.push('/');
      this.target_user = await user.json();
  },
  data() {
      return {
        username: this.$route.params.username,
        target_user: null as any
      }
  },
  beforeRouteUpdate(to) {
    this.username = to.params.username
  },
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
  components: {
    HeaderComponent
  }
});
</script>
