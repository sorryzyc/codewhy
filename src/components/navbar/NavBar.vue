<template>
  <div class="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  box-shadow: 0px 1px 1px rgba(100, 100, 100, 0.1); //盒子阴影
  //为了让导航不一起滚动
  // position: fixed;
  // top: 0;
  // z-index: 999;

  .left,
  .right {
    width: 60px;
  }
  .center {
    flex: 1;
    text-align: center;
    font-size: 20px;
  }
}
</style>