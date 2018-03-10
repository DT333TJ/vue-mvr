/** 
 * @Desc: 播放器组件
 */
<template>
  <div ref="video" class="video-box">
    <div class="player-wrap" ref="playerWrap"></div>
    <noembed>
      You need Adobe Flash Player to watch this video. <br>
      <a href="http://get.adobe.com/flashplayer/">Download it from Adobe.</a>
      <a href="http://gokercebeci.com/dev/f4player" title="flv player">flv player</a>
    </noembed>
    <div class="video-loading" v-show="loadingFlag">
      <img class="loading-img" src="./img/loading.gif">
    </div>
    <div class="video-message" v-show="messageFlag">
      您没有安装flash播放器或者版本过低，请点击
      <a href="https://get2.adobe.com/cn/flashplayer/otherversions/" target="_blank">这里</a>
      安装！
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import 'lib/viewbox.js'

export default {
  name: 'video-box',
  data: function() {
    return {
      // loading
      loadingFlag: false,
      // message
      messageFlag: false
    }
  },
  props:{
    videoInfo: {
      type: Object
    }
  },
  watch: {
    videoInfo: function(newValue){
      this._loadVideoResource(newValue) 
    }
  },
  mounted: function() {
    this._loadingShow()
  },
  methods: {
    /** 
     * 加载播放器,调用JS对象
     */
    _loadVideoResource: function(value) {
      let videoUrl = value.fileUrl
      let coverUrl = value.coverUrl
      let vb = new Viewbox({
        el: this.$refs.playerWrap,
        src: 'static/res/secure_ViewBox.swf',
        videoUrl: videoUrl,
        coverUrl: coverUrl,
        bg: '#000000'
      })
      setTimeout( () => {
        this._loadingHide()
      }, 500)
    },

    /**
     * loading显示
     */
    _loadingShow: function() {
      this.loadingFlag = true
    },

    /** 
     * loading隐藏
     */
    _loadingHide: function() {
      this.loadingFlag = false
    },

    /**
     * message 出现
     */
    _messageShow: function() {
      this.messageFlag = true
    },

    /** 
     * message消失
     */
    _messageHide: function() {
      this.messageFlag = false
    },

    /** 
     * 清空正在播放的视频 
     */
    _clearVideoBox: function() {
      new Viewbox({
        el: this.$refs.playerWrap,
        src: '',
        videoUrl: '',
        coverUrl: '',
        bg: '#000000'
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'
  @import '~style/mixin'

  .video-box, .player-wrap
    position relative
    float left 
    width 1200px
    height 675px
    @media screen and (max-width 1600px) 
      width 864px
      height 486px

    /* loading */
    .video-loading
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      background-color #000
      z-index 99
      .loading-img
        position absolute
        top 0
        left 0
        bottom 0
        right 0
        margin auto

    /* message */
    .video-message
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      margin auto
      z-index 9999
      width 460px
      height 100px
      line-height 100px
      text-align center
      font-size $font-size-medium-x
      color #000000
      background-color $color-background
      border-radius 3px
      box-shadow 1px 1px 40px rgba(0,0,0,.3)
      a
       line-height 1.5
       color $color-theme
       font-weight bold
</style>
