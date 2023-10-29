import { Button } from '../Button/Button.jsx'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

export const TodoItem = ({ todo, onClickChange, onClickDelete }) => {
	const navigate = useNavigate()

	const handleTaskClick = (todoId, text) => {
		navigate(`/task/${todoId}`, { state: { title: text } })
	}

	return (
		<div className="todo_container">
			<p
				className="todo_text"
				onClick={() => handleTaskClick(todo.id, todo.title)}
			>
				{todo.title}
			</p>
			{/*<div className="button_container">*/}
			{/*	<Button*/}
			{/*		className="change_button"*/}
			{/*		onClick={() => onClickChange(todo.id, todo.title)}*/}
			{/*	>*/}
			{/*		Change task*/}
			{/*	</Button>*/}
			{/*	<Button*/}
			{/*		className="delete_button"*/}
			{/*		onClick={() => onClickDelete(todo.id)}*/}
			{/*		inputValue={todo.id}*/}
			{/*	>*/}
			{/*		Delete task*/}
			{/*	</Button>*/}
			{/*</div>*/}
		</div>
	)
}

TodoItem.propTypes = {
	todo: PropTypes.object,
	onClickChange: PropTypes.func,
	onClickDelete: PropTypes.func
}
