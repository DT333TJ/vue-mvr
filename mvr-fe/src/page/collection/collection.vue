/**
 * @description 用户行为
 */

<template>
  <div class="collection">
    <t-header></t-header>
    <div class="grid collection-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'collection'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .collection-wrapper
    margin 0 auto 20px
</style>
