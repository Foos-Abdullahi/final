import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const ProjectSingle = ({ title,imageSource }) => {
	const [design, setDesign] = useState(null);

	useEffect(() => {
		fetchDesign();
	}, []);

	const fetchDesign = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/Design/");
			const data = await response.json();
			const image = data[0]['architecture'];
			setDesign(image);
			console.log(image);
		} catch (error) {
			console.error("Error fetching design:", error);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, delay: 1 }}
			transition={{
				ease: 'easeInOut',
				duration: 0.7,
				delay: 0.15,
			}}
		>
			<Link to="" aria-label="Single Project">
				<div className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark">
				{design && (
						<img height={400}
						width={400}
							src={imageSource}
							className="rounded-t-xl border-none"
							alt="Single Project"
						/>
					)}
					<div className="text-center px-4 py-6">
						<p className="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2">
							{title}
						</p>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default ProjectSingle;