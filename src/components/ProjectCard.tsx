import React from 'react';
import { Folder } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  github_url?: string;
  live_url?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="flex flex-col justify-between bg-white/10 border border-transparent rounded-xl p-6 shadow transition-all duration-200 hover:scale-105 hover:border-purple-500 cursor-pointer w-full max-w-xs min-h-[350px] max-h-[350px] mx-auto">
      {/* Logo and Title side by side */}
      <div className="flex items-center justify-center mb-4 gap-3">
        {project.image_url ? (
          <img src={project.image_url} alt="logo" className="w-10 h-10 object-contain rounded-full bg-black p-1" />
        ) : (
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-black">
            <Folder className="w-6 h-6 text-purple-400" />
          </span>
        )}
        <h2 className="text-2xl font-bold text-white truncate text-left">{project.title}</h2>
      </div>
      {/* Description */}
      <p className="text-gray-300 text-left flex-1 overflow-hidden text-ellipsis mb-4">{project.description}</p>
      {/* Buttons row at the bottom, always inside the card */}
      <div className="flex justify-between w-full gap-2">
        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="w-1/2">
          <button className="w-full bg-purple-500 text-white px-2 py-2 rounded-lg hover:bg-purple-600 transition text-sm whitespace-nowrap border border-white/30">
            Live
          </button>
        </a>
        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="w-1/2">
          <button className="w-full bg-gray-800 text-white px-2 py-2 rounded-lg hover:bg-gray-700 transition text-sm whitespace-nowrap border border-white/30">
            GitHub
          </button>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
