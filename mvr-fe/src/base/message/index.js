import Vue from 'vue'
import Message from './message.vue'

let MessageBox  = Vue.extend(Message)
let instance
var message = function(type, content, duration) {
  // 生成组件
  instance = new MessageBox({
    data: {
      type: type,
      content: content,
      duration: duration || 2500
    }
  })
  // 挂载组件
  instance.$mount()
  document.body.appendChild(instance.$el)
}

Vue.prototype.$vmessage = message
