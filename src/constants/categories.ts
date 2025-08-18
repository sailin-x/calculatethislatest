import { CalculatorCategory } from '../types/calculator';

export interface CategoryInfo {
  id: CalculatorCategory;
  title: string;
  description: string;
  icon: string;
  color: string;
  subcategories: string[];
}

/**
 * Category definitions for the calculator platform
 * Each category represents a major domain of calculators
 */
export const CALCULATOR_CATEGORIES: CategoryInfo[] = [
  {
    id: 'finance',
    title: 'Finance & Investment',
    description: 'Comprehensive financial calculators for mortgages, investments, retirement planning, and more',
    icon: 'DollarSign',
    color: 'bg-green-500',
    subcategories: [
      'Mortgage & Real Estate',
      'Investment & Portfolio',
      'Retirement & Savings',
      'Loans & Debt',
      'Cryptocurrency',
      'Insurance',
      'Tax Planning'
    ]
  },
  {
    id: 'legal',
    title: 'Legal & Insurance',
    description: 'Specialized calculators for legal settlements, insurance valuations, and damage assessments',
    icon: 'Scale',
    color: 'bg-blue-500',
    subcategories: [
      'Personal Injury',
      'Medical Malpractice',
      'Insurance Valuations',
      'Legal Damages',
      'Workers Compensation',
      'Maritime Law',
      'Intellectual Property'
    ]
  },
  {
    id: 'business',
    title: 'Business & Operations',
    description: 'Business analysis tools for operations, marketing ROI, valuations, and strategic planning',
    icon: 'Briefcase',
    color: 'bg-purple-500',
    subcategories: [
      'SaaS Metrics',
      'Business Valuation',
      'Marketing ROI',
      'Operations Analysis',
      'Financial Modeling',
      'Supply Chain',
      'HR & Payroll'
    ]
  },
  {
    id: 'health',
    title: 'Health & Fitness',
    description: 'Health calculators for fitness, nutrition, medical planning, and wellness optimization',
    icon: 'Heart',
    color: 'bg-red-500',
    subcategories: [
      'Fitness & Exercise',
      'Nutrition & Diet',
      'Medical Planning',
      'Body Composition',
      'Health Costs',
      'Wellness Tracking',
      'Medical Dosage'
    ]
  },
  {
    id: 'construction',
    title: 'Construction & Industrial',
    description: 'Material calculators, cost estimators, and industrial analysis tools for projects',
    icon: 'HardHat',
    color: 'bg-orange-500',
    subcategories: [
      'Material Calculators',
      'Cost Estimation',
      'Project Planning',
      'Industrial Analysis',
      'Energy & Utilities',
      'Agriculture',
      'Mining & Resources'
    ]
  },
  {
    id: 'math',
    title: 'Math & Science',
    description: 'Advanced mathematical and scientific calculators with step-by-step solutions',
    icon: 'Calculator',
    color: 'bg-indigo-500',
    subcategories: [
      'Algebra & Calculus',
      'Statistics & Probability',
      'Geometry & Trigonometry',
      'Unit Conversions',
      'Physics Calculations',
      'Chemistry Tools',
      'Engineering Math'
    ]
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle & Automotive',
    description: 'Practical calculators for everyday decisions, automotive costs, and personal planning',
    icon: 'Car',
    color: 'bg-teal-500',
    subcategories: [
      'Automotive',
      'Cooking & Recipes',
      'Event Planning',
      'Hobbies & Collectibles',
      'Travel & Transportation',
      'Home & Garden',
      'Personal Finance'
    ]
  }
];

/**
 * Get category information by ID
 */
export function getCategoryInfo(categoryId: CalculatorCategory): CategoryInfo | undefined {
  return CALCULATOR_CATEGORIES.find(cat => cat.id === categoryId);
}

/**
 * Get all category IDs
 */
export function getAllCategoryIds(): CalculatorCategory[] {
  return CALCULATOR_CATEGORIES.map(cat => cat.id);
}

/**
 * Get category title by ID
 */
export function getCategoryTitle(categoryId: CalculatorCategory): string {
  const category = getCategoryInfo(categoryId);
  return category?.title || categoryId;
}

/**
 * Get category color by ID
 */
export function getCategoryColor(categoryId: CalculatorCategory): string {
  const category = getCategoryInfo(categoryId);
  return category?.color || 'bg-gray-500';
}