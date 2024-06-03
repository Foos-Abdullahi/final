import React, { useState, useEffect } from 'react';
import { useCountUp } from 'react-countup';
import CounterItem from './CounterItem';

const AboutCounter = () => {
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [totalFinishedProjects, setTotalFinishedProjects] = useState(0);
  const [totalClient, setTotalClient] = useState(0);
  const fetchEmployee = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Employee/");
      if (!response.ok) {
        throw new Error("Failed to fetch employee data");
      }
      const empData = await response.json();
	  console.log("Response EmpData : ",empData.length);
	  const length = empData.length;
	  console.log("Length : " , length)
      setTotalEmployee(length);
	  console.log(totalEmployee);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const fetchProjects = async () => {
	try {
	  const response = await fetch("http://127.0.0.1:8000/Projects/");
	  if (!response.ok) {
		throw new Error("Failed to fetch project data");
	  }
	  const data = await response.json();
	  console.log("Response Data: ", data);
  
	  const length = data.length;
	  console.log("Length: ", length);
  
	  const finishedProjects = data.filter(project => project.status === "finish");
	  console.log("Finished Projects: ", finishedProjects);
  
	  if (finishedProjects.length > 0) {
		console.log("First Finished Project Name: ", finishedProjects[0].project_name);
	  }
  
	  setTotalFinishedProjects(finishedProjects.length);
	  console.log("Total Finished Projects: ", finishedProjects.length);
	} catch (error) {
	  console.error("Error fetching project data:", error);
	}
  };
  const fetchClinet = async () => {
	try {
	  const response = await fetch("http://127.0.0.1:8000/Client/");
	  if (!response.ok) {
		throw new Error("Failed to fetch Clinet data");
	  }
	  const data = await response.json();
	  // Set the total number of client
	  setTotalClient(data.length);
	} catch (error) {
	  console.error("Error fetching Clinet data:", error);
	}
  };


  useEffect(() => {
	fetchClinet();
    fetchEmployee();
    fetchProjects();
  }, []);
  useCountUp({ ref: 'experienceCounter', end: 12, duration: 2 });
  useCountUp({ ref: 'githubStarsCounter', end: totalEmployee, duration: 2 });
  useCountUp({ ref: 'feedbackCounter', end: 4, duration: 2 });
  useCountUp({ ref: 'projectsCounter', end: totalFinishedProjects, duration: 2 });

  return (
    <div className="mt-10 sm:mt-20 bg-primary-light dark:bg-ternary-dark shadow-sm">
      <div className="font-general-medium container mx-auto py-20 block sm:flex sm:justify-between items-center">
        <CounterItem
          title="PROJECTS DONE"
          counter={totalFinishedProjects}
          measurement=""
        />

        <CounterItem
          title="Clients"
          counter={totalClient}
          measurement=""
        />

        {/* <CounterItem
          title="AWARDS WON"
          counter={<span id="feedbackCounter" />}
          measurement=""
        /> */}

        <CounterItem
          title="QUALIFIED STAFF"
          counter={totalEmployee}
          measurement=""
        />
      </div>
    </div>
  );
};

export default AboutCounter;