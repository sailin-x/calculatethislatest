import { CalculatorRegistry } from '../../data/calculatorRegistry';
import { propertyTaxProrationCalculator } from './PropertyTaxProrationCalculator';

// Register the Property Tax Proration Calculator
CalculatorRegistry.register(propertyTaxProrationCalculator);