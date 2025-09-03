import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { mortgagePointsCalculator } from './MortgagePointsCalculator';

// Register the Mortgage Points Calculator
calculatorRegistry.register(mortgagePointsCalculator);

export { mortgagePointsCalculator };