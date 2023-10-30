import { Link, useLocation, useParams } from 'react-router-dom'
import { Button } from '../components/Button/Button.jsx'
import {
	useRequestChangeTask,
	useRequestClickChangeTask,
	useRequestDeleteTask
} from '../hooks/index.js'
import { ModalWindow } from '../components/ModalWindow/ModalWindow.jsx'
import { Page_404 } from './page_404.jsx'

export const TaskPage = () => {
	let { id } = useParams()
	const location = useLocation()
	const { handleClickChangeTask, isModalOpen, setIsModalOpen } =
		useRequestClickChangeTask()
	const { requestChangeTask } = useRequestChangeTask(isModalOpen)
	const { requestDeleteTask } = useRequestDeleteTask()

	return !location.state || !location.state.title ? (
		<Page_404 />
	) : (
		<div className="container_task">
			{isModalOpen.isOpen && (
				<ModalWindow
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					requestChangeTask={requestChangeTask}
				/>
			)}
			<Link to="/" className="back_button">
				Back
			</Link>
			<div className="taskid_container">
				<p className="task_text">{location.state.title}</p>
			</div>
			<div className="button_container">
				<Button
					className="change_button"
					onClick={() => handleClickChangeTask(id, location.state.title)}
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
