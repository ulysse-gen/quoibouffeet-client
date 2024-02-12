<template>
    <div class="recipe">
        <RecipeHeader :recipe="recipe"/>
        <RecipeContent :recipe="recipe"/>
    </div>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import RecipeContent from './RecipeContentComponent.vue';
    import RecipeHeader from './RecipeHeaderComponent.vue';

    export default defineComponent({
        name: 'RecipeComponent',
        components: {
            RecipeHeader, RecipeContent
        },
        props: {
            recipe: Object as any
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.recipe {
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
</style>