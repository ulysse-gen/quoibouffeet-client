<template>
    <div class="ingredient">
        <img class="ingredient_image" :src="`/assets/imgs/ingredients/${ingredient.image || 'default'}.png`">
        <div class="ingredient_texts">
        <span class="ingredient_name">{{ ingredient.name }}</span>
        <span class="ingredient_quantity">{{ ingredient.quantity }}<span class="ingredient_unit">{{ ingredient.unit.short }}</span></span>
        </div>
    </div>   
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'RecipeIngredient',
        components: {},
        props: {
            ingredient: Object as any
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ingredient {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: .25rem 0 .25rem 0;

  .ingredient_image {
    margin-right: .5rem;
    height: 4rem;
  }

  .ingredient_texts {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .ingredient_name {
      margin-bottom: .8rem;
    }
  }
}
</style>