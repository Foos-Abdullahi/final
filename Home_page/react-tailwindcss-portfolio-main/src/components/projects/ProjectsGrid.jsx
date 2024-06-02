import React, { useState, useEffect } from "react";
import ProjectSingle from './ProjectSingle';

const ProjectsGrid = () => {
	const [projects, setProjects] = useState([]);
	const [designs, setDesigns] = useState([]);

	useEffect(() => {
		fetchProjects();
		fetchDesigns();
	}, []);

	const fetchProjects = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/Projects/");
			const data = await response.json();
			setProjects(data);
		} catch (error) {
			console.error("Error fetching projects:", error);
		}
	};

	const fetchDesigns = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/Design/");
			const data = await response.json();
			setDesigns(data);
		} catch (error) {
			console.error("Error fetching designs:", error);
		}
	};

	return (
		<section className="py-5 sm:py-10 mt-5 sm:mt-10">
			<div className="text-center">
				<p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
					City Construction Projects
				</p>
			</div>

			<div className="mt-10 sm:mt-16">
				<div className="flex justify-between border-b border-primary-light dark:border-secondary-dark pb-3 gap-3">
					<div className="flex justify-between gap-2">
						{/* Search functionality */}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10">
				{projects.map((project) => {
					const design = designs.find((d) => d.id === project.design);
					const imageSource = design ? `https://raw.githubusercontent.com/Foos-Abdullahi/final/main/Frontend/react-admin-dashboard-master/react-admin-dashboard-master/public/assets/design/${design.architecture}` : '../assets/design/placeholder.jpg';
					
					console.log("this is image source:",imageSource);
					console.log("this is design:",design);

					return (
						<ProjectSingle
							key={project.id}
							title={project.project_name}
							imageSource={imageSource}
						/>
					);
				})}
			</div>
		</section>
	);
};

export default ProjectsGrid;