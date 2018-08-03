/*
 * huangzongzhe
 * 2018.08.03
 * 从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux。
 * 	某个组件的状态，需要共享
 * 	某个状态需要在任何地方都可以拿到
 * 	一个组件需要改变全局状态
 * 	一个组件需要改变另一个组件的状态
 * BottomTabBar 使用了
 */
export function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch({
    	type: 'increase'
    }),
    onBottomTabSelect: (value) => dispatch({
      type: 'bottomTabBarSelect',
      value: value
    })
  }
}