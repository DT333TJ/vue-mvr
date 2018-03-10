/** 
 * @Desc: 视频资源列表组件
 */
<template>
  <div class="resource-list">
    <v-filter></v-filter>
    <list-wrapper></list-wrapper>
  </div>
</template>

<script type="text/ecmascript-6">
import VFilter from './component/filter/filter'
import ListWrapper from './component/list-wrapper/list-wrapper'

export default {
  name: 'resource-list',
  components:　{
    VFilter,
    ListWrapper
  }
}
</script>
