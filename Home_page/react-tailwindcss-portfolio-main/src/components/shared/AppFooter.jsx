import React from 'react';
import {
    FiGithub,
    FiTwitter,
    FiLinkedin,
    FiGlobe,
    FiYoutube,
} from 'react-icons/fi';
import AppFooterCopyright from './AppFooterCopyright';

const socialLinks = [
    {
        id: 1,
        icon: <FiGlobe />,
        url: 'http://localhost:3000/',
    },
    {
        id: 2,
        icon: <FiGithub />,
        url: 'https://github.com/Foos-Abdullahi/final',
    },
    // {
    //     id: 3,
    //     icon: <FiTwitter />,
    //     url: 'https://twitter.com/realstoman',
    // },
    // {
    //     id: 4,
    //     icon: <FiLinkedin />,
    //     url: 'https://www.linkedin.com/in/realstoman',
    // },
    // {
    //     id: 5,
    //     icon: <FiYoutube />,
    //     url: 'https://www.youtube.com/c/realstoman',
    // },
];

const AppFooter = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                        <h1 className="text-primary">City Construction</h1>
                        <p>
                            CITY CONSTRUCTION COMPANY is a leading construction firm with a strong 
							reputation for delivering high-quality projects on time and within budget.
                        </p>
                        <div className="social-links">
                            {socialLinks.map((link) => (
                                <a
                                    href={link.url}
                                    target="__blank"
                                    key={link.id}
                                    className="hover:text-primary"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
					
                    <div>
                    <div className="footer-sections lg:col-span-2 flex justify-between">
                        <div>
                            <h6>Partners</h6>
                            <ul>
                                <li>Tika</li>
                                <li>Cawiye</li>
                                <li>MPU</li>
                                <li>Hubsiimo</li>
                            </ul>
                        </div>
						
                        <div>
                            <h6>Company</h6>
                            <ul>
                                <li><a href="http://localhost:3000/about">About</a></li>
                                <li><a href="http://localhost:3000/services">Services</a></li>
                                <li><a href="http://localhost:3000/projects">Projects</a></li>
                                <li><a href="http://localhost:3000/contact">Contact</a></li>
                                <li><a href="http://localhost:3000/">Home</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
                <div className="copyright">
                    <AppFooterCopyright />
                </div>
            </div>
        </div>
    );
};

export default AppFooter;
