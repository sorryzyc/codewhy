<template>
<div class="back-top">
    <el-button icon="el-icon-top" circle type="danger"></el-button>
</div>
</template>

<script>
export default{
    name:'BackTop',

}
</script>

<style lang="less" scoped>
.back-top{
    position: fixed;
    right: 10px;
    bottom: 60px;
    z-index: 99;
}
</style>