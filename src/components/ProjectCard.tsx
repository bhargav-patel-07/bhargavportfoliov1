import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

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
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg liquid-glass-effect">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={`https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=600&q=80`}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white libertinus-math-regular">{project.title}</CardTitle>
        <CardDescription className="text-gray-600">{project.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          {project.githubUrl && (
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              Code
            </Button>
          )}
          {project.liveUrl && (
            <Button size="sm" className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
