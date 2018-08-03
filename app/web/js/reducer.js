/*
 * huangzongzhe
 * 2018.08.03
 */
function reducer(state = {
  count: 0
}, action) {

  let newState = Object.assign({}, state);

  switch (action.type) {
    case 'increase':
      let count = state.count;
      console.log('count： ', count);
      count += 1;
      localStorage.setItem('count', count);
      newState.count = count;
      break;

    case 'bottomTabBarSelect':
      console.log('bottomTabBarSelect: ', action.value);
      newState.selectedBottomTab = action.value;
      break;

    default:
      return newState;
  }
  return newState;
}

export default reducer;