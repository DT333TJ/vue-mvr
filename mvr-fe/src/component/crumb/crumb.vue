/** 
 * @Desc: 面包屑组件
 */
<template>
  <div class="crumb">
    <!-- 根据传递过来的crumbParam的值来区别显示跳转链接 -->
    <router-link 
      v-if="crumbData.crumbParam == ''" 
      tag="span" 
      class="clickable crumb-txt" 
      :to="{name: `${crumbData.name}`}">
      {{crumbData.pageName}}
    </router-link>
    <router-link 
      v-else 
      tag="span" 
      class="clickable crumb-txt" 
      :to="{name: `${crumbData.name}`, query: {keyWord: `${crumbData.crumbParam}`}}">
      {{crumbData.pageName}}
    </router-link>
    <i class="crumb-separator" v-if="crumbData.name"></i>
    <span>{{crumbData.resourceName}}</span>  
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'crumb',
  props: {
    crumbData: {
      type: Object
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'
  @import '~style/mixin'

  .crumb
    width 100%
    padding 30px 0 26px
    span
      font-weight bolder
      font-size 15px
      color #888999
    .crumb-txt
      color $color-text-sub
      font-size $font-size-medium-x
      &:hover
        color $color-theme
    .crumb-separator
      display inline-block
      width 15px
      height 15px
      margin-left 5px
      background url(./img/i-arrow-right.png) no-repeat center
      vertical-align bottom    
</style>
