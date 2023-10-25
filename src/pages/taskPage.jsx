import { Link, useLocation, useParams } from 'react-router-dom'
import { useRequestChangeTask, useRequestDeleteTask } from '../hooks/index.js'
import { Button } from '../components/Button/Button.jsx'

export const TaskPage = () => {
	const { id } = useParams()
	const location = useLocation()
	// console.log(location)
	const { requestDeleteTask } = useRequestDeleteTask()
	const { requestChangeTask } = useRequestChangeTask()
	return (
		<div className="container_task">
			<Link to="/" className="back_button">
				Back
			</Link>
			<h2>This is task</h2>
			<p className="task_text">{location.state.title}</p>
			<div className="button_container">
				<Button
					className="change_button"
					onClick={() => requestChangeTask(id, location.state.title)}
				>
					Change task
				</Button>
				<Button
					className="delete_button"
					onClick={() => requestDeleteTask(id)}
					inputValue={id}
				>
					Delete task
				</Button>
			</div>
		</div>
	)
}
