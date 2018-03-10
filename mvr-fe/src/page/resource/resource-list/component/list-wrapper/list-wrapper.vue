/** 
 * @Desc: 资源展示组件
 */
<template>
  <div class="list-wrapper">
    <div class="wrapper-header">
      <!-- 单选框组-->
      <el-radio-group v-model="radioValue" @change="_radioValueChange">
        <el-radio :label="0">全部</el-radio>
        <el-radio :label="1">视频</el-radio>
        <el-radio :label="2">交互课件</el-radio>
      </el-radio-group>

      <!-- 资源数目 -->
      <count class="header-right" :countData="countData"></count>
    </div>

    <!-- 资源列表 -->
    <div class="resource-list" v-show="dataFlag">
      <resource-item 
        v-for="(item, index) in resourceList"
        @refreshList="_refreshGetList" 
        :key="index" 
        :itemInfo="item"
        :routerParam="routerObject">
      </resource-item> 
    </div>

    <!-- 没有数据 -->
    <div class="resource-nodata" v-show="!dataFlag" style="font-size: 30px">
      很抱歉，当前选项没有资源
    </div>

    <!-- 分页 -->
    <el-pagination
      style="text-align:center"
      v-show="pagination.visible"
      layout="prev, pager, next"
      :current-page="params.pageNum"
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
import Bus from 'lib/bus.js'
import { requestGetResourceList } from 'api/resource'
import { sessionStorageUtil } from 'lib/util'

export default {
  name: 'list-wrapper',
  components: {
    resourceItem,
    Count
  },
  data: function() {
    return {
      params: {    // 获取资源的参数对象
        levelId: 0,
        subjectId: 0,
        editionId: 0,
        volumeId: 0,
        chapterId: 0,
        pageNum: 1,
        pageSize: 30,
        resourceType: 0    
      },

      // 单选数据
      radioValue: 0,
      
      // 资源数目
      countData: {  
        countNumber: 0
      },

      resourceList: [], // 资源list
      temp: [], // 临时存储
      dataFlag: true, // 是否含有数据,默认有数据
      pagination: {
        visible: true,
        total: 0
      },
      routerObject: { //往下传递的面包屑路由数据
        routerLinkName: 'resource-detail',
        routerParamValue: ''
      }
    }
  },
  watch: {
    params: {
      deep: true,
      handler() {
        this._paramsChange()
      }
    }
  },
  created: function() {
    // 注册接收选择器选中数据事件，无法使用存储，刷新只能回到第一次的状态
    Bus.$on('filterSelect', (filterSelect) => {
      // 拷贝filterSelect的属性到this.params
      if (sessionStorageUtil.getItem('resourceType')) {
        this.params.resourceType = sessionStorageUtil.getItem('resourceType')
        this.radioValue = sessionStorageUtil.getItem('resourceType')
      }
      this.params = Object.assign({}, this.params, filterSelect)
    })
  },
  beforeDestroy: function() {
    // 移除事件
    Bus.$off('filterSelect')
  },
  methods: {
    /** 
     * 单选框值变化
    */
    _radioValueChange: function(value) {
      this.params.resourceType = value
      sessionStorageUtil.setItem('resourceType', this.params.resourceType)
    },
    
    /** 
     * 监听params改变 
     */
    _paramsChange: function() {
      this._getResourceList(this.params)
    },

    /** 
     * 获取视频列表
     * @param {Object} data: 请求的参数  
     */
    _getResourceList: function(data) {
      requestGetResourceList(data).then( response => {
        if(response.code === 0) {
          // 获取资源列表
          this._getResourceData(response.data.datas)
          // 设置资源数量
          this._getTotalCount(response.data.totalCount)
        } 
      })
    },

    /** 
     * 视频列表数据处理
     * @param {Object} array: response的返回值 
     */
    _getResourceData: function(array) {
      // 清空
      this.resourceList = []
      // 无资源数据
      if(array.length === 0) {
        this.dataFlag = false
      } else { 
        this.dataFlag = true
        this.resourceList = array
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
      this.params.pageNum = val
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },

    /** 
     * 监听收藏组件的值
     */
    _refreshGetList: function() {
      this._getResourceList(this.params)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/mixin'

  .list-wrapper
    position relative
    transform translate(0,0)
    margin-bottom 30px
    /* 资源信息 */
    .wrapper-header
      border-bottom 1px solid 
      margin 10px 0
      line-height 49px
      clear-float()
      .header-right
        float right
    /* 资源列表 */
    .resource-list
      margin-bottom 30px
      clear-float()
    /* 没有资源 */  
    .resource-nodata
      height 30px
      line-height 30px
      padding-top 30px
      text-align center  
</style>
