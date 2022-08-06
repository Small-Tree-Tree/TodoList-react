/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-05 18:20:17
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-08-06 09:12:11
 * @FilePath: \React\react-todolist\src\Components\Footer\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import "./index.css"
export default class Footer extends Component {
  render() {
    let {total,achieve} = this.state

    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" onChange={this.handleAllChecked} checked={total === achieve && total !== 0}/>
        </label>
        <span>
          <span>已完成 {achieve}</span> / 全部 {total}
        </span>
        <button className="btn btn-danger" onClick={this.clearAchieveTask}>清除已完成任务</button>
      </div>
    )
  }

  state = {
    total:0,
    achieve:0
  }

  componentDidMount(){
    // 接收传入的todolist
    PubSub.subscribe('todoData',(_,todoList)=>{ 
      // 整理数据
      let achieve = todoList.reduce((pre,current)=>{
        return pre + (current.flag ? 1 : 0)
      },0)
      
      this.setState({total:todoList.length,achieve})
    })
  }

  // 全选和全不选
  handleAllChecked = (e) =>{
    PubSub.publish('allChecked',e.target.checked)
  }

  // 清空已完成的数据
  clearAchieveTask = () =>{
    if(window.confirm('确定要删除已完成的任务吗？')){
      PubSub.publish('clearAchieveTask')
    }
  }
}
