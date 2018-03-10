/** 
 * @Desc: 设置新密码
 */
<template>
  <div class="complete">
    <div class="font-item">
      密码修改成功
    </div>
    <div class="title-item">
      <span style="color:red">{{time}}</span>秒后，页面自动跳转到登录页面
    </div>
    <div class="button-item">
      <button class="btn clickable" @click="_buttonClick">等不及了，我要登入</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'completepassword',
    data: function() {
      return {
        time: 5,
        _interval: null
      }
    },
    mounted: function() {
      this._intervalHandle()
    },
    beforeRouteLeave: function(to, from, next) {
      clearInterval(this._interval)
      next()
    },
    methods: {
      /** 
       * 跳转登录按钮点击 
       */
      _buttonClick: function() {
        // 清空定时器
        clearInterval(this._interval)
        this.time = 0
        this.$router.replace('login')
      },

      /** 
       * 设置定时器 
       */
      _intervalHandle: function() {
        this._interval = setInterval( () => {
          this.time > 0 ? this.time-- : (this.time = 0)
          this.time === 0 && this.$router.replace('login')
        }, 1000)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .complete
    padding 30px 50px 0
    /* form-item*/
    .success-item
      width 60px
      height 60px
      line-height 60px
      border-radius 50%
      text-align center
      margin 0 auto
      background-color $color-border-sub
      img
        width 60px
        height 60px
        vertical-align middle

    .font-item
      width 100%
      height 40px
      line-height 40px
      margin 20px 0
      text-align center
      font-size $font-size-large

    .title-item
      height 30px
      line-height 30px
      text-align center
      font-size $font-size-medium

    .button-item
      margin 20px 0
      height 40px
      line-height 40px
      text-align center
      .btn
        width 70%
        height 40px
        line-height 40px
        color $color-text-w
        border 1px solid $color-border-sub
        border-radius 4px
        background-color $color-text-sub  
</style>
