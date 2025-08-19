import { CalculatorRegistry } from '../../data/calculatorRegistry';
import { propertyTaxCalculator } from './PropertyTaxCalculator';

// Register the Property Tax Calculator
CalculatorRegistry.register(propertyTaxCalculator);