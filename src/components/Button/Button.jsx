import PropTypes from 'prop-types'

export const Button = ({ children, className, onClick, inputValue, todos }) => {
	return (
		<button
			disabled={className === 'sort' && todos.length < 2}
			className={className}
			onClick={() => onClick(inputValue)}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
	todos: PropTypes.array,
	inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
