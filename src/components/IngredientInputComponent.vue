<template>
    <div class="selector">
        <input type="text" class="selector-ingredient" v-model="modelValue.slug" list="ingredients"/>
        <input class="selector-quantity" type="number" v-model="modelValue.quantity">
        <input type="text" class="selector-unit" v-model="modelValue.unit.slug"/>
        <button class="delete-button" @click="$emit('delete')">X</button>
        <datalist id="ingredients">
            <option v-for="ingredient in available_ingredients" :key="ingredient.slug" :value="ingredient.slug">{{ ingredient.name }}</option>
        </datalist>
        <datalist id="units">
            <option v-for="unit in available_units" :key="unit.slug" :value="unit.slug">{{ unit.name }}</option>
        </datalist>
    </div>
</template>

<style lang="scss" scoped>
.selector {
    width: 100%;
    height: 100%;

    .selector-ingredient {
        width: 65%;
        height: 1.5rem;
        border: 0.1rem solid var(--background-color-lighter);
        outline: none;
    }

    .selector-quantity {
        width: 10%;
        height: 1.5rem;
        border: 0.1rem solid var(--background-color-lighter);
        outline: none;
    }

    .selector-unit {
        width: 20%;
        height: 1.5rem;
        border: 0.1rem solid var(--background-color-lighter);
        outline: none;
    }

    .delete-button {
        width: 5%;
        height: 1.5rem;
        border: 0.1rem solid var(--background-color-lighter);
        outline: none;
        background-color: var(--call-to-action-negative);
    }
}
</style>

<script setup lang="ts">
import { defineModel } from 'vue';

const model = defineModel({
    required: true
});
</script>
  
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'IngredientInput',
        components: {},
        async beforeMount() {
            const ingredients = await fetch("http://localhost:669/v1/ingredients/*", {
                method: "GET",
                headers: {
                "Authorization": `Bearer ${this.$store.state.auth_token}`
                }
            });
            this.$store.commit('set_ingredients', await ingredients.json());
        },
        computed: {
            available_ingredients() {
                return this.$store.state.ingredients
            },
            available_units() {
                return [] as any
            }
        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>