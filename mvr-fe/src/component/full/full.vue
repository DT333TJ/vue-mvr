/** 
 * @Desc: 收藏列表
 */
<template>
  <div class="full" ref="boxS">
    <embed
      :src="embedUrl"
      width="100%"
      height="100%">
    </embed>
  </div>
</template>

<script type="text/ecmascript-6">
  import screenfull from 'screenfull'
  export default {
    props: {
      embedUrl: {
        type: String,
        required: true
      }
    },
    methods: {
      /** 
       * 
      */
      _show: function() {
        if (screenfull.enabled) {
          let elem = this.$refs.boxS
          screenfull.request(elem)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .full
    position fixed
    top 0px 
    right 0px
    bottom 0px
    left 0px
    z-index -999   
</style>
