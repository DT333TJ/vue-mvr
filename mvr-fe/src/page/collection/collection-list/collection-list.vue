/** 
 * @Desc: 收藏列表
 */
<template>
  <div class="collction-list">
    <div class="collection-header">
      <!-- 单选框  -->
      <el-radio-group v-model="radioValue" @change="_radioValueChange">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">视频</el-radio>
        <el-radio :label="2">交互课件</el-radio>
      </el-radio-group>

      <!-- 资源数目 -->
      <count class="header-right" :countData="countData"></count>
    </div>

    <!-- 数据列表 -->
    <div class="collection-list" v-show="dataFlag">
      <resource-item 
        v-for="(item, index) in collectionList"
        @refreshList="_refreshGetList"  
        :key="index" 
        :itemInfo="item"
        :routerParam="routerObject">
      </resource-item> 
    </div>

    <!-- 没有数据 -->
    <div class="collection-nodata" v-show="!dataFlag" style="font-size: 30px">
      很抱歉，当前还没有被收藏的资源
    </div>

    <!-- 分页 -->
    <el-pagination
      style="text-align:center"
      v-show="pagination.visible"
      layout="prev, pager, next"
      :current-page="queryParam.pageNum"
      :total="pagination.total"
      :page-size="30"
      @current-change="_pageNumChange"
      prev-text="上一页"
      next-text="下一页">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import Count from 'component/count/count'
  import resourceItem from 'component/resource-item/resource-item'
  import { requestGetCollectList } from 'api/resource'
  import { sessionStorageUtil } from 'lib/util'

  export default {
    name: 'collction-list',
    components: {
      Count,
      resourceItem
    },
    data: function() {
      return {
        // 收藏参数
        queryParam: {
          pageNum: 1,
          pageSize: 30,
          resourceType: 0
        },
        
        // radioValue
        radioValue: 0,
        countData: {  // 资源数目
          countNumber: 0
        },
        dataFlag: true, //默认含有数据
        collectionList: [], //收藏的数据 
        routerObject: { // 传递给面包屑的跳转路由数据
          routerLinkName: 'collection-detail',
          routerParamValue:  ''
        },
        pagination: { // 分页参数
          visible: true,
          total: 0
        }
      }
    },
    watch: {
      queryParam: {
        deep: true,
        handler() {
          this._queryParamChange()
        }
      }
    },
    created: function() {
      // 设置单选按钮的显示 , 代码注意顺序问题，先获得参数值，在获得资源值
      sessionStorageUtil.getItem('collect_resourceType') && this._getDataFromStorage()
      this._getCollectedList(this.queryParam)
    },
    methods: {
      /** 
      * 单选框值变化
      */
      _radioValueChange: function(value) {
        this.queryParam.resourceType = value
        sessionStorageUtil.setItem('collect_resourceType', this.queryParam.resourceType)
      },

      /** 
      *从storage中获取数据
      */
      _getDataFromStorage: function() {
        this.queryParam.resourceType = sessionStorageUtil.getItem('collect_resourceType')
        this.radioValue = sessionStorageUtil.getItem('collect_resourceType')
      },

      /** 
      * 监听params改变 
      */
      _queryParamChange: function() {
        this._getCollectedList(this.queryParam)
      },

      /** 
      * 获得收藏的资源列表
      * @param {Object} data: 请求的参数  
      */
      _getCollectedList: function(data) {
        requestGetCollectList(data).then( response => {
          if (response.code == 0) {
            // 获得收藏的值
            this._getCollectedData(response.data.datas)
            // 设置资源数量
            this._getTotalCount(response.data.totalCount)
          }
        })
      },

      /**
      * 处理搜索获得的值
      * @param {Object} array: response的返回值 
      */
      _getCollectedData: function(array) {
        // 清空
        this.collectionList = []
        // 无资源数据
        if(array.length === 0) this.dataFlag = false
        else {
          this.dataFlag = true
          this.collectionList = array
          // 回到顶部
          document.documentElement.scrollTop = document.body.scrollTop = 0 
        }
      },

      /**
      * 传递资源总数目给父组件和分页 
      * @param {Number} num: 资源数量
      */
      _getTotalCount: function(num) {
        num >30 ? this.pagination.visible = true : this.pagination.visible = false
        this.pagination.total = num
        this.countData.countNumber = num
      }, 

      /** 
      * 分页页码变化 
      */
      _pageNumChange: function(val) {
        this.queryParam.pageNum = val
        document.documentElement.scrollTop = document.body.scrollTop = 0
      },

      /** 
      * 监听收藏组件的值
      */
      _refreshGetList: function() {
        this._getCollectedList(this.queryParam)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/mixin'

  .collction-list
    /* 单选 资源数目区域 */
    .collection-header
      border-bottom 1px solid 
      margin 30px 0 10px
      line-height 49px
      clear-float()
      .header-right
        float right
    /* 列表 */
    .collection-list
      margin-bottom 30px
      clear-float()
    /* 没有资源 */  
    .collection-nodata
      height 30px
      line-height 30px
      padding-top 30px
      text-align center      
</style>
