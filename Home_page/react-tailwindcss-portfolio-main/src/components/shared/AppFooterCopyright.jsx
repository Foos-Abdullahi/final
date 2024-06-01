import React from 'react';
import { Link } from 'react-router-dom';
import logoLight from '../../images/logo-light.svg';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
// import logoDark from '../../images/logo-dark.svg';
// import useThemeSwitcher from '../../hooks/useThemeSwitcher';

function AppFooterCopyright() {
	// const [activeTheme, setTheme] = useThemeSwitcher();
	return (
		<div className="font-general-regular flex justify-center items-center text-center">
			<div className="text-lg  dark:text-ternary-light flex items-center">
				{/* <img src={logo} alt="City Construction Logo" className="w-6 h-6 mr-2" /> Add your logo here */}
		

				&copy; {new Date().getFullYear()}
				
								<a
				//href="#"
				target="__blank"
				className="text-secondary-light hover-underline hover-indigo-600 dark-hover-white ml-1 duration-500"
				>
				City Construction 
				</a>
				.
				<a
				//href="#"
				target="__blank"
				className="text-secondary-light font-medium uppercase hover-underline hover-indigo-600 dark-text-white ml-1 duration-500"
				>
				Buildings
				</a>


				<Link to="">
			 
				<img
					src={logoLight}
					className="logo" // Apply custom CSS class
					alt="Light Logo"
				/>
			
		</Link>
		
						
					</div>
			</div>
		
	);
}

export default AppFooterCopyright;


