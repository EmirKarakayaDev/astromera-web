import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../hooks/useSiteSettings';

const Button = ({ 
  children, 
  onClick, 
  variant = 'maroon', 
  className = '', 
  href, 
  to,
  type = 'button',
  ...props 
}) => {
  const { language } = useSiteSettings();
  
  const baseClass = 
    variant === 'nav' ? 'nav-btn-pill' : 
    variant === 'white' ? 'btn-white' : 
    'btn-maroon';
  const combinedClasses = `${baseClass} ${className}`.trim();

  if (to) {
    const cleanPath = to.replace(/^\//, '');
    const langTo = `/${language}/${cleanPath}`.replace(/\/+/g, '/');
    return (
      <Link to={langTo} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={combinedClasses} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
