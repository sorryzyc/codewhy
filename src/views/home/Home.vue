<template>
  <div id="home">
    <NavBar class="home_navbar">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl
      :titles="['流行','新款','精选']"
      v-on:tabClick="tabClick"
      ref="tabControl1"
      class="tabControl"
      v-show="isTabFixed"
    ></TabControl>
    <BackTop @click.native="backTop()" v-show="backTopFlag"></BackTop>
    <Scroll class="scroll" ref="scroll" @scroll="contentScroll" @pullingUp="pullingUp">
      <!-- 轮播图组件 -->
      <el-carousel indicator-position="outside" height="200px">
        <el-carousel-item v-for="item in banner" :key="item.image">
          <a :href="item.link">
            <img :src="item.image" alt @load="elImgLoad" />
          </a>
        </el-carousel-item>
      </el-carousel>
      <!-- 推荐信息组件 -->
      <Recomend :recomend="recommend"></Recomend>
      <!-- 分割线 -->
      <hr class="hr" />
      <!-- 特点组件 -->
      <Feature></Feature>
      <!-- 选项控制栏组件 -->
      <TabControl
        :titles="['流行','新款','精选']"
        v-on:tabClick="tabClick"
        ref="tabControl2"
        :class="{tabFixed:isTabFixed}"
      ></TabControl>
      <!-- 商品展示 -->
      <GoodsList :goods="goods[currentType].list" @imgLoad="imgLoad"></GoodsList>
    </Scroll>
  </div>
</template>


  </div>
</template>

<script>
import NavBar from "components/navbar/NavBar.vue";
import TabControl from "components/tabControl/TabControl.vue";
import GoodsList from "components/goodsList/GoodsList.vue";
import Scroll from "components/scroll/Scroll.vue";
import BackTop from "components/backTop/BackTop.vue";

import Recomend from "views/home/childComps/Recomend.vue";
import Feature from "views/home/childComps/Feature.vue";

export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        //商品数据(根据类型和页数控制数据)
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop", //记录当前goodlist类型
      backTopFlag: false, //是否显示backtop
      scroll: null,
      refresh: null,
      isLoad: false,
      tabOffsetTop: 0,
      isTabFixed: false
    };
  },
  components: {
    NavBar,
    Recomend,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  async created() {
    //请求多个数据
    await this.$axios.get("/home/multidata").then(result => {
      let { banner, recommend, dKeyword, keywords } = result.data.data;
      this.banner = banner.list;
      this.recommend = recommend.list;
    });
    //请求商品数据
    this.getGoodsList("pop");
    this.getGoodsList("new");
    this.getGoodsList("sell");
  },
  mounted() {
    //把refresh函数传递到抖动函数中 得到返回的新函数
    this.refresh = this.debounce(this.$refs.scroll.scroll.refresh, 100); //前监听每一张图片加载完后，调用scroll对象的refresh处理函数 （重新计算scrollerHeight）
  },
  methods: {
    //network网络请求相关
    getGoodsList(currenType) {
      let currentPage = this.goods[currenType].page + 1;
      this.$axios
        .get("/home/data", {
          params: { type: currenType, page: currentPage }
        })
        .then(result => {
          // console.log(result.data.data);
          this.goods[currenType].list.push(...result.data.data.list);
          this.goods[currenType].page++;
        });
    },
    //事件监听相关
    debounce(fn, delay) {
      //防抖函数 需传递两个参数 1.要执行的函数 2.需要等多久的时间 (delay[dɪˈleɪ]  延迟的时间)
      let scroll = this.$refs.scroll.scroll;
      let timer = null; //借助闭包
      return function() {
        //赋值的是函数 根据闭包和作用域链
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.call(scroll);
        }, delay);
      };
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex=index //为了保证tabControl1和2的一致性，修改顶部tabcontrol的currentIndex
      this.$refs.tabControl2.currentIndex=index //为了保证tabControl1和2的一致性，修改顶部tabcontrol的currentIndex

    },
    backTop() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 2000);
    },
    contentScroll(position) {
      // 1.判断backtop是否显示
      position.y < -1000
        ? (this.backTopFlag = true)
        : (this.backTopFlag = false);
      // 2.判断topControl是否吸顶
      position.y < -this.tabOffsetTop
        ? (this.isTabFixed = true)
        : (this.isTabFixed = false);
    },
    pullingUp(scroll) {
      //发送网络请求，请求更多数据
      this.getGoodsList(this.currentType);
      //请求完成后，并且将新的数据展示后
      setTimeout(() => {
        //设置定时器 避免多次触发
        scroll.finishPullUp(); //标识结束，不然只会触发一次 pullingUp 上拉事件
      }, 1000);
    },
    imgLoad() {
      //根据子组件GoodList传过来的@load="imgLoad"
      this.refresh();
    },
    elImgLoad() {
      //监听轮播图是否加载完成
      if (!this.isLoad) {
        //获取tabControl的offsetTop
        //所有组件都有一个属性$el：用于获取组件内的标签元素
        setTimeout(()=>{ //定时器为了准确的获取offsetTop
          this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
        },500)
        this.isLoad = true;
        
      }
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
}
.home_navbar {
  background-color: hotpink;
  color: #fff;
}
/* 轮播图 */
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
/* .el-carousel {
  margin-top: 44px;
} */

.hr {
  margin-top: 20px;
  height: 5px;
  background-color: #eeedef;
  border: 0;
}
.scroll {
  position: absolute;
  left: 0;
  top: 44px;
  bottom: 49px;
  right: 0;
  overflow: hidden;
}
.tabControl {
  position: relative;
  z-index: 9;
}
</style>
