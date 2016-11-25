<template>
     <div class="header cf">
        <div class="wrapper">
            <i v-on:click="back" class="iconfont icon-fanhui2 fl"></i>
            
            <h2>{{$route.name}}</h2> 
           
          
            <i class="iconfont icon-user fr"></i>  
        </div>
    

    </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    back:function() {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  position: fixed;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ddd;
  line-height: 0.45rem;
}
h2{
  position: absolute;
  width: calc(100% - 0.2rem);
  text-align: center;
  z-index: -1;
  }

</style>