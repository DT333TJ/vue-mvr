/** 
 * @Desc: 筛选器组件
 */
<template>
  <div class="filter">
    <!-- 学段 -->
    <div class="filter-content" v-show="filterData.levelsData.length">
      <p class="filter-content-txt">学段：</p>
      <div class="filter-content-list">
        <ul class="list-item">
          <li 
            v-for="(levelItem, index) in filterData.levelsData"
            class="item clickable"
            :class="{'itemActive': indexObj.levelIndex === index}"
            :key="index"
            :title="levelItem.levelName + '@' +levelItem.levelId"
            :data-id="levelItem.levelId"
            @click="_levelItemClick(levelItem, index)">
            {{levelItem.levelName}}
          </li>
        </ul>
      </div>
    </div>
    
    <!-- 学科 -->
    <div class="filter-content" v-show="filterData.subjectsData.length">
      <p class="filter-content-txt">学科：</p>
      <div class="filter-content-list">
        <ul class="list-item">
          <li 
            v-for="(subjectItem, index) in filterData.subjectsData"
            class="item clickable"
            :class="{'itemActive': indexObj.subjectIndex === index}"
            :key="index"
            :title="subjectItem.subjectName + '@' +subjectItem.subjectId"
            :data-id="subjectItem.subjectId"
            @click="_subjectItemClick(subjectItem, index)">
            {{subjectItem.subjectName}}
          </li>
        </ul>
      </div>
    </div>
    
    <!-- 版本 -->
    <div class="filter-content" v-show="filterData.editionsData.length">
      <p class="filter-content-txt">版本：</p>
      <div class="filter-content-list">
        <ul class="list-item">
          <li 
            v-for="(editionItem, index) in filterData.editionsData"
            class="item clickable"
            :class="{'itemActive': indexObj.editionIndex === index}"
            :key="index"
            :title="editionItem.editionName + '@' +editionItem.editionId"
            :data-id="editionItem.editionId"
            @click="_editionItemClick(editionItem, index)">
            {{editionItem.editionName}}
          </li>
        </ul>
      </div>
    </div>
    
    <!--  册别 -->
    <div class="filter-content" v-show="filterData.volumesData.length">
      <p class="filter-content-txt">册别：</p>
      <div class="filter-content-list">
        <ul class="list-item">
          <li 
            v-for="(volumeItem, index) in filterData.volumesData"
            class="item clickable"
            :class="{'itemActive': indexObj.volumeIndex === index}"
            :key="index"
            :title="volumeItem.volumeName + '@' + volumeItem.volumeId"
            :data-id="volumeItem.volumeId"
            @click="_volumeItemClick(volumeItem, index)">
            {{volumeItem.volumeName}}
          </li>
        </ul>
      </div>
    </div>
    
    <!-- 章 -->
    <div class="filter-content" v-show="filterData.chaptersData.length">
      <p class="filter-content-txt">章：</p>
      <div class="filter-content-list">
        <ul class="list-item">
          <li 
            v-for="(chapterItem, index) in filterData.chaptersData"
            class="item clickable"
            :class="{'itemActive': indexObj.chapterIndex === index}"
            :key="index"
            :title="chapterItem.chapterName + '@' +chapterItem.chapterId"
            :data-id="chapterItem.chapterId"
            @click="_chapterItemClick(chapterItem, index)">
            {{chapterItem.chapterName}}
          </li>
        </ul>
      </div>
    </div>
    
    <!--  节 -->
    <div class="filter-content" v-show="filterData.sectionsData.length">
      <p class="filter-content-txt">节：</p>
      <div class="filter-content-list">
        <ul class="list-item">
          <li 
            v-for="(sectionItem, index) in filterData.sectionsData"
            class="item clickable"
            :class="{'itemActive': indexObj.sectionIndex === index}"
            :key="index"
            :title="sectionItem.chapterName + '@' + sectionItem.chapterId"
            :data-id="sectionItem.chapterId"
            @click="_sectionItemClick(sectionItem, index)">
            {{sectionItem.chapterName}}
          </li>
        </ul>
      </div>
    </div>
   
    <!-- 部分 -->
    <div class="filter-content" v-show="filterData.partsData.length">
      <p class="filter-content-txt">部分：</p>
      <div class="filter-content-list">
        <ul class="list-item">
          <li 
            v-for="(partItem, index) in filterData.partsData"
            class="item clickable"
            :class="{'itemActive': indexObj.partIndex === index}"
            :key="index"
            :title="partItem.chapterName + '@' +partItem.chapterId"
            :data-id="partItem.chapterId"
            @click="_partItemClick(partItem, index)">
            {{partItem.chapterName}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { requestGetFilterList } from 'api/resource'
import { sessionStorageUtil } from 'lib/util'
import Bus from 'lib/bus'

export default {
  name: 'v-filter',
  data: function() {
    return {
      // 当前的indexObj,显示当前点击的状态
      indexObj: {
        levelIndex: 0,
        subjectIndex: 0,
        editionIndex: 0,
        volumeIndex: 0,
        chapterIndex: 0,
        sectionIndex: 0,
        partIndex: 0
      },
      activeIndex: 0,
      // 筛选条件的数据
      filterData: {
        levelsData: [], // 学段
        subjectsData: [], // 学科
        editionsData: [], // 版本
        volumesData: [], // 册别
        chaptersData: [], // 章
        sectionsData: [], // 节
        partsData: [] // 部分
      },
      // 传递的数据
      filterSelect: {
        levelId: 1, //学段
        subjectId: 1, //学科
        editionId: 1, //版本
        volumeId: 1, //册别
        chapter1Id: 1, //一级章节
        chapterId: null, //二级章节
        chapter3Id: null //三级章节
      }
    }
  },
  watch: {
    filterSelect: {
      deep: true,
      handler(newValue) {
        this._busEvent()
        this._storageFilterSelect()
      }
    },
    indexObj: {
      deep: true,
      handler(newValue) {
        this._storageIndex()
      }
    },
    filterData: {
      deep: true,
      handler(newValue) {
        this._storageFilterData()
      }
    }
  },
  created: function() {
    sessionStorageUtil.getItem('filterData') ? this._getDataFromStorage() : this._getFilterList()
  },
  methods: {
    /** 
     * 获取并存储资源目录数据 
     */
    _getFilterList: function() {
      requestGetFilterList()
        .then( response => {
          if(response.code === 0) {
            this._getLevelList(response.data)
          } 
        })
      
    },

    /** 
     * bus事件 
     */
    _busEvent: function() {
      Bus.$emit('filterSelect', this.filterSelect)
    },

    /** 
     * storage存储filterSelect 
     */
    _storageFilterSelect: function() {
      sessionStorageUtil.setItem('filterSelect', this.filterSelect)
    },

    /** 
     * storage存储下标 
     */
    _storageIndex: function() {
      sessionStorageUtil.setItem('filterIndex', this.indexObj)
    },

    /** 
     * storage存储filter的数据 
     */
    _storageFilterData: function() {
      sessionStorageUtil.setItem('filterData', this.filterData)
    },

    /** 
     * 提取storage中存储的当前选项数据
     */
    _getDataFromStorage: function() {
      this.filterData = Object.assign({}, this.filterData, sessionStorageUtil.getItem('filterData'))
      this.filterSelect = Object.assign({}, this.filterSelect, sessionStorageUtil.getItem('filterSelect'))
      sessionStorageUtil.getItem('filterIndex') && (this.indexObj = Object.assign({}, this.indexObj, sessionStorageUtil.getItem('filterIndex')))
    }, 

    /** 
     * 查看是否存在对应属性名的数据，存在返回数据，不存在返回false
     * @param {Object} obj: 要查看的对象
     * @param {String} name: 下级数据的属性名 
     */
    _checkChildExist: function (obj, name) {
      return obj[name] == null ? false : obj[name]
    },

    /** 
     * 获得学段数据
     * @param {Object} array: 数组参数
     */
    _getLevelList: function(array) {
      this.filterData.levelsData = array
      this.filterSelect.levelId = this.filterData.levelsData[0].levelId
      this._checkChildExist(array[0], 'subjects') && this._getSubjectList(this._checkChildExist(array[0], 'subjects'))
    },

    /** 
     * 获得学科数据
     * @param {Object} array: 学段对应的学科数据
     */
    _getSubjectList: function(array) {
      this.filterData.subjectsData = array
      this.filterSelect.subjectId = this.filterData.subjectsData[0].subjectId
      this._checkChildExist(array[0], 'editions') && this._getEditionList(this._checkChildExist(array[0], 'editions'))
    },

    /** 
     * 获得版本数据
     * @param {Object} array: 学科对应的版本数据
     */
    _getEditionList: function(array) {
      this.filterData.editionsData = array
      this.filterSelect.editionId = this.filterData.editionsData[0].editionId
      this._checkChildExist(array[0], 'volumes') && this._getVolumeList(this._checkChildExist(array[0], 'volumes'))
    },

    /** 
     * 获得册别数据
     * @param {Object} array: 版本对应的册别数据
     */
    _getVolumeList: function(array) {
      this.filterData.volumesData = array
      this.filterSelect.volumeId = this.filterData.volumesData[0].volumeId
      this._checkChildExist(array[0], 'chapters') && this._getChapterList(this._checkChildExist(array[0], 'chapters'))
    },

    /** 
     * 获得章数据
     * @param {Object} array: 册别对应的章数据
     */
    _getChapterList: function(array) {
      if (this._checkChildExist(array[0], 'chapters')) {
        this.filterData.chaptersData = array
        this.filterSelect.chapter1Id = this.filterData.chaptersData[0].chapterId
        this._getSectionList(this._checkChildExist(array[0], 'chapters'))
      } else {
        let temp = []
        let fullArr = [{
          chapterId: 0,
          chapterName: '全部'
        }]
        temp = fullArr.concat(array)
        this.filterData.chaptersData = temp
        // 清空二、三级章节的数据
        this.filterSelect.chapter1Id = null
        this.filterSelect.chapter3Id = null
        this.filterSelect.chapter1Id =this.filterData.chaptersData[0].chapterId
      }
    },

    /** 
     * 获得节数据
     * @param {Object} array: 章对应的节数据
     */
    _getSectionList: function(array) {
       if (this._checkChildExist(array[0], 'chapters')) {
        this.filterData.sectionsData = array
        this.filterSelect.chapterId = this.filterData.sectionsData[0].chapterId
        this._getPartList(this._checkChildExist(array[0], 'chapters'))
      } else {
        let temp = []
        let fullArr = [{
          chapterId: 0,
          chapterName: '全部'
        }]
        temp = fullArr.concat(array)
        this.filterData.sectionsData = temp
        // 清空三级章节的数据
        this.filterSelect.chapter3Id = null
        this.filterSelect.chapterId =this.filterData.sectionsData[0].chapterId
      }
    },

    /** 
     * 获得部分数据
     * @param {Object} array: 节对应的部分数据
     */
    _getPartList: function(array) {
      let temp = []
      let fullArr = [{
        chapterId: 0,
        chapterName: '全部'
      }]
      temp = fullArr.concat(array)
      this.filterData.partsData = temp
      this.filterSelect.chapter3Id =this.filterData.partsData[0].chapterId
    },

    /** 
     * 设置点击的下标对象数据，为参数设置默认值
     * @param {Number} type: 种类的index，默认值为0  
     * @param {Number} level: 学段的index，默认值为0  
     * @param {Number} subject: 学科的index，默认值为0  
     * @param {Number} edition: 版本的index，默认值为0  
     * @param {Number} volume: 册别的index，默认值为0  
     * @param {Number} chapter: 章的index，默认值为0  
     * @param {Number} section: 节的index，默认值为0  
     * @param {Number} part: 部分的index，默认值为0  
     */
    _getActiveClickedIndex(type=0, level=0, subject=0, edition=0, volume=0, chapter=0, section=0, part=0) {
      return this.indexObj= {
        typeIndex: type,
        levelIndex: level,
        subjectIndex: subject,
        editionIndex: edition,
        volumeIndex: volume,
        chapterIndex: chapter,
        sectionIndex: section,
        partIndex: part
      }
    },

    /**
     * 清空数据对象
     * @param {Array} type: 种类的index，默认值为[]  
     * @param {Array} level: 学段的index，默认值为[]
     * @param {Array} subject: 学科的index，默认值为[] 
     * @param {Array} edition: 版本的index，默认值为[]  
     * @param {Array} volume: 册别的index，默认值为[]
     * @param {Array} chapter: 章的index，默认值为[]  
     * @param {Array} section: 节的index，默认值为[] 
     * @param {Array} part: 部分的index，默认值为[]  
     */
    _clearfilterData: function(type=[], level=[], subject=[], edition=[], volume=[], chapter=[], section=[], part=[]) {
      return this.filterData= {
        typesData: type, 
        levelsData: level, 
        subjectsData: subject, 
        editionsData: edition, 
        volumesData: volume,
        chaptersData: chapter, 
        sectionsData: section, 
        partsData: part
      }
    },

    /** 
     * 种类点击 
     * @param {Object} item: 点击的数据对象 
     * @param {Number} i: 当前点击的下标 
     */
    _typeItemClick: function(item, i) {
      this._getActiveClickedIndex(i)
      i === 0 ? this.filterSelect.typeFlag = true : this.filterSelect.typeFlag = false
    },

    /** 
     * 学段点击
     * @param {Object} item: 点击的数据对象 
     * @param {Number} i: 当前点击的下标 
     */
    _levelItemClick: function(item, i) {
      // 获得当前点击的index
      this._getActiveClickedIndex(this.indexObj.typeIndex, i)
      // 赋值id
      this.filterSelect.levelId = item.levelId
      // 清空数据
      this._clearfilterData(this.filterData.typesData, this.filterData.levelsData)
      // 查询并获得下级数据
      this._checkChildExist(item, 'subjects') && this._getSubjectList(this._checkChildExist(item, 'subjects'))
    },

    /** 
     * 学科点击
     * @param {Object} item: 点击的数据对象
     * @param {Number} i: 当前点击的下标  
     */
    _subjectItemClick: function(item, i) {
      this.filterSelect.subjectId = item.subjectId
      this._getActiveClickedIndex(this.indexObj.typeIndex, this.indexObj.levelIndex, i)
      this._clearfilterData(this.filterData.typesData, this.filterData.levelsData, this.filterData.subjectsData)
      this._checkChildExist(item, 'editions') && this._getEditionList(this._checkChildExist(item, 'editions'))
    },

    /** 
     * 版本点击
     * @param {Object} item: 点击的数据对象
     * @param {Number} i: 当前点击的下标 
     */
    _editionItemClick: function(item, i) {
      this.filterSelect.editionId = item.editionId
      this._clearfilterData(
        this.filterData.typesData,
        this.filterData.levelsData,
        this.filterData.subjectsData,
        this.filterData.editionsData
      )
      this._getActiveClickedIndex(
        this.indexObj.typeIndex, 
        this.indexObj.levelIndex, 
        this.indexObj.subjectIndex, 
        i
      )
      this._checkChildExist(item, 'volumes') && this._getVolumeList(this._checkChildExist(item, 'volumes'))
    },

    /** 
     * 册别点击
     * @param {Object} item: 点击的数据对象
     * @param {Number} i: 当前点击的下标  
     */
    _volumeItemClick: function(item, i) {
      this.filterSelect.volumeId = item.volumeId
      this._clearfilterData(
        this.filterData.typesData,
        this.filterData.levelsData,
        this.filterData.subjectsData,
        this.filterData.editionsData,
        this.filterData.volumesData
      )
      this._getActiveClickedIndex(
        this.indexObj.typeIndex, 
        this.indexObj.levelIndex, 
        this.indexObj.subjectIndex, 
        this.indexObj.editionIndex, 
        i
      )
      this._checkChildExist(item, 'chapters') && this._getChapterList(this._checkChildExist(item, 'chapters'))
    },

    /** 
     * 章点击
     * @param {Object} item: 点击的数据对象
     * @param {Number} i: 当前点击的下标  
     */
    _chapterItemClick: function(item, i) {
      this.filterSelect.chapter1Id = item.chapterId
      // 清空之前的节和部分数据
      this.filterSelect.chapterId = null
      this.filterSelect.chapter3Id = null
      this._clearfilterData(
        this.filterData.typesData,
        this.filterData.levelsData,
        this.filterData.subjectsData,
        this.filterData.editionsData,
        this.filterData.volumesData,
        this.filterData.chaptersData
      )
      this._getActiveClickedIndex(
        this.indexObj.typeIndex, 
        this.indexObj.levelIndex, 
        this.indexObj.subjectIndex, 
        this.indexObj.editionIndex, 
        this.indexObj.volumeIndex, 
        i
      )
      this._checkChildExist(item, 'chapters') && this._getSectionList(this._checkChildExist(item, 'chapters'))
    },

    /** 
     * 节点击
     * @param {Object} item: 点击的数据对象
     * @param {Number} i: 当前点击的下标  
     */
    _sectionItemClick: function(item, i) {
      this.filterSelect.chapterId = item.chapterId
      // 清空之前的部分数据
      this.filterSelect.chapter3Id = null
      this._clearfilterData(
        this.filterData.typesData,
        this.filterData.levelsData,
        this.filterData.subjectsData,
        this.filterData.editionsData,
        this.filterData.volumesData,
        this.filterData.chaptersData,
        this.filterData.sectionsData
      )
      // 坐标对象
      this._getActiveClickedIndex(
        this.indexObj.typeIndex, 
        this.indexObj.levelIndex, 
        this.indexObj.subjectIndex, 
        this.indexObj.editionIndex, 
        this.indexObj.volumeIndex, 
        this.indexObj.chapterIndex, 
        i
      )
      this._checkChildExist(item, 'chapters') && this._getPartList(this._checkChildExist(item, 'chapters'))
    },

    /** 
     * 部分点击
     * @param {Object} item: 点击到的数据对象
     * @param {Number} i: 当前点击的下标  
     */
    _partItemClick: function(item, i) {
      this.filterSelect.chapter3Id = item.chapterId
      this._clearfilterData(
        this.filterData.typesData,
        this.filterData.levelsData,
        this.filterData.subjectsData,
        this.filterData.editionsData,
        this.filterData.volumesData,
        this.filterData.chaptersData,
        this.filterData.sectionsData,
        this.filterData.partsData
      )
      this._getActiveClickedIndex(
        this.indexObj.typeIndex, 
        this.indexObj.levelIndex, 
        this.indexObj.subjectIndex, 
        this.indexObj.editionIndex, 
        this.indexObj.volumeIndex, 
        this.indexObj.chapterIndex, 
        this.indexObj.sectionIndex, 
        i
      )
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'
  @import '~style/mixin'

  .filter
    padding 10px 25px 8px 0
    height auto
    .filter-content
      margin 13px 0
      line-height 40px
      clear-float()
      /* 文本 */
      .filter-content-txt
        float left
        width 5%
        line-height 40px
        color $color-theme
      /* list容器 */    
      .filter-content-list
        float right
        width 95%
        line-height 38px
        .list-item
          display inline-block
          border-radius 18px
          border 1px solid $color-border
          .item
            display inline-block
            height 28px
            line-height 28px
            padding 0 20px
            margin 4px 8px 4px 4px
            border-radius 14px
            &:hover
              background-color $color-text-sub
              color $color-text-w 
          .itemActive
            background-color $color-text-sub
            color $color-text-w    
</style>
