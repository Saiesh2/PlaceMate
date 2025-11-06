const ExperienceItem = ({ exp, accent }) => (
  <div className="mb-4">
    <div className="flex justify-between items-start mb-1">
      <h3 className="font-semibold text-lg">{exp.title}</h3>
      <span className="text-sm text-gray-600">{exp.duration}</span>
    </div>
    <p className={`font-medium mb-2 ${accent.split(' ')[0]}`}>{exp.company}</p>
    <p className="text-sm leading-relaxed">{exp.description}</p>
  </div>
);

export default ExperienceItem;
