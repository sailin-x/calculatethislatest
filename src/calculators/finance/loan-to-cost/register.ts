import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LoanToCostCalculator } from './LoanToCostCalculator';

export const loanToCostCalculator = new LoanToCostCalculator();

calculatorRegistry.register(loanToCostCalculator);