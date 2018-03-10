/** 
 * @Desc: rate组件
 */

<template>
  <div class="rate" :style="{ bottom: bottomValue + 'px'}">
    <!-- S svg 预定义一个元素使其能够在SVG图像中重复使用-->
    <svg style="position: absolute; width: 0; height: 0;" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-star-empty" viewBox="0 0 32 32">
          <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-6.983 3.671 1.334-7.776-5.65-5.507 7.808-1.134 3.492-7.075 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z"></path>
        </symbol>
        <symbol id="icon-star-full" viewBox="0 0 32 32">
          <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
        </symbol>
      </defs>
    </svg>
    <!-- E svg -->
    <template v-for="n in length">
      <span 
        :key="n"
        :class="{'rate-star': true, 'hover': n<=over, 'filled': n<=rate}"  
        class="rate-item clickable"
        @mouseover="_rateOver(n)"
        @mouseout="_rateOut"
        @click="_setRate(n)"
        :title="ratedesc[over-1]"
      >
        <svg class="icon" v-show="_isFilled(n)">
          <use xlink:href="#icon-star-full"></use>
        </svg>
        <svg class="icon" v-show="_isEmpty(n)">
          <use xlink:href="#icon-star-empty"></use>
        </svg>
      </span>
    </template>
    <span class="rate-text">{{ratedesc[over-1]}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'rate',
  props: {
    length: {
      type: Number
    },
    valueData: {
      type: Number
    },
    bottomValue: {
      type: Number
    }
  },
  data: function() {
    return {
      over: 0,
      rate: 0,
      ratedesc: [
        '差','一般','好','很好','非常好'
      ],
      value: 0
    }
  },
  mounted: function() {
    this._getRateValue()
  },
  methods: {
    /** 
     * 移入事件
     */
    _rateOver: function(n) {
      this.over = n
    },

    /** 
     * 移出事件
     */
    _rateOut: function() {
      this.over = this.rate
    },

    /** 
     * 点击事件
     */
    _setRate: function(n) {
      this.rate = n
      this.$emit('_getRate', this.rate)
    },

    /** 
     * 获得rate的值 
     */
    _getRateValue: function() {
      this.value = this.valueData
      this.value >= this.length && (this.value = this.length)
      this.value < 0 && (this.value = 0) 
      this.rate = this.value
      this.over = this.value
    },

    /** 
     * 设置填充状态
     */
    _isFilled: function (n) { 
      return n <= this.over 
    },

    /**
     * 设置空状态
     */
    _isEmpty (n) {
      return n > this.over || !this.value && !this.over
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'
  @import '~style/mixin'

  .rate
    position absolute
    right 0
    z-index 9
    width 180px
    height 50px
    line-height 30px
    .rate-item
      display inline-block
      padding 4px
      background transparent none
      color #b5b5b5
      text-decoration none
      border 0
      .icon
        display inline-block
        width 16px
        height 16px
        stroke-width 0
        stroke currentColor
        fill currentColor
        vertical-align middle
    .hover
      color #efc20f
    .filled
      color #efc20f
    .rate-text
      display inline-block
      padding 4px  

</style>
