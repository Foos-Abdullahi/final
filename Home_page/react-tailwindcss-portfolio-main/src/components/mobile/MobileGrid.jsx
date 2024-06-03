import React from "react";
import { MobileData } from "../../data/mobileData";

function MobileGrid() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="title"></div>
        <div className="text-center">
          <p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
            City Construction Mobile App Info
          </p>
        </div>

        <div className="mt-10 text-center">
          <p className="font-general-regular text-1xl sm:text-1xl mb-1 text-ternary-dark dark:text-ternary-light">
            We have developed a mobile app that provides our clients with a
            convenient way to track the progress of their construction
            projects. With our app, clients can easily monitor key milestones,
            view their personal projects, and make payments. Our goal is to
            streamline the construction tracking process and enhance client
            satisfaction by providing a reliable and efficient mobile solution.
          </p>
        </div>

        <div className="mt-10 sm:mt-16 text-center projects-wrapper">
          {MobileData.map((item) => (
            <div className="text-center project" key={item.id}>
              <div className="font-general-medium text-lg md:text-xl text-ternary-dark dark:text-ternary-light mb-2 text-center capitalize img-container">
                <img src={item.img} height={10} alt={item.title} />
              </div>
              <div className="text-center capitalize description">
                <h4 className="text-center capitalize font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
                  {item.title}
                </h4>
                {/* Render other links or information */}
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MobileGrid;