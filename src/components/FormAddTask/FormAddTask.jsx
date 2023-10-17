import { Button } from '../Button/Button.jsx'
import PropTypes from 'prop-types'

export const FormAddTask = ({ inputValue, setInputValue, onClick }) => {
	return (
		<form className="add_container">
			<input
				value={inputValue}
				type="text"
				className="add_task"
				placeholder="Please enter a task..."
				onChange={(event) => setInputValue(event.target.value)}
			/>
			<Button className="add_button" onClick={onClick} inputValue={inputValue}>
				Add task
			</Button>
		</form>
	)
}

FormAddTask.propTypes = {
	setInputValue: PropTypes.func,
	onClick: PropTypes.func,
	inputValue: PropTypes.string
}
