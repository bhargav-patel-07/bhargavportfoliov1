import React from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="flex flex-col justify-between bg-white/10 rounded-xl p-6 shadow transition-all duration-200 hover:scale-105 hover:border-purple-500 cursor-pointer w-full max-w-xs min-h-[350px] max-h-[350px] mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-white mb-2 truncate">{project.title}</h2>
      {/* Description */}
      <p className="text-gray-300 text-left flex-1 overflow-hidden text-ellipsis mb-4">{project.description}</p>
      {/* Buttons row at the bottom, always inside the card */}
      <div className="flex justify-between w-full gap-2">
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-1/2">
          <button className="w-full bg-purple-500 text-white px-2 py-2 rounded-lg hover:bg-purple-600 transition text-sm whitespace-nowrap border border-white/30">
            View Project
          </button>
        </a>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-1/2">
          <button className="w-full bg-gray-800 text-white px-2 py-2 rounded-lg hover:bg-gray-700 transition text-sm whitespace-nowrap border border-white/30">
            GitHub
          </button>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
