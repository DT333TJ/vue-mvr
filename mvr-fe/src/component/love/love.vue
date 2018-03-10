/** 
 * @Desc: 喜爱组件
 */

<template>
  <div 
    class="love clickable"
    :style="{left: leftValue + 'px', bottom: bottomValue + 'px'}">
    <!-- @click="_loveButtonClick" -->
    <i v-if="loveFlag == 0" class="icon love-bg"></i>
    <i v-else class="icon nolove-bg"></i>
    <span v-if="loveTextFlag" class="icon">{{loveText}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'love',
  props: {
    leftValue: {
      type: Number
    },
    bottomValue: {
      type: Number
    },
    loveFlag: {
      type: Number
    },
    loveTextFlag: {
      type: Boolean
    },
    loveText: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      flag: false
    }
  },
  mounted: function() {
    this._getFlagValue()
  },
  methods: {
    /** 
     * 根据父级的属性设置flag 
     */
    _getFlagValue: function() {
      this.loveFlag == 0 ? this.flag = true : this.flag = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .love
    position absolute
    height 30px
    line-height 30px
    .icon
      display inline-block
      width 30px
      height 30px
      vertical-align middle
    .love-bg
      background url(./img/love.png) no-repeat center
    .nolove-bg
      background url(./img/nolove.png) no-repeat center
</style>
