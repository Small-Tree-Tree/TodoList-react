/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-04 17:14:16
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-08-05 19:19:54
 * @FilePath: \React\react-app\src\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from "react";
import Header from "./Components/Header"
import List from "./Components/List"
import Footer from "./Components/Footer"
import "./App.css"
export default class App extends Component {
  render() {
    return (
        <div className="todo-container">
          <div className="todo-wrap">
            <Header/>
            <List/>
            <Footer/>
          </div>
        </div>
    )
  }
}



