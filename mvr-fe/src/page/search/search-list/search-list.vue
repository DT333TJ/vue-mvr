/** 
 * @Desc: 搜索列表
 */
<template>
  <div class="search-list">
    <!-- 单选框 -->
    <div class="search-header">
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
    <div class="list-wrapper" v-show="dataFlag">
      <resource-item 
        v-for="(item, index) in searchList"
        @refreshList="_refreshGetList" 
        :key="index" 
        :itemInfo="item"
        :routerParam="routerObject">
      </resource-item> 
    </div>

    <!-- 没有数据 -->
    <div class="search-nodata" v-show="!dataFlag" style="font-size: 30px">
      很抱歉，没有搜到想要的资源
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
  import { requestGetSearchResource } from 'api/resource'
  import { sessionStorageUtil } from 'lib/util'
  import Bus from 'lib/bus'

  export default {
    name: 'search-list',
    components: {
      Count,
      resourceItem
    },
    data: function() {
      return {
        // 查询对象
        queryParam: {
          keyWord: '',
          pageNum: 1,
          pageSize: 30,
          resourceType: 0
        },
        // 单选框数据
        radioValue: 0,
        // 资源数目
        countData: {  
          countNumber: 0
        },
        dataFlag: true, //默认含有数据
        searchList: [], //搜索的数据 
        pagination: {
          visible: true,
          total: 0
        },
        routerObject: { // 传递给面包屑的跳转路由数据
          routerLinkName: 'search-detail',
          routerParamValue:  ''
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
      // 接收bus传递的搜索值
      Bus.$on('SearchValue', (SearchValue) => {
        this.queryParam.keyWord = SearchValue
        this.routerObject.routerParamValue = SearchValue
      })
      // 设置单选按钮的显示
      sessionStorageUtil.getItem('search_resourceType') && this._getDataFromStorage()
      // 获取query值
      this._getQueryParam()
    },
    beforeDestroy: function() {
      // 移除事件
      Bus.$off('SearchValue')
    },
    methods: {
      /** 
       * 从url中获取查询字段
       */
      _getQueryParam: function() {
        let queryParam = this.$route.query.keyWord
        if (queryParam) {
          this.queryParam.keyWord = queryParam
          // 设置传递给面包屑的数值
          this.routerObject.routerParamValue = queryParam
        }
      },

      /** 
       * 获取收藏的数据
       * @param {Object} data : 查询的参数对象
       */
      _getSearchList: function(data) {
        return requestGetSearchResource(data)
          .then( response => {
            if (response.code == 0) {
              // 获得搜索的值
              this._getSearchData(response.data.datas)
              // 设置资源数量
              this._getTotalCount(response.data.totalCount)
            }
          })
      },

      /**
       * 处理搜索获得的值
       * @param {Object} array: response的返回值 
       */
      _getSearchData: function(array) {
        // 清空
        this.resourceList = []
        // 无资源数据
        if(array.length === 0) this.dataFlag = false
        else {
          this.dataFlag = true
          this.searchList = array
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
       * 单选框的值
       */
      _radioValueChange: function(value) {
        this.queryParam.resourceType = value
        sessionStorageUtil.setItem('search_resourceType', this.queryParam.resourceType)
      },

      /** 
       *从storage中获取数据
      */
      _getDataFromStorage: function() {
        this.radioValue = sessionStorageUtil.getItem('search_resourceType')
        this.queryParam.resourceType = sessionStorageUtil.getItem('search_resourceType')
      },

      /** 
       * 监听params改变 
       */
      _queryParamChange: function() {
        this._getSearchList(this.queryParam)
      },

      /** 
       * 分页页码变化 
       */
      _pageNumChange: function(val) {
        this.queryParam.pageNum = val
      },

      /** 
       * 监听收藏组件的值
       */
      _refreshGetList: function() {
        this._getSearchList(this.queryParam)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/mixin'

  .search-list
    /* 单选 资源数目区域 */
    .search-header
      border-bottom 1px solid 
      margin 30px 0 10px
      line-height 49px
      clear-float()
      .header-right
        float right
    /* 列表 */
    .list-wrapper
      margin-bottom 30px
      clear-float()
    /* 没有资源 */  
    .search-nodata
      height 30px
      line-height 30px
      padding-top 30px
      text-align center    
</style>
