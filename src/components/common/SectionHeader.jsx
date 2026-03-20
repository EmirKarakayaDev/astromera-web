import Reveal from '../Reveal';

const SectionHeader = ({ 
  title, 
  subtitle, 
  badge, 
  centered = true, 
  className = "",
  delay = 0
}) => {
  return (
    <Reveal className={`${centered ? 'text-center' : ''} ${className}`.trim()} delay={delay}>
      {badge && <span className="badge-trusted">{badge}</span>}
      <h2 className="h2-section">{title}</h2>
      {subtitle && <p className="p-large" style={{ marginTop: '16px' }}>{subtitle}</p>}
    </Reveal>
  );
};

export default SectionHeader;
