import React from "react"
import ProjectDetail from "./ProjectDetail"
import { useParams } from "react-router"

const Coiny = props => {
	let params = useParams()
	// console.log(props, params)
	return (
		<div>
			<ProjectDetail params={params} {...props} />
		</div>
	)
}

export default Coiny
