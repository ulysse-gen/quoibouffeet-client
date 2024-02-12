<template>
  <div class="create-recipe">
    <HeaderComponent :user="user" />
    <div class="create-recipe-div">
      <div class="create-recipe-metadata">
        <span class="create-recipe-name-label">Recipe name:</span>
        <input class="create-recipe-name-input" v-model="recipe.name" placeholder="Recipe name"/>
        <span class="create-recipe-description-label">Recipe description:</span>
        <textarea class="create-recipe-description-input" v-model="recipe.description" placeholder="Recipe description"></textarea>
      </div>
      <div class="create-recipe-content">
        <div class="create-recipe-content-ingredients">
          <span class="create-recipe-content-label">Recipe ingredients :</span>
          <MultiIngredientInput v-model="recipe.ingredients"/>
        </div>
      </div>
    </div>
    <button @click="publish">publish</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderComponent from '../components/HeaderComponent.vue';
import MultiIngredientInput from '../components/MultiIngredientInputComponent.vue';

export default defineComponent({
  name: 'CreateRecipeView',
  methods: {
    publish() {
      console.log(this.recipe)
    }
  },
  data() {
    return {
      recipe: {
        name: null,
        description: null,
        ingredients: [],
        steps: []
      },
    }
  },
  beforeMount() {
      if (!this.user)this.$router.push('/login?goto='+this.$route.path);
  },
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
  components: {
    HeaderComponent, MultiIngredientInput
  }
});
</script>

<style lang="scss" scoped>
.create-recipe {
  width: 100%;

  .create-recipe-div {
    margin: 2rem 2rem 0 2rem;
    display: flex;
    flex-direction: row;
    background-color: var(--background-color-darker);
    border-radius: 2rem 2rem 0 0;

    .create-recipe-metadata {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 25%;

      .create-recipe-name-label, .create-recipe-description-label {
        font-size: 1.3rem;
        margin-bottom: .2rem;
      }

      .create-recipe-name-input {
        height: 2rem;
        width: 100%;
        border: none;
        outline: none;
        margin-bottom: 1rem;
      }

      .create-recipe-description-input {
        min-height: 4rem;
        width: 100%;
        border: none;
        outline: none;
        margin-bottom: 1rem;
      }
    }

    .create-recipe-content {
      flex: 1 1;
      background-color: var(--background-color-lighter);
      border-radius: 0.5rem 2rem 0 0;

      .create-recipe-content-ingredients {
        width: 50%;
      }
    }
  }
}
</style>