import PropTypes from 'prop-types'

export const ModalWindow = ({
	isModalOpen,
	setIsModalOpen,
	requestChangeTask
}) => {
	return (
		<div className="modal">
			<div className="modal-content">
				<h2>Change Task</h2>
				<textarea
					className="text_area_task"
					value={isModalOpen.taskValue}
					onChange={(event) =>
						setIsModalOpen({
							...isModalOpen,
							taskValue: event.target.value
						})
					}
				/>
				<button
					className="change_button_area"
					onClick={() => requestChangeTask(isModalOpen)}
				>
					Save changes
				</button>
				<button
					className="close-button"
					onClick={() => setIsModalOpen({ ...isModalOpen, isOpen: false })}
				>
					Close window
				</button>
			</div>
		</div>
	)
}

ModalWindow.propTypes = {
	isModalOpen: PropTypes.object,
	setIsModalOpen: PropTypes.func,
	requestChangeTask: PropTypes.func
}
