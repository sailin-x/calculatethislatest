import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LoanToValueCalculator } from './LoanToValueCalculator';

export const loanToValueCalculator = new LoanToValueCalculator();

calculatorRegistry.register(loanToValueCalculator);