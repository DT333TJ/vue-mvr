<template>
  <transition>
    <div class="message" v-show="show">
      <div class="message-wrap" :class="'wrap-' + type">
        <i 
          :class="{
            'el-icon-success': type == 'success',
            'el-icon-warning': type == 'warning',
            'el-icon-error': type == 'error',
            'el-icon-info': type == 'info'}">
        </i>
        <span class="message-content">
          {{ content }}
        </span>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'v-message',
    data: function() {
      return {
        show: false,
        timer: null
      }
    },
    mounted: function() {
      this._startTime()
    },
    methods: {
      _startTime: function() {
        this.show = true
        this.timer = setTimeout( () => {
          this.show = false
          this.$el.parentNode.removeChild(this.$el)
        }, this.duration)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .message
    position fixed
    top 100px
    left 0
    right 0
    text-align center
    z-index 999
    pointer-events none
    .message-wrap
      display inline-block
      padding 10px 20px
      pointer-events all
      border-radius 6px
      box-shadow 0 0 1px 1px rgba(0,0,0,.2)
      background #ffffff
    .wrap-error
      color red
    .wrap-success
      color green
    .wrap-info
      color blue
    .wrap-warning
      color yellow

      

      .message-content
        margin-left 4px
        font-size 14px
</style>

