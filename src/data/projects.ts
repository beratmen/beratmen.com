// Define the Project interface
interface Project {
  title: string;
  description: string;
  detailedDescription: string;
  // Add other properties here as needed
}

// Create an array of projects
const projects: Project[] = [
  {
    title: "Project Name",
    description: "A concise single-sentence overview of what this project accomplishes.",
    detailedDescription: `
      This project addresses [specific problem] by implementing [key technology/approach].
      
      ### Key Features
      
      - Feature one with its main benefit
      - Feature two with its main benefit
      - Feature three with its main benefit
      
      ### Technical Highlights
      
      Built with [technologies], this project demonstrates [technical achievement]
      and overcomes [interesting challenge] through [solution approach].
      
      [Include link to live demo or repository when applicable]
    `
    // ...other properties
  }
  // You can add more projects here
];

export default projects;