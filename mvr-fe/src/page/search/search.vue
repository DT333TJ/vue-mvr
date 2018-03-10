/**
 * @Desc: 搜索
 */
<template>
  <div class="search">
    <t-header></t-header>
    <div class="grid search-wrapper">
      <router-view></router-view>
    </div> 
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'search'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .search-wrapper
    margin 0 auto 50px
</style>






