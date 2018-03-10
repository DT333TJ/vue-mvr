/** 
 * @Desc: 资源数量组件
 */
<template>
  <div class="resource-count">
    共&nbsp;{{countData.countNumber}}&nbsp;条结果
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'count',
  props: {
    countData: {
      type: Object
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'

  .resource-count
    height 48px
    line-height 48px
    color $color-text-g
    .eye-icon
      display inline-block
      width 22px
      height 20px
      margin-right 5px
      vertical-align middle
      background url(./img/i-eye.png) center no-repeat 
</style>
