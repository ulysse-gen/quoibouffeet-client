<template>
<div class="content">
  <div class="content_ingredients">
    <RecipeIngredient :ingredient="ingredient" :key="`${ingredient.slug}_${index}`" v-for="(ingredient, index) in recipe.ingredients"/> 
  </div>
  <div class="content_steps">
    <RecipeStep :step="step" :index="index" :key="`${recipe.slug}_step_${index}`" v-for="(step, index) in recipe.steps" />
  </div>
</div>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import RecipeIngredient from './RecipeIngredientComponent.vue';
    import RecipeStep from './RecipeStepComponent.vue';

    export default defineComponent({
        name: 'RecipeContent',
        components: {
          RecipeIngredient, RecipeStep
        },
        props: {
            recipe: Object as any
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
    display: flex;
    flex-direction: row;
    .content_ingredients {
        display: flex;
        flex-direction: column;
        padding: 1rem 1rem .75rem 1rem;
        min-width: 15rem;

      .content_ingredients_ingredient {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: .25rem 0 .25rem 0;

        .content_ingredients_ingredient_image {
          margin-right: .5rem;
          height: 4rem;
        }

        .content_ingredients_ingredient_texts {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;

          .content_ingredients_ingredient_name {
            margin-bottom: .8rem;
          }
        }
      }
    }

    .content_steps {
      display: flex;
      flex-direction: column;
      border-radius: .5rem 0 0 0;
      background-color: var(--background-color-lighter);
      flex: 1 1;
      padding-top: 2rem;

      .content_steps_step {
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

        .content_steps_step_index {
          margin-bottom: .4rem;
        }
      }
    }
  }
</style>