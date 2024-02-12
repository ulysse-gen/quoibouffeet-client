<template>
    <div class="header">
        <img :src="`/assets/imgs/recipes/${recipe.image || 'default'}.png`" alt="Picture of the recipe" class="header_thumbnail">
        <div class="header_texts">
            <h2 class="header_texts_title"> {{ recipe.name }}</h2>
            <h3 class="header_texts_description"> {{ recipe.description }}</h3>
        </div>
    </div>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'RecipeHeader',
        components: {},
        props: {
            recipe: Object as any
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .header_thumbnail {
        height: 15rem;
        width: 15rem;
        border-radius: 2rem 0 .5rem 0;
    }

    .header_texts {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 1rem 0 0 1rem;

        .header_texts_title {
            font-size: 2.5rem;
        }

        .header_texts_description {
            font-size: 1.5rem;
            margin-left: .28rem;
        }
    }
}
</style>