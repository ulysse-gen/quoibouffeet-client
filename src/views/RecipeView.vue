<template>
  <div class="recipe" v-if="target_recipe">
    <HeaderComponent :user="user" />
    <div class="recipe_modal">
      <div class="recipe_header">
        <img :src="`/assets/imgs/recipes/${target_recipe.image || 'default'}.png`" alt="Picture of the recipe" class="recipe_header_thumbnail">
        <div class="recipe_header_texts">
          <h2 class="recipe_header_texts_title"> {{ target_recipe.name }}</h2>
          <h3 class="recipe_header_texts_description"> {{ target_recipe.description }}</h3>
        </div>
      </div>
      <div class="recipe_content">
        <div class="recipe_content_ingredients">
          <div class="recipe_content_ingredients_ingredient" :key="ingredient.slug" v-for="ingredient in target_recipe.ingredients">
            <img class="recipe_content_ingredients_ingredient_image" :src="`/assets/imgs/ingredients/${ingredient.image || 'default'}.png`">
            <div class="recipe_content_ingredients_ingredient_texts">
              <span class="recipe_content_ingredients_ingredient_name">{{ ingredient.name }}</span>
              <span class="recipe_content_ingredients_ingredient_quantity">{{ ingredient.quantity }}<span class="recipe_content_ingredients_ingredient_unit">{{ ingredient.unit.short }}</span></span>
            </div>
          </div>    
        </div>
        <div class="recipe_content_steps">
          <div class="recipe_content_steps_step" :class="{ odd: index % 2 != 0 }" :key="`${target_recipe.slug}_step_${index}`" v-for="(step, index) in target_recipe.steps">
            <span class="recipe_content_steps_step_index">Step {{ index + 1 }} {{ (step.stepTime) ? `(${step.stepTime}mn)`: '' }}: <span class="recipe_content_steps_step_name" v-if="step.name">{{ step.name }}</span></span>
            <span class="recipe_content_steps_step_description">{{ step.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import HeaderComponent from '../components/HeaderComponent.vue';

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
    HeaderComponent
  }
});
</script>

<style lang="scss" scoped>
.recipe {

  .recipe_modal {
    background-color: var(--background-color-darker);
    border-radius: 2rem 2rem 0 0;
    margin: 2rem 2rem 0 2rem;

    .recipe_header {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      .recipe_header_thumbnail {
        height: 15rem;
        width: 15rem;
        border-radius: 2rem 0 .5rem 0;
      }

      .recipe_header_texts {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 1rem 0 0 1rem;

        .recipe_header_texts_title {
          font-size: 2.5rem;
        }

        .recipe_header_texts_description {
          font-size: 1.5rem;
          margin-left: .28rem;
        }
      }
    }

    .recipe_content {
      display: flex;
      flex-direction: row;
      .recipe_content_ingredients {
          display: flex;
          flex-direction: column;
          padding: 1rem 1rem .75rem 1rem;
          min-width: 15rem;

        .recipe_content_ingredients_ingredient {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          margin: .25rem 0 .25rem 0;

          .recipe_content_ingredients_ingredient_image {
            margin-right: .5rem;
            height: 4rem;
          }

          .recipe_content_ingredients_ingredient_texts {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            .recipe_content_ingredients_ingredient_name {
              margin-bottom: .8rem;
            }
          }
        }
      }

      .recipe_content_steps {
        display: flex;
        flex-direction: column;
        border-radius: .5rem 0 0 0;
        background-color: var(--background-color-lighter);
        flex: 1 1;
        padding-top: 2rem;

        .recipe_content_steps_step {
          display: flex;
          flex-direction: column;
          align-self: flex-start;
          align-items: flex-start;
          width: 100%;
          padding: 0 2rem 2rem 2rem;

          &.odd {
            align-items: flex-end;
            align-items: flex-end;
          }

          .recipe_content_steps_step_index {
            margin-bottom: .4rem;
          }
        }
      }
    }
  }
}
</style>