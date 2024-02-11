<template>
  <router-view/>
</template>

<style lang="scss">
@import url('@/assets/css/reset.scss');
@import url('@/assets/css/variables.scss');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  background-color: var(--background-color);

  height: 100vh;
  width: 100vw;
}
</style>
