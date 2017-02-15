<template>
    <div id="app">
        <!-- <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
            <mt-button icon="back" slot="left">返回</mt-button>
            <mt-button icon="more" slot="right" @click="onClick"></mt-button>
        </mt-header> -->
        <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
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
            </ul>
        </mt-loadmore>   -->
        <v-header :seller="seller"></v-header>
        <!-- <v-tab></v-tab> -->
        <div class="tab border-1px">
            <div class="tab-item"><router-link to="/goods">商品</router-link></div>
            <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
            <div class="tab-item"><router-link to="/seller">商家</router-link></div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import header from './components/header/header.vue';
    // import tab from './components/tab/tab.vue';
    import { Toast } from 'mint-ui';

    const ERR_OK = 0;

    export default {
        data () {
            return {
                seller: {}
            };
        },
        name: 'app',
        components: {
            'v-header': header
            // 'v-tab': tab
        },
        created () {
            this.axios.get('/api/seller').then((response) => {
                // console.log(response.data);
                // this.seller = response.data
                if (response.data.errno === 0) {
                    // debugger
                    this.seller = response.data.data
                };
                // console.log(this.seller);
            });
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

<style lang="scss">
@import "./common/sass/mixin.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .tab{
        display: flex;
        line-height: 40px;
        // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        @include border-bottom-1px(rgba(7, 17, 27, 0.1));
        .tab-item{
            flex: 1;
            text-align: center;
            a{
                font-size: 14px;
                display: block;
                &.active{
                    color: red;
                }
            }
        }
    }
}
</style>
