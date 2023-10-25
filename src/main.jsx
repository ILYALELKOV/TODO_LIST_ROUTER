import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import { BrowserRouter, Navigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { TaskPage } from './pages/taskPage.jsx'
import { Page_404 } from './pages/page_404.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/task" element={<TaskPage />}>
					<Route path="/task/:id" element={<TaskPage />} />
				</Route>
				<Route path="/404" element={<Page_404 />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)
