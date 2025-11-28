import ClassicTemplate from '../ResumeRenderers/ClassicTemplate';
import ModernTemplate from '../ResumeRenderers/ModernTemplate';
import MinimalTemplate from '../ResumeRenderers/MinimalTemplate';
import ProfessionalTemplate from '../ResumeRenderers/ProfessionalTemplate';

export const getPDFTemplate = (templateType) => {
  switch (templateType) {
    case 'modern':
      return ModernTemplate;
    case 'minimal':
      return MinimalTemplate;
    case 'professional':
      return ProfessionalTemplate;
    case 'classic':
    default:
      return ClassicTemplate;
  }
};

export const availableTemplates = [
  { id: 'classic', name: 'Classic', component: ClassicTemplate },
  { id: 'modern', name: 'Modern', component: ModernTemplate },
  { id: 'minimal', name: 'Minimal', component: MinimalTemplate },
  { id: 'professional', name: 'Professional', component: ProfessionalTemplate }
];