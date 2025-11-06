const ProjectItem = ({ project, accent }) => (
  <div className="mb-4">
    <div className="flex justify-between items-start mb-1">
      <h3 className="font-semibold">{project.name}</h3>
      {project.link && (
        <a href={project.link} className={`text-sm ${accent.split(' ')[0]} hover:underline`} target="_blank" rel="noopener noreferrer">
          View Project
        </a>
      )}
    </div>
    <p className="text-sm text-gray-600 mb-1">{project.technologies}</p>
    <p className="text-sm leading-relaxed">{project.description}</p>
  </div>
);

export default ProjectItem;
