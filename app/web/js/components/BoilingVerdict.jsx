// 函数式也不能丢了import React from 'react'
import React from 'react'

function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p > 水会烧开 < /p>;
	}
	return <p > 水不会烧开 < /p>;
}

export default BoilingVerdict