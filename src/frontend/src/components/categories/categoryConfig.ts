import { PromptCategory } from '../../backend';

export interface CategoryInfo {
  key: PromptCategory;
  label: string;
  description: string;
  iconIndex: number;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    key: PromptCategory.videoGeneration,
    label: 'Video Generation',
    description: 'Create stunning video content with AI',
    iconIndex: 0,
  },
  {
    key: PromptCategory.photoGeneration,
    label: 'Photo Generation',
    description: 'Generate beautiful images and photos',
    iconIndex: 1,
  },
  {
    key: PromptCategory.cgiAds,
    label: 'CGI Ads',
    description: 'Professional CGI for advertising',
    iconIndex: 2,
  },
  {
    key: PromptCategory.marketing,
    label: 'Marketing',
    description: 'Marketing copy and campaigns',
    iconIndex: 3,
  },
  {
    key: PromptCategory.storytelling,
    label: 'Storytelling',
    description: 'Craft compelling narratives',
    iconIndex: 4,
  },
  {
    key: PromptCategory.business,
    label: 'Business',
    description: 'Business strategy and planning',
    iconIndex: 5,
  },
  {
    key: PromptCategory.socialMedia,
    label: 'Social Media',
    description: 'Engaging social media content',
    iconIndex: 6,
  },
  {
    key: PromptCategory.design,
    label: 'Logo & Design',
    description: 'Creative design and branding',
    iconIndex: 7,
  },
];

export function getCategoryInfo(key: PromptCategory): CategoryInfo | undefined {
  return CATEGORIES.find((cat) => cat.key === key);
}
