import ProjectsGrid from '../components/projects/ProjectsGrid';
import ServicesGrid from '../components/services/servicesGrid';
import { ProjectsProvider } from '../context/ProjectsContext';

const Services = () => {
	return (
		<ProjectsProvider>
			<div className="container mx-auto">
				<ServicesGrid />
			</div>
		</ProjectsProvider>
	);
};

export default Services;
