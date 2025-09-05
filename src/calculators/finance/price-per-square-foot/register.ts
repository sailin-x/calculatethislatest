import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PricePerSquareFootCalculator } from './PricePerSquareFootCalculator';

export const pricePerSquareFootCalculator = new PricePerSquareFootCalculator();

calculatorRegistry.register(pricePerSquareFootCalculator);