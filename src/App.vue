<template>
    <div id="app">
        <v-header></v-header>
        <v-tab></v-tab>
        <div class="header">
            header
        </div>
        <div class="tab">
            tab
        </div>
        <div class="content">
            content
        </div>
    </div>
</template>

<script>
    import header from './components/header/header.vue';
    import tab from './components/tab/tab.vue';
    export default {
        name: 'app',
        components: {
            'v-header': header,
            'v-tab': tab
        }
    };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
