<template>
    <div class="selector">
        <IngredientInput :index="index" v-model="modelValue[index]" v-for="(ingredient, index) in modelValue" :key="`${ingredient.slug}_${index}`" @delete="modelValue.splice(index, 1)"/>
        <button @click="modelValue.push({slug: '', quantity: 1, unit: { slug: ''}})">Add ingredient</button>
    </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';

const model = defineModel({
    required: true
});
</script>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import IngredientInput from './IngredientInputComponent.vue';

    export default defineComponent({
        name: 'MultiIngredientInput',
        components: {
            IngredientInput
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.selector {
    IngredientInput {
        width: 100%;
    }

    button {
        border: none;
        outline: none;
        width: 100%;
        color: var(--text-color);
        background-color: var(--call-to-action-positive);
        height: 1.5rem;
    }
}
</style>