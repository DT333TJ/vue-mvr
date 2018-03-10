/** 
 * @Desc: 身份验证
 */
<template>
  <div class="authentication">
    <!-- 文字提示 -->
    <div class="form-message">{{authText}}</div>
    <!-- 姓名 -->
    <div class="form-item">
      <input 
        type="text"
        ref="UserName" 
        placeholder="姓名" 
        class="input-item"
        maxlength="32"
        v-model.trim="authForm.userName"/>
    </div>
    <!-- 登录账号 -->
    <div class="form-item">
      <input 
        type="text"
        ref="Accounts" 
        placeholder="登录账号" 
        class="input-item"
        maxlength="30"
        v-model.trim="authForm.loginName"/>
    </div>
    <!-- 手机号 -->
    <div class="form-item">
      <input 
        type="text"
        ref="Phone" 
        placeholder="手机号" 
        class="input-item"
        maxlength="11"
        v-model.trim="authForm.phone"/>
    </div>
    <!-- 下一步按钮 -->
    <div class="form-item" style="margin-top:10px">
      <button class="clickable button-item" @click="_authButtonClick">下一步</button>
    </div>
    <!-- 返回登录 -->
    <div class="form-item">
      <a class="remember-item" @click="$parent.$data.dialogVisible = true">记不清了?</a>
      <router-link to="/login" class="login-item">返回登录</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { validataPhone, validateAccouts, validateName } from 'lib/util'
  import { requestGetAuth } from 'api/forget-password'

  export default {
    name: 'authentication',
    data: function() {
      return {
        authForm: {
          userName: '',
          loginName: '',
          phone: ''
        },
        authText: '',
        timeOut: null
      }
    },
    // 当前路由离开的时候要清除定时器
    beforeRouteLeave: function(to, from, next) {
      clearTimeout(this.timeOut)
      next()
    },
    methods: {
      /** 
       * 5秒后自动清除登录的提示文字  
       */
      _clearText: function() {
        this.timeOut =setTimeout( ()=> {
          this.authText = ''
        }, 5000)
      },

      /** 
       * 下一步点击 
       */
      _authButtonClick: function() {
        // 每次点击先清空定时器
        clearTimeout(this.timeOut)

        // 校验变量
        let validateUserName = validateName(this.authForm.userName)
        let validateAccout = validateAccouts(this.authForm.loginName)
        let validateTel = validataPhone(this.authForm.phone)

        // 姓名校验
        if (validateUserName) {
          this.authText = ''
          this.$refs.Accounts.focus()
        } else {
          this.authText = '请填写2~7位中文姓名'
          this._clearText()
          this.$refs.UserName.focus()
        }

        // 姓名校验通过、帐号格式校验不通过
        if (validateUserName && !validateAccout) {
          this.authText = '请填写帐号'
          this._clearText()
          this.$refs.Accounts.focus()
        }

        // 姓名、帐号格式校验通过
        if (validateUserName && validateAccout) {
          this.authText = ''
          this.$refs.Phone.focus()
        }

        // 姓名、帐号通过，手机格式校验不通过
        if (validateUserName && validateAccout && !validateTel) {
          this.authText = '请填写手机号'
          this._clearText()
          this.$refs.Phone.focus()
        }
        
        // 验证都通过
        if (validateTel && validateUserName && validateAccout) {
          // 调用接口事件
          this._handleRequestGetAuth(this.authForm)
        }
      },

      /** 
       * 调用身份校验的方法 
       * @param {object} param: 校验的参数
       */
      _handleRequestGetAuth: function(param) {
        requestGetAuth(param).then( response => {
            if (response.code === 0) {
              let queryObj = {
                userName: this.authForm.userName,
                loginName: this.authForm.loginName,
                phone: this.authForm.phone,
                id: response.data.id
              }
              // 路由跳转带的参数
              this.$router.replace({name: 'newpassword', query: queryObj})
              this.$parent.$data.active = 2
            } else {
              this.authText = '填写的信息有误'
              this._clearText()
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

  .authentication
    padding 10px 50px 0 
    /* form-item*/
    .form-item
      width 100%
      height 40px
      text-align center
      margin-bottom 10px
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
      .remember-item
        float left
        margin-left 15%
        font-size $font-size-small
        color $color-text-g 
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
