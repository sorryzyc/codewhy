<template>
  <div class="detail">
      我是detail组件
  </div>
</template>

<script>
export default {
  name: "Detail",
  data(){
      return{
          iid:null
      }
  },
  created(){
      this.iid=this.$route.params.iid //将参数中的iid保存
  }
};
</script>

<style lang="less" scoped>
</style>