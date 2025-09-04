import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { mortgagePaymentCalculator } from './MortgagePaymentCalculator';

// Register the Mortgage Payment Calculator
calculatorRegistry.register(mortgagePaymentCalculator);

export { mortgagePaymentCalculator };