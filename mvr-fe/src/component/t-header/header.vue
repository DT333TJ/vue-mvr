/**
 * @Desc: 头部组件
 */
<template>
  <div class="header">
    <div class="grid header-wrapper">
      <!--  logo -->
      <div class="header-logo">
        <a class="header-logo-content" @click="_logoButtonClick">
          <img src="./img/logo.png" alt="BBC-微视频资源库">
          微视频教学资源库
        </a>
      </div>
      
      <!--  菜单 -->
      <div class="header-nav">
        <router-link to="/resource">首页</router-link>
        <router-link to="/collection">我的收藏</router-link>
      </div>

      <!-- 搜索和帮助 -->
      <div class="header-search">
        <input 
          class="header-search-input" 
          type="text"
          placeholder="输入查询的内容" 
          v-show="searchFlag"
          @keyup.enter="_searchClick"
          v-model.trim="searchValue">
        <i class="header-search-btn clickable" @click="_searchClick" v-show="searchFlag"></i>
        <!-- <router-link class="header-search-help" :to="{name: 'help'}">帮助？</router-link> -->
        <span class="header-search-help header-search-logout clickable" @click="_handleLogout">退出</span>
        <!-- <span style="color:white">{{tokenValue}}</span>
        <span style="color:white">{{prefixValue}}</span> -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { requestLogout } from 'api/logout'
import cookie from 'js-cookie'
import Bus from 'lib/bus'

export default {
  name: 't-header',
  data: function() {
    return {
      searchFlag: true, // 搜索框显示
      searchValue: '' ,// 搜索值
    }
  },
  computed: {
    tokenValue: function() {
      if (this.$store.getters.nickName == '') {
        // 重新获得vuex值
        this.$store.dispatch('Flash_User')
      }
      return this.$store.getters.nickName
    },
    prefixValue: function() {
      if (this.$store.getters.prefix == '') {
        this.$store.dispatch('Flash_Prefix')
      }
      return this.$store.getters.prefix
    }
  },
  mounted: function() {
    this._getQueryValue()
  },
  methods: {
    /** 
     * 从url中获取搜索值 
    */
    _getQueryValue: function() {
      let queryParam = this.$route.query
      queryParam.keyWord && (this.searchValue = queryParam.keyWord)
    },

    /**
     * logo按钮点击事件
    */
    _logoButtonClick: function() {
      this.$router.push( '/resource' )
    },

    /** 
     * 搜索按钮点击事件
     */
    _searchClick: function() {
      let searchValue = this.searchValue
      if (null == searchValue || searchValue == '') {
        this.$vmessage('error', '请先填写要查询的内容', 2500)
      } else {
        // 组件之间通信解决在搜索页面跳转搜索页面传值的问题
        Bus.$emit('SearchValue', this.searchValue)
        let queryObj = {
          keyWord: searchValue
        }
        this.$router.push({ name: 'search-list', query: queryObj})
      }
    },

    /** 
     * 登出事件 
     */
    _handleLogout: function() {
      return requestLogout(this.prefixValue)
        .then( response => {
          if (response.code === 0) {
            cookie.remove('mvr_Token')
            this.$router.replace({ name: 'login'})
          }
        })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'
  @import '~style/mixin'

  .header 
    height 70px
    background-color: $color-theme
    clear-float()
    .header-wrapper
      position relative
      height 100% 
      margin 0 auto

      /* logo */
      .header-logo
        float left
        width 30%
        height 100%
        .header-logo-content
          display block
          width 220px
          height 70px
          line-height 70px
          color $color-theme-sub
          font-size $font-size-large
          font-weight bolder
          clear-float()
          img
            float left
            width 46px
            height 46px
            margin 12px 6px 0 0

      /* nav */ 
      .header-nav
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        margin auto
        width 400px
        height 100%
        a
          display inline-block
          width 100px
          height 70px
          line-height 70px
          margin 0 49px
          text-align center
          color $color-text-sub
          font-size $font-size-medium-x
          font-weight bolder
          &:hover
            color $color-theme-sub
            border-bottom 6px solid $color-theme-sub
        /* 路由激活类 */ 
        .router-active    
          color $color-theme-sub
          border-bottom 6px solid $color-theme-sub

      /* 搜索区域 */
      .header-search
        position relative
        float right 
        margin-right 40px
        /* 搜索框 */
        .header-search-input
          width 202px
          height 32px
          margin-top 19px
          margin-right 40px
          padding 0 46px 0 16px
          background-color $color-background
          border-radius 15px

      .header-search    
        /* 搜索按钮 */ 
        .header-search-btn
          position absolute
          top 14px
          left 160px
          display inline-block
          width 34px
          height 34px
          margin 10px
          background url(./img/search.png) no-repeat

      .header-search    
        /* 帮助 */
        .header-search-help
          display inline-block
          height 70px
          line-height 70px
          color $color-text-sub
          font-size 15px
          font-weight bolder
        .header-search-logout
          padding 0 5px        
</style>






