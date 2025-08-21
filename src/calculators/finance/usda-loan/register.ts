import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { USDALoanCalculator } from './USDALoanCalculator';

// Register the USDA Loan Calculator
CalculatorRegistry.register(USDALoanCalculator);
