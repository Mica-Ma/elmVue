<template>
    <div id="app">
        <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
            <mt-button icon="back" slot="left">返回</mt-button>
            <mt-button icon="more" slot="right" @click="onClick"></mt-button>
        </mt-header>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <ul>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>22222222222</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
                <li>1111111111111111111</li>
            </ul>
        </mt-loadmore>  
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
    import { Toast } from 'mint-ui';
    export default {
        name: 'app',
        components: {
            'v-header': header,
            'v-tab': tab
        },
        methods: {
            onClick () {
                Toast('搜索关键字不可为空');
            },
            loadTop () {
                // ...// load more data
                setTimeout(() => {
                    this.$refs.loadmore.onTopLoaded();
                }, 2000);
            },
            loadBottom () {
                // ...// load more data
                this.allLoaded = true;// if all data are loaded
                this.$refs.loadmore.onBottomLoaded();
            },
            allLoaded () {
                // this.allLoaded = false;
            }
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
