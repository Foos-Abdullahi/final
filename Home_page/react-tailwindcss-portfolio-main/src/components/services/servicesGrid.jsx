/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

// import { ProjectsContext } from '../../context/CompProjectscontext';
 //import UIImage2 from '../images/1.jpg';
// import UIImage22 from './1.jpg';

function ServicesGrid() {
  const [services, setservice] = useState([]);
	const [designs, setDesigns] = useState([]);

	useEffect(() => {
		fetchservice();
	}, []);

	const fetchservice = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/service/");
			const data = await response.json();
			setservice(data);
		} catch (error) {
			console.error("Error fetching service:", error);
		}
	};
  const [projectss] = useState([
    {
      title: "Project 1",
      img: "../images/1.jpg",
    //  img: UIImage2,
    
    },
    {
      title: "Project 2",
      img: "/projects/2.png",
      gLink: "https://github.com/hafizjavaid",
      lLink: "https://me-hafiz.netlify.app/",
    },
    {
      title: "Project 3",
      img: "/projects/3.png",
      gLink: "https://github.com/hafizjavaid",
      lLink: "https://me-hafiz.netlify.app/",
    },
    {
      title: "Project 4",
      img: "/projects/4.png",
      gLink: "https://github.com/hafizjavaid",
      lLink: "https://me-hafiz.netlify.app/",
    },
    {
      title: "Project 5",
      img: "/projects/5.png",
      gLink: "https://github.com/hafizjavaid",
      lLink: "https://me-hafiz.netlify.app/",
    },
    {
      title: "Project 6",
      img: "/projects/6.png",
      gLink: "https://github.com/hafizjavaid",
      lLink: "https://me-hafiz.netlify.app/",
    },
  ]);
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="title">
          {/* <h3>Featured Projects</h3> */}
          {/* <a
            href="https://github.com/hafizjavaid"
            target="_blank"
            className="btn"
            rel="noreferrer"
          >
            View All
          </a> */}
        </div>
        <div className="text-center">
				<p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
					City Construction Services
				</p>
			</div>
        <div className="mt-10 sm:mt-16 text-center  projects-wrapper">
          {services.map((service, i) => (
            <div className="text-center project" key={i}>
              <div className="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2 text-center img-container">
                <img src={service.img} alt={service.service_name} />
              </div>
              <div className="text-center description">
                <h4 className="text-center font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">{service.title}</h4>
                <div className="links">
                  <a href={service.gLink} target="_blank" rel="noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href={service.lLink} target="_blank" rel="noreferrer">
                    <i className="fa fa-globe"></i>
                  </a>
                </div>
              </div>
              {/* <p className="font-general-medium text-1xl sm:text-2xl mb-1 text-ternary-dark dark:text-ternary-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                ea nobis aut deserunt. Reprehenderit numquam harum facilis
                beatae praesentium pariatur eligendi non. Explicabo, cupiditate
                odit vero quo iste numquam obcaecati.
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default ServicesGrid;