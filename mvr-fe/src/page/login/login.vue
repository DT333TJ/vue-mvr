/** 
 * @desc 教师登录
 */
<template>
  <div class="login">
    <div class="login-form">
      <!-- title -->
      <div class="form-title">微视频教育资源库</div>
      <!-- 表单区域 -->
      <div class="teacher-login">
        <!-- 用户名 -->
        <div class="form-item">
          <input 
            type="text"
            ref="UserName" 
            placeholder="用户名" 
            class="input-item"
            maxlength="30"
            v-model.trim="loginForm.userName"/>
        </div>
        <!-- 密码 -->
        <div class="form-item" style="margin-bottom: 0">
          <input 
            type="password"
            ref="Password" 
            placeholder="密码" 
            class="input-item"
            maxlength="32"
            v-model.trim="loginForm.password"/>
        </div>
        <!-- 文字提示-->
        <div class="form-message">{{ loginText }}</div>
        <!-- 记住密码 -->
        <div class="form-item" style="height: 30px;line-height: 30px; margin-bottom: 20px">
          <check-box
            style="float:left"
            :text="checkbox.text" 
            :id="checkbox.id" 
            @change="_getCheckedValue"
          ></check-box>
          <router-link :to="{name: 'forget-password'}" class="forget-item">忘记密码?</router-link>
        </div>
        <!-- 登录按钮 -->
        <div class="form-item">
          <button class="clickable button-item" @click="_loginClick">教师登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CheckBox from 'base/checkbox/checkbox'
  import { sessionStorageUtil, localStorageUtil, validateAccouts, validatePassword, getHeadersValue } from 'lib/util'
  import { ChannelId } from 'config/constant'
  import { Base64 } from 'js-base64'
  import cookie from 'js-cookie'
  import { requestGetToken } from 'api/token'

  export default {
    name: 'teacher',
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
        rememberFlag: true,
        timeOut: null
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
        // 有存储就赋值存储
        this.loginForm.userName = localStorageUtil.getItem('t-userName') ? localStorageUtil.getItem('t-userName') : this.loginForm.userName 
        this.loginForm.password = localStorageUtil.getItem('t-password') ? localStorageUtil.getItem('t-password') : this.loginForm.password
      },

      /** 
       * 登录点击 
       */
      _loginClick: function() {
        // 变量设置
        let validateUserName = validateAccouts(this.loginForm.userName)
        let validatepassword = validatePassword(this.loginForm.password)

        // 清空定时器
        clearTimeout(this.timeOut)
        
        //用户名校验
        if (validateUserName) {
          this.loginText = ''
          this.$refs.Password.focus()
        } else {
          this.loginText = '请填写正确格式的账号'
          this._clearLoginText()
          this.$refs.UserName.focus()        
        }
        
        // 用户名校验通过，密码校验不通过
        if (validateUserName && !validatepassword) {
          this.loginText = '请填写正确格式的密码'
          this._clearLoginText()
        }

        // 前端格式校验都正确
        if (validateUserName && validatepassword) {
          this.loginText = ''
          // 参数变量
          const params = {
            'username': ChannelId + '&' +this.loginForm.userName + '&' +  getHeadersValue('oauth/token').sign ,
            'password': Base64.encode(this.loginForm.password)
          }

          // 请求获取token
          this._getToken(params)
            .then( () => {
              this.$store.dispatch('getUserInfo', this.loginForm.userName)
                .then( response => {
                  if (response.code == 0) {
                    // vuex存储状态
                    this.$store.commit('SET_USER', response.data)
                    this.rememberFlag ? this._storageUserInfo() : this._clearStorageData()
                    this.$router.replace('/resource')
                  }
                })
            })
        }
      },


      /** 
       * 发出登入请求
       * @param {Object} data: 请求的参数
       */
      _getToken: function(data) {
        return requestGetToken(data)
          .then( response => {
            if (response.status == 200) {
              this.$store.commit('SET_PREFIX', response.data.prefix)
              cookie.set('mvr_Token', response.data.access_token, { expires: response.data.expires_in - 60})
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
       * 存储账号信息 
       */
      _storageUserInfo: function() {
        localStorageUtil.setItem('t-userName', this.loginForm.userName)
        localStorageUtil.setItem('t-password', this.loginForm.password)
      },

      /** 
       * 清除账号信息 
       */
      _clearStorageData: function() {
        localStorageUtil.getItem('t-userName') && localStorageUtil.removeItem('t-userName')
        localStorageUtil.getItem('t-password') && localStorageUtil.removeItem('t-password')
      },

      /** 
       * 设置记住密码  
       */
      _getCheckedValue: function(value) {
        this.rememberFlag = value
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

      .teacher-login
        padding 20px
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
            color #ffffff
            background-color $color-text-sub
            border-radius 4px
          .forget-item
            float right
            font-size 12px
            color $color-text-sub
          
        /* form提示信息 */
        .form-message
          height 25px
          line-height 25px
          font-size $font-size-small
          color red          
</style>
