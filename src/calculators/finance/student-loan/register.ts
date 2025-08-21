import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { StudentLoanCalculator } from './StudentLoanCalculator';

// Register the Student Loan Calculator
CalculatorRegistry.register(StudentLoanCalculator);
