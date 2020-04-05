<template>
  <div class="goods">
    <div class="goodsItem" v-for="(item,index)  in goods" :key="index">
      <img :src="item.show.img" alt @load="imgLoad" @click="imgItemClick(index)"/>
      <div class="goodsIteminfo">
        <p>{{item.title}}</p>
        <span class="price">{{item.price|revise}}</span>
        <span class="collect">收藏：{{item.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  props: ["goods"],
  filters: {
    revise(item) {
      return "￥" + Number(item).toFixed(1);
    }
  },
  methods: {
    imgLoad() {
      //根据@load监听每一张图片加载完后，处理函数
      this.$emit("imgLoad"); //将当前监听图片加载完后的处理函数传递给父组件
    },
    imgItemClick(index){
      this.$router.push('/detail/'+this.goods[index].iid)
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 5px;
  .goodsItem {
    width: 48%;

    img {
      width: 100%;
      border-radius: 5px;
      margin: 5px 0;
    }
    .goodsIteminfo {
      font-size: 12px;
      text-align: center;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 2px;
      }
      .price {
        margin-right: 15px;
        color: hotpink;
      }
    }
  }
}
</style>