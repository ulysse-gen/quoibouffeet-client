<template>
  <div class="recipe" v-if="target_recipe">
    <HeaderComponent :user="user" />
    <RecipeComponent :recipe="target_recipe" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import HeaderComponent from '../components/HeaderComponent.vue';
import RecipeComponent from '../components/RecipeComponent/RecipeComponent.vue';

export default defineComponent({
  name: 'RecipeView',
  async beforeMount() {
      if (!this.user)this.$router.push('/login?goto='+this.$route.path);
      if (!this.recipe)this.$router.push('/');
      const recipe = await fetch("http://localhost:669/v1/recipes/@"+this.recipe, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.$store.state.auth_token}`
        }
      });
      if (recipe.status != 200)this.$router.push('/');
      this.target_recipe = await recipe.json();
  },
  data() {
      return {
        recipe: this.$route.params.recipe,
        target_recipe: null as any
      }
  },
  beforeRouteUpdate(to) {
    this.recipe = to.params.recipe
  },
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
  components: {
    HeaderComponent,
    RecipeComponent
  }
});
</script>