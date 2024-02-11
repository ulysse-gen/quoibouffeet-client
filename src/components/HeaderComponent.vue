<template>
    <div class="header">
        <h1 class="title" @click="goHome">QuoiBouffeEt</h1>
        <button class="log-off" @click="logout" v-if="user">Sign Out</button>
    </div>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'HeaderComponent',
        components: {},
        props: {
            user: Object as any
        },
        methods: {
            logout: function() {
                this.$store.commit('log_out', this.$router);
            },
            goHome() {
                this.$router.push('/');
            }
        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 3rem;
        background-color: var(--background-color-darker);
        box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

        .title {
            font-size: 2rem;
            margin-left: 0.5rem;
            cursor: pointer;

            &:hover {
                text-shadow: 0px 0px 16px var(--text-color);
            }
        }

        .log-off {
            height: 100%;
            margin-left: auto;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 1rem;

            background-color: transparent;
            color: var(--text-color);

            &:hover {
                background-color: var(--call-to-action);
                box-shadow:  0px 0px 50px 2px var(--call-to-action);
            }
        }
    }
</style>