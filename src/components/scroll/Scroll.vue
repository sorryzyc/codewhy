<template>
  <div ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core"; //导入BetterScroll 滚动插件
import Pullup from "@better-scroll/pull-up"; //通过静态方法 BScroll.use() 初始化Pullup插件
BScroll.use(Pullup);
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.scroll, {
      probeType: 3, //实时监听滚动位置
      pullUpLoad: true, //开启上拉加载功能 默认false
      click: true
    });
    this.scroll.on("scroll", position => {
      // console.log(position); //实时监听当前坐标
      this.$emit("scroll", position);
    });
    this.scroll.on("pullingUp", () => {
      //上拉加载相关操作
      //发送网络请求，请求更多数据
      this.$emit("pullingUp", this.scroll);
      //请求完成后，并且将新的数据展示后
      // this.scroll.finishPullUp(); //标识结束，不然只会触发一次
    });
  }
};
</script>

<style lang="less" scoped>
</style>