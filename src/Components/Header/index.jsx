/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-05 18:21:26
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-08-05 20:21:11
 * @FilePath: \React\react-todolist\src\Components\Header\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { nanoid } from 'nanoid'
import "./index.css"
export default class Header extends Component {
  render() {
    return (
      <div className="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" onKeyUp={this.handleSearch}/>
      </div>
    )
  }

  handleSearch = (e) =>{
      if(e.key === 'Enter'){
        if(e.target.value.trim() !== '')
        {
          // 整理数据
          let obj = {id:nanoid(),name:e.target.value,flag:false}
          PubSub.publish('taskName',obj)
        } else{
          alert('任务名不能为空，请重新输入！')
        }
        e.target.value = ''
      }
  }
}

