import { Button } from '../Button/Button.jsx'
import PropTypes from 'prop-types'

export const TodoItem = ({ todo, onClickChange, onClickDelete }) => {
	return (
		<div className="todo_container">
			<p>{todo.title}</p>
			<div className="button_container">
				<Button
					className="change_button"
					onClick={() => onClickChange(todo.id, todo.title)}
				>
					Change task
				</Button>
				<Button
					className="delete_button"
					onClick={() => onClickDelete(todo.id)}
					inputValue={todo.id}
				>
					Delete task
				</Button>
			</div>
		</div>
	)
}

TodoItem.propTypes = {
	todo: PropTypes.object,
	onClickChange: PropTypes.func,
	onClickDelete: PropTypes.func
}
