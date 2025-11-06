import { Mail, Phone, MapPin } from 'lucide-react';

const ResumeHeader = ({ personalInfo }) => (
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-2">{personalInfo.name || 'Your Name'}</h1>
    <div className="flex flex-wrap justify-center gap-4 text-sm">
      {personalInfo.email && <div className="flex items-center gap-1"><Mail size={14} />{personalInfo.email}</div>}
      {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={14} />{personalInfo.phone}</div>}
      {personalInfo.location && <div className="flex items-center gap-1"><MapPin size={14} />{personalInfo.location}</div>}
    </div>
    {(personalInfo.linkedin || personalInfo.portfolio) && (
      <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
        {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
        {personalInfo.portfolio && <div>{personalInfo.portfolio}</div>}
      </div>
    )}
  </div>
);

export default ResumeHeader;
