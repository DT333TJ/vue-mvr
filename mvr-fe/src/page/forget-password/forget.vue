/** 
 * @Desc: 忘记密码
 */
<template>
  <div class="forget">
    <div class="forget-form">
      <el-steps :active="active" align-center>
        <el-step title="验证身份"></el-step>
        <el-step title="设置新密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <transition>
        <router-view></router-view>
      </transition>
    </div>
    <!-- dialog, 在子组件中调用 -->
    <el-dialog
      title="提示"
      width= "25%"
      :visible.sync="dialogVisible">
      <span>请联系学校管理员获取账号信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'forget',
    data: function() {
      return {
        active: 1,
        dialogVisible: false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .forget
    position relative
    width 100%
    height 100%
    background-image url(../../image/login_bg.jpg)
    background-repeat no-repeat
    background-size cover
    .forget-form
      position absolute
      top 50%
      right 160px
      transform translateY(-60%)
      width 380px
      height 400px
      border-radius 6px
      padding-top 50px
      background-color rgb(255, 255, 255)
</style>
