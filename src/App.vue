<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "components/tabbar/TabBar.vue";

export default {
  name: "App",
  components: {
    TabBar
  }
};
</script>
<style lang="less" scoped>
@import "assets/css/base.css";

</style>
