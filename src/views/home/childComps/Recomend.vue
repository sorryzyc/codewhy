<template>
  <div class="recomend">
    <a v-for="item in recomend" :key="item.link" :href="item.link">
      <img :src="item.image" />
      <div>{{item.title}}</div>
    </a>
  </div>
</template>

<script>
export default {
  name: "Recomend",
  props: ["recomend"]
};
</script>

<style scoped lang="less">
.recomend {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  a {
    width: 20%;
  }
  img {
    width: 100%;
  }
  div {
    text-align: center;
  }
}
</style>