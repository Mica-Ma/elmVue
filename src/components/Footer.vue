<template>
  <div class="footer cf">
    <div class="wrapper">
        <ul class="nav ">
            <li><router-link to="/" exact>首页</router-link></li>
            <li><router-link to="/news">新闻</router-link></li>
            <li><router-link to="/videos">视频</router-link></li>

        </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.footer{
    position: fixed;
    width: 100%;
    background: #fff;
    border-top: 1px solid #ddd;
    bottom: 0;
    line-height: 0.45rem;
}
h2{
    position: fixed;
    width: 100%;
    text-align: center;
}
.nav{
    display: flex;
    
}
.nav li{
    flex: 1;
    text-align: center;
}

</style>