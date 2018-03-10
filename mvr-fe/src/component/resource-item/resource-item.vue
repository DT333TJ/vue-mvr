/** 
 * @Desc: 视频资源Item组件
 */
<template>
  <div class="resource-item">
    <!-- 资源种类图标 -->
    <div 
      class="item-icon"
      :class="{
        'item-video': itemInfo.resourceSubType === 1,
        'item-html5': itemInfo.resourceSubType === 2 || itemInfo.resourceSubType === 6,
        'item-gsp': itemInfo.resourceSubType === 3,   
        'item-flash': itemInfo.resourceSubType === 4,
        'item-java': itemInfo.resourceSubType === 5}">
    </div>

    <!-- img -->
    <router-link
      class="item-img clickable" 
      tag="img"
      :src="imgSrc"
      :to="{name: this.routerParam.routerLinkName, query: crumbParam}"
      :alt="itemInfo.title"
      :title="imgSrc">
    </router-link>

    <!-- 相关信息 -->
    <div class="item-time" v-if="itemInfo.duration">{{itemInfo.duration}}</div>
    <div class="item-title">{{itemInfo.title}}</div>

    <!-- 收藏 -->
    <love
      title="收藏" 
      :leftValue="220" 
      :bottomValue="12" 
      :loveFlag="itemInfo.isCollected"
      :loveTextFlag="false"
      @click.native="_collectClick(itemInfo)">
    </love>
  </div>
</template>

<script type="text/ecmascript-6">
  import { baseURL } from 'config/config'
  import { originUrl } from 'config/constant'
  import { requestCollectResource, requestDeleteCollectResource} from 'api/resource'
  import Love from 'component/love/love'

  export default {
    name: 'resource-item',
    components: {
      Love
    },
    props: {
      itemInfo: {
        type: Object
      },
      routerParam: {
        type: Object,
        required: true
      }
    },
    data: function() {
      return {
        loveFlag: false,
        routerQuery: {}
      }
    },
    computed: {
      imgSrc: function() {
        // 本地
        // return 'http://dev-mvr.viewshare.net' + '/' + this.itemInfo.coverUrl
        return originUrl + '/' + this.itemInfo.coverUrl
      },
      /** 
      * 传递给面包屑的数据，面包屑根据数据来获得返回相应主页面的参数数据  
      */
      crumbParam: function() {
        let obj = {
          resourceId: this.itemInfo.id
        }
        return Object.assign({}, this.routerParam, obj)
      }
    },
    methods: {
      /** 
      * 收藏按钮点击
      * @param {Object} item: 当前对象
      */
      _collectClick: function(item) {
        item.isCollected === 0 ? this._cancleCollected(item) : this._setCollected(item)
      },

      /** 
      * 设置收藏
      */
      _setCollected: function(item) {
        const param = {
          resourceType: item.resourceType,
          resourceId: item.id
        }
        // 调用添加收藏的方法
        requestCollectResource(param).then( response =>{
          if (response.code === 0) {
            this.$vmessage('success', response.message, 1500)
            // 触发父组件重新获取数据
            this.$emit('refreshList')
          } 
        })
      },

      /** 
      * 取消收藏 
      */
      _cancleCollected: function(item) {
        const param = {
          resourceType: item.resourceType,
          resourceId: item.id
        }
        // 调用取消收藏的方法
        requestDeleteCollectResource(param).then( response => {
          if (response.code === 0) {
            this.$vmessage('info', response.message, 1500)
            // 触发父组件重新获取数据
            this.$emit('refreshList')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'
  @import '~style/mixin'

  .resource-item
    position relative
    float left
    box-sizing content-box
    width 250px
    height 200px
    margin 10px 15px 
    border-radius 4px
    border 1px solid $color-border-sub
    &:hover
      box-shadow 0 10px 30px rgba(0,0,0,.1)
      -webkit-transform translate3d(0,-2px,0)
      transform translate3d(0,-2px,0)

    /* 图标*/
    .item-icon
      position absolute
      top 0
      right 0
      width 38px
      height 38px
    .item-video  
      background url(./img/video.png) no-repeat
    .item-flash
      background url(./img/flash.png) no-repeat
    .item-html5
      background url(./img/html5.png) no-repeat 
    .item-gsp
      background url(./img/gsp.png) no-repeat
    .item-java
      background url(./img/java.png) no-repeat  

    /* 图片 */ 
    .item-img
      width 100%
      height 150px
    /* 时长 */  
    .item-time
      position absolute
      bottom 60px
      right 5px
      display inline-block
      height 22px
      line-height 22px
      padding 0 10px
      text-align center
      color $color-text-w
      background-color rgba(128, 128, 128, .6)
      border-radius 12px
    /* 信息 */  
    .item-title
      height 44px
      line-height 44px
      padding 0 54px 0 12px
      no-wrap()
    /* 下载 */    
    .item-download
      position absolute
      right 0
      bottom 0
      width 30px
      height 44px
      background url(./img/i-download.png) no-repeat center
</style>
