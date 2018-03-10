/** 
 * @Desc: 详情
 */
<template>
  <div class="detail">
    <!-- 面包屑 -->
    <crumb :crumbData="crumbData"></crumb>

    <!-- 视频容器 -->
    <video-box :videoInfo="videoData" v-if="typeVisible" ref="VideoBox"></video-box>

    <!-- 课件容器 -->
    <div class="courseware-box" v-else>
      <!-- swf html5 -->
      <embed
        v-if="subTypeVisible.objectVisible"
        :src="fileUrl" 
        width="100%"
        height="100%">
      </embed>

      <!-- 其他种类的资源 -->
      <img
        v-if="subTypeVisible.imageVisible"
        class="courseware-image" 
        :src="imgSrc" 
        :alt="detailInfo.title"
        @mouseover="_mouseOverHandle"/>

      <!-- 其他种类的资源提示 -->
      <div class="cover-mask" v-if="maskVisible" @mouseout="_mouseOutHandle">
        本资源暂不支持在线预览，请下载使用
      </div>
    </div>

    <!-- 详情介绍 -->
    <div class="resource-info">
      <p class="info-item">资源说明</p>
      <p class="info-item info-name">{{detailInfo.title}}</p>
      <p class="info-item info-txt">{{detailInfo.description}}</p>
    </div>

    <!-- 下载区域 -->
    <div class="download-section">
      <love
        title="收藏" 
        :leftValue="10" 
        :bottomValue="0" 
        :loveFlag="detailInfo.isCollected"
        :loveText="'收藏'"
        :loveTextFlag="true" 
        @click.native="_collectClick(detailInfo)">
      </love>

      <!-- 资源下载 -->
      <a 
        class="download-button" 
        style="margin-left: 80px"
        :href="fileUrl"
        :download="fileUrl"
        :title="fileUrl">
        <i class="icon icon-video"></i>
        <span>下载资源</span>
      </a>

      <!-- 播放器下载 -->
      <a 
        class="download-button" 
        style="margin-left: 10px" 
        v-show="typeVisible"
        title="secure_ViewBox.swf"
        href="/static/res/secure_ViewBox.swf"
        download="/static/res/secure_ViewBox.swf">
        <i class="icon icon-player"></i>
        <span>下载播放器</span>
      </a>

      <!-- 全屏按钮 -->
      <!-- <i
        v-if="subTypeVisible.objectVisible" 
        class="el-icon-rank"
        @click="_fullScreenBtnClick" 
        style="font-size: 22px;transform: rotate(-45deg);cursor: pointer;margin-left: 10px;color: #345f59">
      </i> -->
    </div>

    <!-- 全屏的组件 -->
    <!-- <full v-if="subTypeVisible.objectVisible" ref="fullBox" :embedUrl="fileUrl"></full> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import screenfull from 'screenfull'
  import Full from 'component/full'
  import Crumb from 'component/crumb/crumb'
  import VideoBox from 'component/video-box/video-box'
  import Love from 'component/love/love'
  import { baseURL } from 'config/config'
  import { originUrl } from 'config/constant'
  import { requestCollectResource, requestDeleteCollectResource, requestGetResourceDetail} from 'api/resource'

  export default {
    name: 'resource-detail',
    components: {
      Crumb,
      VideoBox,
      Love,
      Full
    },
    data: function() {
      return {
        // crumb 对象
        crumbData: {
          pageName: '',
          name: '',
          resourceName: '',
          crumbParam: '' // 传递给面包屑的参数
        },
        // 资源信息对象
        detailInfo: {},
        // 视频对象
        videoData: {
          fileUrl: '',
          coverUrl: ''
        },

        // visible对象
        maskVisible: false,
        typeVisible: true,
        subTypeVisible: {
          iframeVisible: false,
          objectVisible: false,
          imageVisible: false
        },

        // 网站的origin
        origin: originUrl
      }
    },
    computed: {
      imgSrc: function() {
        // 本地
        // return  'http://dev-mvr.viewshare.net'+ '/' + this.detailInfo.coverUrl

        return originUrl + '/' + this.detailInfo.coverUrl
      },
      fileUrl: function() {
        // 本地
        // return 'http://dev-mvr.viewshare.net' + '/' + this.detailInfo.fileUrl

        return originUrl + '/' + this.detailInfo.fileUrl
      }
    },
    beforeRouteLeave: function(to, from, next) {
      // 页面离开的时候清空正在播放的视频
      if (this.$refs.VideoBox) {
        this.$refs.VideoBox._clearVideoBox()
      }
      next()
    },
    mounted: function() {
      this._getQueryInfo()
    },
    methods: {
      /** 
      * 检验是不是IE10
      */
      _checkIsIE10: function() {
        let userAgent = window.navigator.userAgent
        let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器 
        let reIE = new RegExp("MSIE (\\d+\\.\\d+);") 
        reIE.test(userAgent)  
        let fIEVersion = parseFloat(RegExp["$1"])
        if (fIEVersion <= 10 ) {
          this.$alert('为了更好的体验效果，请使用高级的浏览器', {
            dangerouslyUseHTMLString: true
          })
        }
      },

      /** 
      * 获取query信息
      */
      _getQueryInfo: function() {
        let query = this.$route.query
        if (query) {
          // 设置面包屑数据
          const linkName = query.routerLinkName
          switch (linkName) {
            case 'resource-detail':
              this.crumbData.pageName = '首页'
              this.crumbData.name = 'resource-list'
              break
            case 'collection-detail':
              this.crumbData.pageName = '收藏'
              this.crumbData.name = 'collection-list'
              break
            case 'search-detail':
              this.crumbData.pageName = '搜索'
              this.crumbData.name = 'search-list'
              break
            default:
              this.crumbData.pageName = ''
              this.crumbData.name = '' 
              break 
          }
          // 设置keyword参数，为了区分从搜索来的数据，同时通过传递搜索值来返回搜索的展示页面
          this.crumbData.crumbParam = query.routerParamValue
          // 获得当前资源的所有信息
          this._getResourceDetail(query.resourceId)
        }
      },

      /** 
      * 通过Id来获得当前资源的信息
      * @param {Number} resourceId: 当前资源的ID 
      */
      _getResourceDetail: function(resourceId) {
        return requestGetResourceDetail(resourceId).then( response => {
          if (response.code == 0) {
            this._setDetailData(response.data)
          }
        })
      },

      /** 
      * 通过响应的数据设置页面的展示情况
      * @param {Object} data: 响应的数据
      */
      _setDetailData: function(data) {
        this.detailInfo = data
        // 视频对象数据
        this.videoData = {
          fileUrl: data.fileUrl,
          coverUrl: data.coverUrl
        }
        this.crumbData.resourceName = this.detailInfo.title
        // 根据资源类别来展示不同的页面元素
        this.typeVisible = this.detailInfo.resourceType == '1' ? true : false
        // 在根据具体的资源小分类在页面中展示不同的各种元素
        switch (parseInt(this.detailInfo.resourceSubType)) {
          case 4:
            this.subTypeVisible = {
              iframeVisible: false,
              objectVisible: true,
              imageVisible: false
            }
            this._checkIsIE10()
            break
          case 6:
            this.subTypeVisible = {
              iframeVisible: false,
              objectVisible: true,
              imageVisible: false
            }
            this._checkIsIE10()
            break
          default:
            this.subTypeVisible = {
              iframeVisible: false,
              objectVisible: false,
              imageVisible: true
            }
            break
        }
      },


      /** 
      * 收藏按钮点击
      * @param {Object} item: 当前对象
      */
      _collectClick: function(item) {
        item.isCollected == 0 ? this._cancleCollected(item) : this._setCollected(item)
      },

      /** 
      * 设置收藏
      */
      _setCollected: function(item) {
        const param = {
          resourceType: item.resourceType,
          resourceId: item.id
        }
        requestCollectResource(param).then( response =>{
          if (response.code == 0) {
            this.$vmessage('success', response.message, 1500)
            // 重新获得资源信息
            this._getResourceDetail(item.id)
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
            // 重新获得资源信息
            this._getResourceDetail(item.id)
          }
        })
      },

      /** 
      * 鼠标移入显示下载
      */
      _mouseOverHandle: function() {
        this.maskVisible = true
      },

      /** 
      * 鼠标移出隐藏提示
      */
      _mouseOutHandle: function() {
        this.maskVisible = false
      },

      /** 
      * 全屏按钮
      */
      _fullScreenBtnClick: function() {
        this.$refs.fullBox._show()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'
  @import '~style/mixin'

  /* 详情 */
  .detail
    position relative
    clear-float()
    /* 课件容器*/
    .courseware-box
      position relative
      float left 
      width 1200px
      height 675px
      @media screen and (max-width 1600px) 
        width 864px
        height 486px
      .course-iframe
        width 100%
        height 100%  
      .courseware-image
        width 100%
        height 100%
        cursor pointer
      .cover-mask
        position absolute
        top 0
        left 0
        z-index 99
        width 100%
        height 100%
        line-height 675px
        text-align center
        font-size 30px
        background-color #bab3b3
        @media screen and (max-width 1600px)
          line-height 486px 

    /* 下载区域 */
    .download-section
      position relative
      float left
      width 1200px
      height 30px
      margin-top 10px
      border-bottom 1px solid $color-border-sub
      @media screen and (max-width 1600px)
        width 864px
      .download-button
        display inline-block
        height 30px
        line-height 30px
        font-weight bold
        font-size $font-size-medium-x
        color $color-theme
        opacity .8
        &:hover
          opacity .9
        .icon
          float left
          display inline-block
          width 30px
          height 30px
          background-position center
          background-repeat no-repeat
        .icon-video
          background-image url(./img/i-download-big.png)
        .icon-player
          background-image url(./img/i-player.png)
      
    /* 课件信息*/
    .resource-info
      float left
      width 280px
      height 380px
      padding 20px
      margin-left 20px
      background-color $color-theme-sub
      .info-item
        margin-bottom 20px  
        text-align center
        color $color-theme
      /* 名称 */  
      .info-name
        text-align left
        text-indent 20px
        line-height 1.5
        font-weight bold  
        font-size $font-size-medium-x
      /* 详情 */
      .info-txt
        font-weight bold
        text-align left
        line-height 1.6   
</style>
