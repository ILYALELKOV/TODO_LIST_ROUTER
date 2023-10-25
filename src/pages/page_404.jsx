import { Link } from 'react-router-dom'

export const Page_404 = () => {
	return (
		<div>
			<img src="../../public/error_404.png" alt="" />
			<h1 className="text_404">Sorry, this page does not exist</h1>
			<div className="home_button_container">
				<Link to="/" className="home_button">
					Go to home page
				</Link>
			</div>
		</div>
	)
}
