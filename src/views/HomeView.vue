<template>
  <div class="home">
    <HeaderComponent :user="user" />
    home
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '../components/HeaderComponent.vue';

export default defineComponent({
  name: 'HomeView',
  beforeMount() {
      if (!this.user)this.$router.push('/login?goto='+this.$route.path);
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
