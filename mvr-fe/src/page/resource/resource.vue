/**
 * @Desc: 视频资源页面
 */
<template>
  <div class="resource">
    <t-header></t-header>
    <div class="grid resource-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'resource'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .resource-wrapper
    margin 0 auto 
</style>






