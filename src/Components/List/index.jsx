/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-05 18:21:48
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-08-06 09:20:52
 * @FilePath: \React\react-todolist\src\Components\List\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import "./index.css"
export default class List extends Component {
  render() {
    const { todoList } = this.state
    return (
      <ul className="todo-main">
        {
          todoList.map(item => {
            return (
              <li key={item.id}>
                <label>
                  <input type="checkbox" checked={item.flag} onChange={(e) => { this.handleCheckBox(e, item.id) }} />
                  <span>{item.name}</span>
                </label>
                <button className="btn btn-danger" onClick={this.deleteTodo(item.id, item.name)}>删除</button>
              </li>
            )
          })
        }
      </ul>
    )
  }

  // 初始化数据
  state = {
    todoList: [
      { id: 1, name: '吃饭', flag: false },
      { id: 2, name: '睡觉', flag: true },
      { id: 3, name: '打代码', flag: true }
    ]
  }

  // 在页面挂载完毕后
  componentDidMount() {
    // 获取header传入的数据
    PubSub.subscribe('taskName', (_, todoObj) => {
      /*
        在这里发现react组件会渲染两次所以这里 
        就不能使用数组追加的方式
       */
      const { todoList } = this.state
      this.setState({ todoList: [todoObj, ...todoList] },()=>{
        PubSub.publish('todoData',this.state.todoList)
      }) 
    })
    
    // 初始化总数和已选的值
    PubSub.publish('todoData',this.state.todoList)

    // 处理全选和全不选事件
    PubSub.subscribe('allChecked',(_,flag)=>{
      let newArr = this.state.todoList.map((item)=>{
        item.flag = flag
        return item
      })
      this.setState({todoList:newArr},()=>{
        PubSub.publish('todoData',this.state.todoList)
      })
    })

    // 清空已完成的任务
    PubSub.subscribe('clearAchieveTask',()=>{
      let newArr = this.state.todoList.filter(item=>{
        return !item.flag
      })
      this.setState({todoList:newArr},()=>{
        PubSub.publish('todoData',this.state.todoList)
      })
    })
  }

  //  checkbox事件
  handleCheckBox = (e, id) => {
    const { todoList } = this.state
    // 修改checkbox状态
    let newArr = todoList.map((item) => {
      if (item.id === id) {
        item.flag = e.target.checked
      }
      return item
    })
    this.setState({ todoList: newArr },()=>{
      PubSub.publish('todoData',this.state.todoList)
    })
  }

  //  删除任务
  deleteTodo = (id, name) => {
    return () => {
      const { todoList } = this.state
      if (window.confirm(`确定删除 ${name} 吗？`)) {
        let newArr = todoList.filter((item) => {
          return item.id !== id
        })
        this.setState({ todoList: newArr },()=>{
          PubSub.publish('todoData',this.state.todoList)
        })
      }
    }
  }

 
}
