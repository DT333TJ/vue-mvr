/** 
 * @Desc: 设置新密码
 */
<template>
  <div class="newpassword">
    <!-- 文字提示 -->
    <div class="form-message">{{passwordText}}</div>
    <!-- 密码 -->
    <div class="form-item">
      <input 
        type="password"
        ref="Pwd" 
        placeholder="新密码" 
        class="input-item"
        maxlength="32"
        v-model.trim="passwordForm.password"/>
    </div>
    <!-- 确认密码 -->
    <div class="form-item">
      <input 
        type="password"
        ref="confirmPwd" 
        placeholder="确认新密码" 
        class="input-item"
        maxlength="32"
        v-model.trim="passwordForm.confirmpassword"/>
    </div>
    <!-- 下一步 -->
    <div class="form-item" style="margin-top:10px">
      <button class="clickable button-item" @click="_passwordButtonClick">下一步</button>
    </div>
    <!-- 返回登录 -->
    <div class="form-item">
      <router-link to="/login" class="login-item">返回登录</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { validatePassword, confirmPassword, localStorageUtil } from 'lib/util'
  import { requestPatchPassword } from 'api/forget-password'

  export default {
    name: 'newpassword',
    data: function() {
      return {
        passwordForm: {
          password: '',
          confirmpassword: ''
        },
        passwordText: '',
        timeOut: null,
        queryObj: {
          userName: '',
          loginName: '',
          phone: ''
        }
      }
    },
    created: function() {
      this._getQueryInfo()
    },
    // 当前路由离开的时候要清除定时器
    beforeRouteLeave: function(to, from, next) {
      clearTimeout(this.timeOut)
      next()
    },
    methods: {
      /** 
       * 从路由中获取之前传递的类别信息，用来在保存密码帐号的时候区分帐号类别
       */
      _getQueryInfo: function() {
        let query = this.$route.query
        if (query.userName) {
          this.queryObj = {
            userName: query.userName,
            loginName: query.loginName,
            phone: query.phone,
            id: query.id
          }
        }
      },

      /** 
       * 5秒后自动清除登录的提示文字  
       */
      _clearText: function() {
        this.timeOut =setTimeout( ()=> {
          this.passwordText = ''
        }, 5000)
      },

      /** 
       * 下一步按钮点击，注意要根据传递的type值来设置storage存储键值类型 
       */
      _passwordButtonClick: function() {
        // 清除定时器
        clearTimeout(this.timeOut)
        // 参数变量
        let validate = validatePassword(this.passwordForm.password)
        let confirmValue = confirmPassword(this.passwordForm.password, this.passwordForm.confirmpassword)
        // 密码格式校验
        if (validate) {
          this.passwordText = ''
          this.$refs.confirmPwd.focus()
        } else {
          this.passwordText = '请填写6~32位密码密码'
          this._clearText()
          this.$refs.Pwd.focus()
        }
        // 密码格式校验通过、重复密码校验不通过
        if (validate && !confirmValue) {
          this.passwordText = '两次密码输入不一致'
          this.$refs.confirmPwd.focus()
          this._clearText()
        }
        // 验证都通过
        if (validate && confirmValue) {
          let param = {
            id: this.queryObj.id,
            password: this.passwordForm.password
          }
          // 调用修改密码的方法
          this._handleRequestPatchPassword(param)
        }
      },

      /** 
       * 调用修改密码的方法 
       * @param {object} param: 修改密码的参数
       */
      _handleRequestPatchPassword: function(param) {
        requestPatchPassword(param).then( response => {
          if (response.code === 0) {
            localStorageUtil.setItem('t-userName', this.queryObj.loginName)
            localStorageUtil.setItem('t-password', this.passwordForm.password)
            this.$router.replace({name: 'completepassword'})
            this.$parent.$data.active = 3            
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'
  @import '~style/mixin'

  .newpassword
    padding 30px 50px 0
    /* form-item*/
    .form-item
      width 100%
      height 40px
      text-align center
      margin-bottom 20px
      clear-float()
      .input-item
        width 70%
        height 40px
        line-height 40px
        padding-left 10px
        text-align left
        border-radius 4px
        border 1px solid #ddd
        &:hover
          border-color $color-text-sub
      .button-item
        width 70%
        height 40px
        background-color $color-text-sub
        color $color-text-w
        border 1px solid $color-border-sub
        border-radius 4px
      .login-item
        float right
        margin-right 15%
        font-size $font-size-small
        color $color-text-sub
         
    /* 文字信息*/
    .form-message
      height 25px
      line-height 25px
      padding 0 15%
      font-size $font-size-small    
      color red
</style>
