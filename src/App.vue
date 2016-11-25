<template>
    <div>
        <v-header></v-header>
        <div class="container">
            <div class="wrapper">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>    
            </div>
            
        </div>
         
        <v-footer></v-footer>
    </div>
</template>

<script>
import vHeader from './components/Header'
import VFooter from './components/Footer'

export default {
    name: 'app',
    components: {
        vHeader,
        VFooter
    }
}
</script>

<style>
    @import './assets/scss/common.scss';
    @import './assets/scss/iconfont/iconfont.css';
    .container{
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        background: #fff;
    }
    a.router-link-active{
        color:#F66;
    }
    li.router-link-active a{
        color:#F66;
    }
    .fade-enter-active, .fade-leave-active{
        transition:opacity 0.5s;
    }
    .fade-enter, .fade-leave-active{
        opacity: 0;
    }

</style>
