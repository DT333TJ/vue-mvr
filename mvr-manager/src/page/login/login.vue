/** 
 * @desc 管理员登录
 */
<template>
  <div class="login">
    <div class="login-form">
      <!-- title -->
      <div class="form-title">微视频后台管理</div>
      <!-- 表单区域 -->
      <div class="manager-login">
        <!-- 用户名 -->
        <div class="form-item">
          <input 
            type="text"
            ref="UserName"  
            placeholder="用户名" 
            class="input-item"
            maxlength="30"
            @keyup.enter="_LoginButtonClick"
            v-model.trim="loginForm.userName" />
        </div>
        <!-- 密码 -->
        <div class="form-item" style="margin-bottom: 0">
          <input 
            type="password"
            ref="Password" 
            placeholder="密码" 
            class="input-item"
            maxlength="32"
            @keyup.enter="_LoginButtonClick"
            v-model.trim="loginForm.password" />
        </div>
        <!-- 文字提示 -->
        <div class="form-message">{{loginText}}</div>
        <!-- 记住密码 -->
        <div class="form-item" style="height: 30px;line-height: 30px; margin-bottom: 20px">
          <check-box
            style="float:left"
            :text="checkbox.text" 
            :id="checkbox.id" 
            @change="_getCheckedValue"
          ></check-box>
        </div>
        <!-- 登录按钮 -->
        <div class="form-item">
          <button class="clickable button-item" @click="_LoginButtonClick">后台登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CheckBox from 'base/checkbox/checkbox'
import { sessionStorageUtil, localStorageUtil, validateAccouts, validatePassword, getHeadersValue } from 'lib/util'
import { Base64 } from 'js-base64'
import cookie from 'js-cookie'
import { requestGetToken } from 'api/token'
import { requestGetRole } from 'api/role'

export default {
  name: 'manager',
  components: {
    CheckBox
  },
  data: function() {
    return {
      loginForm: {
        userName: 'kskjtest',
        password: '123456'
      },
      checkbox: {
        text: '记住我',
        id: 'Forget'
      },
      loginText: '',
      rememberFlag: true
    }
  },
  // 当前路由离开的时候要清除定时器
  beforeRouteLeave: function(to, from, next) {
    clearTimeout(this.timeOut)
    next()
  },
  created: function() {
    this._getDataFromStorage()
  },
  methods: {
    /** 
     * 5秒后自动清除登录的提示文字  
     */
    _clearLoginText: function() {
      this.timeOut =setTimeout( ()=> {
        this.loginText = ''
      }, 5000)
    },

    /** 
     * 从存储中获取信息 
     */
    _getDataFromStorage: function() {
      // 数据存在就赋值
      this.loginForm.userName = localStorageUtil.getItem('m-userName') ? localStorageUtil.getItem('m-userName') : this.loginForm.userName 
      this.loginForm.password = localStorageUtil.getItem('m-password') ? localStorageUtil.getItem('m-password') : this.loginForm.password
    },

    /** 
     * 存储账号信息 
     */
    _storageUserInfo: function() {
      localStorageUtil.setItem('m-userName', this.loginForm.userName)
      localStorageUtil.setItem('m-password', this.loginForm.password)
    },

    /** 
     * 清除账号信息 
     */
    _clearStorageData: function() {
      localStorageUtil.getItem('m-userName') && localStorageUtil.removeItem('m-userName')
      localStorageUtil.getItem('m-password') && localStorageUtil.removeItem('m-password')
    },

    /** 
     * 设置记住密码 
     */
    _getCheckedValue: function(value) {
      this.rememberFlag = value
    },

    /** 
     * 登录点击 
     */
    _LoginButtonClick: function() {
      // 变量设置
      let validateUserName = validateAccouts(this.loginForm.userName)
      let validatepassword = validatePassword(this.loginForm.password)

      // 清空定时器
      clearTimeout(this.timeOut)

      // 帐号格式校验
      if ( validateUserName ) {
        this.loginText = ''
        this.$refs.Password.focus()
      } else {
        this.loginText = '请填写正确格式的账号'
        this._clearLoginText()
        this.$refs.UserName.focus() 
      }

      // 密码格式不通过
      if ( validateUserName && !validatepassword ) {
        this.loginText = '请填写6~32位的密码'
        this._clearLoginText()
        this.$refs.Password.focus()
      }

      // 帐号、密码都通过
      if ( validateUserName && validatepassword ) {
        // 参数变量,固定格式
        const params = {
          'username': this.loginForm.userName,
          'password': Base64.encode(this.loginForm.password)
        }

        // 调用请求的方法
        this._getToken(params)
          .then( () => {
            this._handleGetRole()
          })
      }    
    },

    /** 
     * 请求获取token
     * @param {Object} data: 请求的参数
     */
    _getToken: function(params) {
      return requestGetToken(params)
        .then( response => {
          if (response.status == 200) {
              // 设置cookie的token值
              cookie.set('mvr_Manager_Token', response.data.access_token, { expires: response.data.expires_in - 60})
              // 记住密码
              this.rememberFlag ? this._storageUserInfo() : this._clearStorageData()
            }
          return Promise.resolve(response.data.refresh_token)
        })
        .catch( error => {
          this.loginText = error.data.error_description
          this._clearLoginText()
          return Promise.reject(error)
        }) 
    },

    /** 
     * 请求获取帐号角色,根据帐号的类型进入不同的路由
    */
    _handleGetRole: function() {
      return requestGetRole()
        .then( response => {
          if (response.code == 0) {
            let role = response.data.role
            if (role == 'root') {
              this.$router.replace('/organization')
            } else {
              this.$router.replace('/administrator')
            }
          }
        })
        .catch( error => {
          console.log('error:', error)
        } )
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~style/variable'
  @import '~style/mixin'

  .login
    position relative
    width 100%
    height 100%
    background-image url(../../image/login_bg.jpg)
    background-repeat no-repeat
    background-size cover
    .login-form
      position absolute
      top 50%
      right 160px
      transform translateY(-60%)
      width 300px
      border-radius 6px 
      background-color white   
      /* 表单名称 */
      .form-title
        height 60px
        line-height 60px
        text-align center
        font-size $font-size-large-x
        letter-spacing 2px
        color $color-text-g
        font-weight bolder

      /* 表单区域 */
      .manager-login
        padding 20px
        /* form-item */
        .form-item
          height 40px
          line-height 40px
          margin-bottom 10px
          text-align center
          clear-float()
          .input-item
            width 100%
            height 35px
            line-height 35px
            padding-left 20px
            text-align left
            border 1px solid $color-border-sub
            border-radius 4px
            &:hover
              border-color $color-text-sub
          .button-item
            width 80%
            background-color $color-text-sub
            border-radius 4px
            color #ffffff
          .forget-item
            float right
            font-size 12px
            
        /* form提示信息 */
        .form-message
          height 25px
          line-height 25px
          font-size $font-size-small
          color red      
</style>
