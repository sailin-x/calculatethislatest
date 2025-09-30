import { Calculator } from '../../engines/CalculatorEngine';
import { medical_expense_tax_deduction_calculatorCalculatorInputs, medical_expense_tax_deduction_calculatorCalculatorResults, medical_expense_tax_deduction_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class medical_expense_tax_deduction_calculatorCalculatorCalculator implements Calculator<medical_expense_tax_deduction_calculatorCalculatorInputs, medical_expense_tax_deduction_calculatorCalculatorResults> {
  readonly id = 'medical_expense_tax_deduction_calculatorCalculator';
  readonly name = 'medical_expense_tax_deduction_calculatorCalculator Calculator';
  readonly description = 'Calculate medical_expense_tax_deduction_calculatorCalculator values';

  calculate(inputs: medical_expense_tax_deduction_calculatorCalculatorInputs): medical_expense_tax_deduction_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: medical_expense_tax_deduction_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: medical_expense_tax_deduction_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
