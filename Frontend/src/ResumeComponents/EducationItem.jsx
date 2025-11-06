const EducationItem = ({ edu, accent }) => (
  <div className="mb-3">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{edu.degree}</h3>
        <p className={`${accent.split(' ')[0]}`}>{edu.institution}</p>
      </div>
      <div className="text-right text-sm">
        <div>{edu.year}</div>
        {edu.gpa && <div>GPA: {edu.gpa}</div>}
      </div>
    </div>
  </div>
);

export default EducationItem;
