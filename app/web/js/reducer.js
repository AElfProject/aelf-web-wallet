function counter(state = { count: 0 }, action) {
  // let count = parseInt(localStorage.getItem('count'), 10) || state.count;
  // state.count = count;
  let count = state.count;
  console.log('count： ', count);
  switch (action.type) {
    case 'increase':
      // count = localStorage.getItem('count');
      count += 1;
      localStorage.setItem('count', count);
      return {count: count};
    default:
      return state
  }
}

export default counter;