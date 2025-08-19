import { CalculatorRegistry } from '../../data/calculatorRegistry';
import { pricePerSquareFootCalculator } from './PricePerSquareFootCalculator';

// Register the Price Per Square Foot Calculator
CalculatorRegistry.register(pricePerSquareFootCalculator);