<template>
  <div class="tab_control">
    <span
      v-for="(item,index) in titles"
      :key="item"
      :class="{active:currentIndex===index}"
      @click="activeHandle(index)"
    >{{item}}</span>
  </div>
</template>

<script >
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    activeHandle(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  },
  props: ["titles"]
};
</script>

<style lang="less" scoped>
.tab_control {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  // position: sticky; //根据所设置的top值，距离到达屏幕顶端top像素后，会把当前元素设置为 position:fixed
  // top: 44px;
  background-color: #fff;
  .active {
    color: hotpink;
    border-bottom: 2px solid hotpink;
  }
}
</style>