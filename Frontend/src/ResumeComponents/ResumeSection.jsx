const ResumeSection = ({ title, children, selectedThemeColors }) => {
  const borderColor = selectedThemeColors.colors.split(' ').find(c => c.startsWith('border-')) || 'border-gray-300';

  return (
    <div className="mb-6">
      <h2 className={`text-xl font-bold mb-3 pb-2 border-b-2 ${borderColor}`}>
        {title}
      </h2>
      {children}
    </div>
  );
};

export default ResumeSection;
