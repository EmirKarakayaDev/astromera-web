import { useSiteSettings as useContextSettings } from '../context/SiteSettingsContext';

export const useSiteSettings = () => {
  return useContextSettings();
};
