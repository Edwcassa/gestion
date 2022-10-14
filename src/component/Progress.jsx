import React from 'react'
import './progress.css'

export default function Progress ({done, time}) {
	const [style, setStyle] = React.useState({});
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`,
      transition: `${time}s ease 0.2s`
		}
		
		setStyle(newStyle);
	}, 100);
	
	return (
		<div className="progress ">
			<div className="progress-done" style={style}>
				{done}%
			</div>
		</div>
	)
}