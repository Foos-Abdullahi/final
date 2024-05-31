import React, { useState, useEffect } from "react";

function ServicesGrid() {
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/service/");
      const data = await response.json();
      console.log(data);
      setServices(data);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="title"></div>
        <div className="text-center">
          <p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
            City Construction Services
          </p>
        </div>
        <div className="mt-10 sm:mt-16 text-center projects-wrapper">
          {services.map((service, i) => (
            <div className="text-center project" key={i}>
              <div className="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2 text-center capitalize img-container">
                <img
                  src={`https://raw.githubusercontent.com/Foos-Abdullahi/final/main/Home_page/react-tailwindcss-portfolio-main/src/images/services${service.service_Image}`}
                  alt={service.service_name}
                />
              </div>
              <div className="text-center capitalize description">
                <h4 className="text-center capitalize font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
                  {service.service_name}
                </h4>
                <div className="links">
                  <a href={service.gLink} target="_blank" rel="noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href={service.lLink} target="_blank" rel="noreferrer">
                    <i className="fa fa-globe"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
