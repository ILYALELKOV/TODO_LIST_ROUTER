import PropTypes from 'prop-types'

export const Button = ({ children, className, onClick, inputValue }) => {
	return (
		<button className={className} onClick={() => onClick(inputValue)}>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	onClick: PropTypes.func,
	inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
