import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

export const TodoItem = ({ todo }) => {
	const navigate = useNavigate()

	// const handleTaskClick = (todoId, text) => {
	// 	navigate(`/task/${todoId}`, { state: { title: text } })
	// }

	const handleTaskClick = (todoId, text) => {
		navigate(`/task/${todoId}`, { state: { title: text, state: todo } })
	}

	return (
		<div className="todo_container">
			<p
				className="todo_text"
				onClick={() => handleTaskClick(todo.id, todo.title)}
			>
				{todo.title}
			</p>
		</div>
	)
}

TodoItem.propTypes = {
	todo: PropTypes.object,
	onClickChange: PropTypes.func,
	onClickDelete: PropTypes.func
}
