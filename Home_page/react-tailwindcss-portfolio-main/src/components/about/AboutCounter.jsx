import { useCountUp } from 'react-countup';
import CounterItem from './CounterItem';

const AboutCounter = () => {
	useCountUp({ ref: 'experienceCounter', end: 12, duration: 2 });
	useCountUp({ ref: 'githubStarsCounter', end: 170, duration: 2 });
	useCountUp({ ref: 'feedbackCounter', end: 4, duration: 2 });
	useCountUp({ ref: 'projectsCounter', end: 55, duration: 2 });

	return (
		<div className="mt-10 sm:mt-20 bg-primary-light dark:bg-ternary-dark shadow-sm">
			<div className="font-general-medium container mx-auto py-20 block sm:flex sm:justify-between items-center">
				<CounterItem
					title="PROJECTS DONE"
					counter={<span id="experienceCounter" />}
					measurement=""
				/>

				<CounterItem
					title="MACHINERIES"
					counter={<span id="githubStarsCounter" />}
					measurement=""
				/>

				<CounterItem
					title="AWARDS WON"
					counter={<span id="feedbackCounter" />}
					measurement=""
				/>

				<CounterItem
					title="QUALIFIED STAFF"
					counter={<span id="projectsCounter" />}
					measurement=""
				/>
			</div>
		</div>
	);
};

export default AboutCounter;
