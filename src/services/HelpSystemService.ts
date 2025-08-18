import { Calculator } from '../types/Calculator';

export interface HelpContent {
  id: string;
  title: string;
  content: string;
  type: 'tooltip' | 'guide' | 'formula' | 'faq' | 'tutorial';
  category?: string;
  tags?: string[];
  lastUpdated: Date;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime?: number;
}

export interface ContextualHelp {
  fieldId: string;
  title: string;
  description: string;
  examples?: string[];
  tips?: string[];
  relatedLinks?: Array<{
    title: string;
    url: string;
  }>;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  tags: string[];
}

export interface TutorialStep {
  id: string;
  title: string;
  content: string;
  action?: {
    type: 'input' | 'click' | 'navigate';
    target: string;
    value?: string;
  };
  validation?: {
    type: 'value' | 'presence' | 'custom';
    expected?: any;
    validator?: (value: any) => boolean;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  popularity: number;
  lastUpdated: Date;
}

export class HelpSystemService {
  private static readonly HELP_STORAGE_KEY = 'calculator_help_content';
  private static readonly FAQ_STORAGE_KEY = 'calculator_faq';
  private static readonly TUTORIAL_STORAGE_KEY = 'calculator_tutorials';

  // Contextual Help Methods
  static getContextualHelp(calculatorId: string, fieldId: string): ContextualHelp | null {
    const helpData = this.getCalculatorHelpData(calculatorId);
    return helpData.contextualHelp?.[fieldId] || null;
  }

  static getAllContextualHelp(calculatorId: string): Record<string, ContextualHelp> {
    const helpData = this.getCalculatorHelpData(calculatorId);
    return helpData.contextualHelp || {};
  }

  // Usage Guides
  static getUsageGuide(calculatorId: string): HelpContent | null {
    const guides = this.getHelpContent('guide');
    return guides.find(guide => guide.id === `${calculatorId}_guide`) || null;
  }

  static createUsageGuide(calculator: Calculator): HelpContent {
    const guide: HelpContent = {
      id: `${calculator.id}_guide`,
      title: `How to Use ${calculator.name}`,
      type: 'guide',
      category: calculator.category,
      tags: [calculator.category, 'usage', 'guide'],
      lastUpdated: new Date(),
      difficulty: 'beginner',
      estimatedReadTime: 5,
      content: this.generateUsageGuideContent(calculator)
    };

    this.saveHelpContent(guide);
    return guide;
  }

  // Formula Documentation
  static getFormulaDocumentation(calculatorId: string): HelpContent[] {
    const formulas = this.getHelpContent('formula');
    return formulas.filter(formula => formula.id.startsWith(calculatorId));
  }

  static createFormulaDocumentation(calculator: Calculator): HelpContent[] {
    if (!calculator.formulas) return [];

    const formulaDocs = calculator.formulas.map(formula => ({
      id: `${calculator.id}_formula_${formula.name.toLowerCase().replace(/\s+/g, '_')}`,
      title: `${formula.name} Formula`,
      type: 'formula' as const,
      category: calculator.category,
      tags: [calculator.category, 'formula', 'math'],
      lastUpdated: new Date(),
      difficulty: 'intermediate' as const,
      estimatedReadTime: 3,
      content: this.generateFormulaDocumentation(formula)
    }));

    formulaDocs.forEach(doc => this.saveHelpContent(doc));
    return formulaDocs;
  }

  // FAQ System
  static getFAQs(category?: string, searchTerm?: string): FAQ[] {
    const faqs = this.loadFAQs();
    let filtered = faqs;

    if (category) {
      filtered = filtered.filter(faq => faq.category === category);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchLower) ||
        faq.answer.toLowerCase().includes(searchLower) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    return filtered.sort((a, b) => b.popularity - a.popularity);
  }

  static addFAQ(faq: Omit<FAQ, 'id' | 'popularity' | 'lastUpdated'>): FAQ {
    const newFAQ: FAQ = {
      ...faq,
      id: this.generateId('faq'),
      popularity: 0,
      lastUpdated: new Date()
    };

    const faqs = this.loadFAQs();
    faqs.push(newFAQ);
    this.saveFAQs(faqs);

    return newFAQ;
  }

  static incrementFAQPopularity(faqId: string): void {
    const faqs = this.loadFAQs();
    const faq = faqs.find(f => f.id === faqId);
    if (faq) {
      faq.popularity += 1;
      this.saveFAQs(faqs);
    }
  }

  // Tutorial System
  static getTutorials(calculatorId?: string, difficulty?: string): Tutorial[] {
    const tutorials = this.loadTutorials();
    let filtered = tutorials;

    if (calculatorId) {
      filtered = filtered.filter(tutorial => 
        tutorial.id.startsWith(calculatorId) || 
        tutorial.tags.includes(calculatorId)
      );
    }

    if (difficulty) {
      filtered = filtered.filter(tutorial => tutorial.difficulty === difficulty);
    }

    return filtered;
  }

  static createInteractiveTutorial(calculator: Calculator): Tutorial {
    const tutorial: Tutorial = {
      id: `${calculator.id}_tutorial`,
      title: `Interactive ${calculator.name} Tutorial`,
      description: `Learn how to use the ${calculator.name} with this step-by-step interactive guide.`,
      duration: 10,
      difficulty: 'beginner',
      tags: [calculator.category, calculator.id, 'interactive'],
      steps: this.generateTutorialSteps(calculator)
    };

    this.saveTutorial(tutorial);
    return tutorial;
  }

  // Search and Discovery
  static searchHelp(query: string): HelpContent[] {
    const allContent = this.getAllHelpContent();
    const searchLower = query.toLowerCase();

    return allContent.filter(content =>
      content.title.toLowerCase().includes(searchLower) ||
      content.content.toLowerCase().includes(searchLower) ||
      content.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    ).sort((a, b) => {
      // Prioritize by relevance (title matches first)
      const aTitle = a.title.toLowerCase().includes(searchLower);
      const bTitle = b.title.toLowerCase().includes(searchLower);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      
      return b.lastUpdated.getTime() - a.lastUpdated.getTime();
    });
  }

  static getPopularContent(limit: number = 10): HelpContent[] {
    // This would typically track view counts, but for now return recent content
    const allContent = this.getAllHelpContent();
    return allContent
      .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
      .slice(0, limit);
  }

  // Content Management
  private static getHelpContent(type?: string): HelpContent[] {
    const allContent = this.getAllHelpContent();
    return type ? allContent.filter(content => content.type === type) : allContent;
  }

  private static getAllHelpContent(): HelpContent[] {
    try {
      const stored = localStorage.getItem(this.HELP_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading help content:', error);
      return [];
    }
  }

  private static saveHelpContent(content: HelpContent): void {
    const allContent = this.getAllHelpContent();
    const existingIndex = allContent.findIndex(c => c.id === content.id);
    
    if (existingIndex >= 0) {
      allContent[existingIndex] = content;
    } else {
      allContent.push(content);
    }

    try {
      localStorage.setItem(this.HELP_STORAGE_KEY, JSON.stringify(allContent));
    } catch (error) {
      console.error('Error saving help content:', error);
    }
  }

  private static loadFAQs(): FAQ[] {
    try {
      const stored = localStorage.getItem(this.FAQ_STORAGE_KEY);
      return stored ? JSON.parse(stored) : this.getDefaultFAQs();
    } catch (error) {
      console.error('Error loading FAQs:', error);
      return this.getDefaultFAQs();
    }
  }

  private static saveFAQs(faqs: FAQ[]): void {
    try {
      localStorage.setItem(this.FAQ_STORAGE_KEY, JSON.stringify(faqs));
    } catch (error) {
      console.error('Error saving FAQs:', error);
    }
  }

  private static loadTutorials(): Tutorial[] {
    try {
      const stored = localStorage.getItem(this.TUTORIAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading tutorials:', error);
      return [];
    }
  }

  private static saveTutorial(tutorial: Tutorial): void {
    const tutorials = this.loadTutorials();
    const existingIndex = tutorials.findIndex(t => t.id === tutorial.id);
    
    if (existingIndex >= 0) {
      tutorials[existingIndex] = tutorial;
    } else {
      tutorials.push(tutorial);
    }

    try {
      localStorage.setItem(this.TUTORIAL_STORAGE_KEY, JSON.stringify(tutorials));
    } catch (error) {
      console.error('Error saving tutorial:', error);
    }
  }

  private static getCalculatorHelpData(calculatorId: string): any {
    // This would load calculator-specific help data
    return {
      contextualHelp: this.generateContextualHelp(calculatorId)
    };
  }

  private static generateContextualHelp(calculatorId: string): Record<string, ContextualHelp> {
    // Generate contextual help based on calculator type
    const commonHelp: Record<string, ContextualHelp> = {
      amount: {
        fieldId: 'amount',
        title: 'Amount',
        description: 'Enter the principal amount or initial value for the calculation.',
        examples: ['$100,000', '$50,000', '$250,000'],
        tips: [
          'Use whole numbers without commas',
          'Do not include currency symbols',
          'Ensure the amount is within reasonable limits'
        ]
      },
      rate: {
        fieldId: 'rate',
        title: 'Interest Rate',
        description: 'Enter the annual interest rate as a percentage.',
        examples: ['3.5', '4.25', '5.0'],
        tips: [
          'Enter as a percentage (e.g., 5 for 5%)',
          'Use decimal points for precision',
          'Check current market rates for accuracy'
        ]
      },
      term: {
        fieldId: 'term',
        title: 'Term Length',
        description: 'Enter the length of the loan or investment period.',
        examples: ['30 years', '15 years', '5 years'],
        tips: [
          'Consider how term length affects payments',
          'Shorter terms mean higher payments but less interest',
          'Longer terms mean lower payments but more interest'
        ]
      }
    };

    return commonHelp;
  }

  private static generateUsageGuideContent(calculator: Calculator): string {
    return `
# ${calculator.name} Usage Guide

## Overview
${calculator.description || `The ${calculator.name} helps you calculate important financial metrics quickly and accurately.`}

## How to Use

### Step 1: Enter Your Information
Fill in all required fields with accurate information:

${calculator.inputs.map(input => `
- **${input.label}**: ${input.description || 'Enter the appropriate value'}
  ${input.placeholder ? `  - Example: ${input.placeholder}` : ''}
`).join('')}

### Step 2: Review Results
Once you've entered all information, the calculator will automatically compute:

${calculator.outputs.map(output => `
- **${output.label}**: ${output.description || 'Calculated result'}
`).join('')}

### Step 3: Interpret Your Results
${this.generateInterpretationGuidance(calculator)}

## Tips for Accuracy
- Double-check all input values
- Use current market rates when applicable
- Consider consulting with a professional for complex scenarios
- Save your calculations for future reference

## Common Mistakes to Avoid
- Entering percentages as decimals (use 5, not 0.05 for 5%)
- Forgetting to account for additional fees or costs
- Using outdated rates or information
- Not considering tax implications

## Need More Help?
- Check our FAQ section for common questions
- Try our interactive tutorial
- Contact support for personalized assistance
    `;
  }

  private static generateFormulaDocumentation(formula: any): string {
    return `
# ${formula.name} Formula

## Mathematical Expression
\`\`\`
${formula.formula}
\`\`\`

## Description
${formula.description || 'This formula calculates important financial metrics.'}

## Variables
${this.extractVariablesFromFormula(formula.formula).map(variable => `
- **${variable}**: ${this.getVariableDescription(variable)}
`).join('')}

## Example Calculation
${this.generateFormulaExample(formula)}

## When to Use
${this.getFormulaUsageGuidance(formula)}

## Limitations
- Assumes constant rates (where applicable)
- Does not account for taxes or fees unless specified
- Results are estimates and should be verified with professionals

## Related Formulas
${this.getRelatedFormulas(formula)}
    `;
  }

  private static generateTutorialSteps(calculator: Calculator): TutorialStep[] {
    const steps: TutorialStep[] = [
      {
        id: 'welcome',
        title: 'Welcome',
        content: `Welcome to the ${calculator.name} tutorial! We'll walk you through using this calculator step by step.`
      }
    ];

    // Add steps for each input
    calculator.inputs.forEach((input, index) => {
      steps.push({
        id: `input_${index}`,
        title: `Enter ${input.label}`,
        content: `Now let's enter the ${input.label}. ${input.description || ''}`,
        action: {
          type: 'input',
          target: input.id,
          value: input.placeholder || input.defaultValue
        },
        validation: {
          type: 'presence'
        }
      });
    });

    steps.push({
      id: 'review_results',
      title: 'Review Results',
      content: 'Great! Now you can see the calculated results. Take a moment to review each value and understand what it means.'
    });

    steps.push({
      id: 'completion',
      title: 'Tutorial Complete',
      content: `Congratulations! You've successfully completed the ${calculator.name} tutorial. You can now use this calculator confidently.`
    });

    return steps;
  }

  private static getDefaultFAQs(): FAQ[] {
    return [
      {
        id: 'faq_1',
        question: 'How accurate are the calculator results?',
        answer: 'Our calculators use industry-standard formulas and are regularly updated. However, results are estimates and should be verified with professionals for important decisions.',
        category: 'general',
        tags: ['accuracy', 'reliability'],
        popularity: 100,
        lastUpdated: new Date()
      },
      {
        id: 'faq_2',
        question: 'Can I save my calculations?',
        answer: 'Yes! You can bookmark calculations and access your calculation history. Your data is stored locally in your browser.',
        category: 'features',
        tags: ['save', 'history', 'bookmarks'],
        popularity: 85,
        lastUpdated: new Date()
      },
      {
        id: 'faq_3',
        question: 'Are my calculations private?',
        answer: 'Absolutely. All calculations are performed in your browser and no personal data is sent to our servers.',
        category: 'privacy',
        tags: ['privacy', 'security', 'data'],
        popularity: 75,
        lastUpdated: new Date()
      }
    ];
  }

  private static generateInterpretationGuidance(calculator: Calculator): string {
    // Generate guidance based on calculator type
    if (calculator.category === 'finance') {
      return 'Review the calculated values to understand the financial impact of your scenario. Consider how changes to inputs affect the results.';
    }
    return 'Analyze the results in the context of your specific situation and goals.';
  }

  private static extractVariablesFromFormula(formula: string): string[] {
    // Simple variable extraction - in a real implementation, this would be more sophisticated
    const matches = formula.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [];
    return [...new Set(matches)].filter(match => 
      !['sin', 'cos', 'tan', 'log', 'exp', 'sqrt', 'pow'].includes(match.toLowerCase())
    );
  }

  private static getVariableDescription(variable: string): string {
    const descriptions: Record<string, string> = {
      'P': 'Principal amount',
      'r': 'Interest rate (as decimal)',
      'n': 'Number of compounding periods',
      't': 'Time in years',
      'PMT': 'Payment amount',
      'FV': 'Future value',
      'PV': 'Present value'
    };
    return descriptions[variable] || 'Variable used in calculation';
  }

  private static generateFormulaExample(formula: any): string {
    return 'Example calculation with sample values will be shown here.';
  }

  private static getFormulaUsageGuidance(formula: any): string {
    return 'This formula is commonly used in financial calculations and provides accurate results when used with appropriate inputs.';
  }

  private static getRelatedFormulas(formula: any): string {
    return 'Related formulas and calculations will be listed here.';
  }

  private static generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}