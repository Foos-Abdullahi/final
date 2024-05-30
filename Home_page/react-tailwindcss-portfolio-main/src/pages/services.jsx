import ProjectsGrid from '../components/projects/ProjectsGrid';
import { ProjectsProvider } from '../context/ProjectsContext';

const Services = () => {
	return (
		<ProjectsProvider>
			<div className="container mx-auto">
				<ProjectsGrid />
			</div>
		</ProjectsProvider>
	);
};

export default Services;
