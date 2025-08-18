import { Calculator, CalculatorCategory } from '../types/calculator';

/**
 * Central registry for all calculators on the platform
 * Provides methods to register, retrieve, and organize calculators
 */
export class CalculatorRegistry {
  private calculators: Map<string, Calculator> = new Map();
  private categorizedCalculators: Map<CalculatorCategory, Calculator[]> = new Map();

  constructor() {
    this.initializeCategories();
  }

  /**
   * Initialize empty category maps
   */
  private initializeCategories(): void {
    const categories: CalculatorCategory[] = [
      'finance',
      'legal', 
      'business',
      'health',
      'construction',
      'math',
      'lifestyle'
    ];

    categories.forEach(category => {
      this.categorizedCalculators.set(category, []);
    });
  }

  /**
   * Register a new calculator
   */
  register(calculator: Calculator): void {
    this.calculators.set(calculator.id, calculator);
    
    const categoryCalculators = this.categorizedCalculators.get(calculator.category) || [];
    categoryCalculators.push(calculator);
    this.categorizedCalculators.set(calculator.category, categoryCalculators);
  }

  /**
   * Get a calculator by ID
   */
  getCalculator(id: string): Calculator | undefined {
    return this.calculators.get(id);
  }

  /**
   * Get all calculators in a category
   */
  getCalculatorsByCategory(category: CalculatorCategory): Calculator[] {
    return this.categorizedCalculators.get(category) || [];
  }

  /**
   * Get all calculators
   */
  getAllCalculators(): Calculator[] {
    return Array.from(this.calculators.values());
  }

  /**
   * Search calculators by title or description
   */
  searchCalculators(query: string): Calculator[] {
    const searchTerm = query.toLowerCase();
    return this.getAllCalculators().filter(calc => 
      calc.title.toLowerCase().includes(searchTerm) ||
      calc.description.toLowerCase().includes(searchTerm) ||
      calc.category.toLowerCase().includes(searchTerm) ||
      calc.subcategory?.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Get calculators by subcategory
   */
  getCalculatorsBySubcategory(category: CalculatorCategory, subcategory: string): Calculator[] {
    return this.getCalculatorsByCategory(category).filter(calc => 
      calc.subcategory === subcategory
    );
  }

  /**
   * Get all subcategories for a category
   */
  getSubcategories(category: CalculatorCategory): string[] {
    const calculators = this.getCalculatorsByCategory(category);
    const subcategories = new Set<string>();
    
    calculators.forEach(calc => {
      if (calc.subcategory) {
        subcategories.add(calc.subcategory);
      }
    });

    return Array.from(subcategories).sort();
  }

  /**
   * Get calculator count by category
   */
  getCategoryCount(category: CalculatorCategory): number {
    return this.getCalculatorsByCategory(category).length;
  }

  /**
   * Get total calculator count
   */
  getTotalCount(): number {
    return this.calculators.size;
  }

  /**
   * Check if a calculator exists
   */
  hasCalculator(id: string): boolean {
    return this.calculators.has(id);
  }

  /**
   * Remove a calculator
   */
  unregister(id: string): boolean {
    const calculator = this.calculators.get(id);
    if (!calculator) return false;

    this.calculators.delete(id);
    
    const categoryCalculators = this.categorizedCalculators.get(calculator.category) || [];
    const filteredCalculators = categoryCalculators.filter(calc => calc.id !== id);
    this.categorizedCalculators.set(calculator.category, filteredCalculators);

    return true;
  }
}

// Create and export a singleton instance
export const calculatorRegistry = new CalculatorRegistry();