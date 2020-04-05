<template>
  <div class="tabbar">
    <router-link to="/home" class="tabbar-item" tag="div">
      <i class="el-icon-s-home"></i>
      <div>首页</div>
    </router-link>
    <router-link to="/category" class="tabbar-item" tag="div">
      <i class="el-icon-menu"></i>
      <div>分类</div>
    </router-link>
    <router-link to="/shopcart" class="tabbar-item" tag="div">
      <i class="el-icon-s-goods"></i>
      <div>购物车</div>
    </router-link>
    <router-link to="/profile" class="tabbar-item" tag="div">
      <i class="el-icon-user-solid"></i>
      <div>我的</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.tabbar {
  display: flex;
  justify-content: space-around;
  background-color: #F7F5F7;
  width: 100%;
  height: 49px;
  text-align: center;
  position: fixed;
  bottom: 0;

  .tabbar-item {
    margin-top: 7px;
    font-size: 20px;
  }
}
.tabbar-item div {
  font-size: 14px;
}
.router-link-active {
  color: hotpink;
}
</style>