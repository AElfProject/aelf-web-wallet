import React, { Component } from 'react'
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import style from './HomePage.scss'

class HomePage extends Component {
  constructor(props) {
    super();
    this.state = {
      open: true
    };
  }
  // state = {
  //   open: true,
  // }
  onOpenChange(args) {
    console.log(args);
    this.setState({ open: !this.state.open });
  }

  // onOpenChange = (...args) => {
  //   console.log(args);
  //   this.setState({ open: !this.state.open });
  // }
  render() {
    // fix in codepen
    const sidebar = (<List>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item key={index}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
      })}
    </List>);

    // <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>Basic</NavBar>
    return (<div>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={() => this.onOpenChange()}>Basic</NavBar>
      <Drawer
        className={style.myDrawer}
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.open}
        onOpenChange={() => this.onOpenChange()}
      >
        Click upper-left corner
      </Drawer>
    </div>);
  }
}

export default HomePage;