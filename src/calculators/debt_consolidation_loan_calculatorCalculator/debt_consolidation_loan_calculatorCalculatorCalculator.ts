import { Calculator } from '../../engines/CalculatorEngine';
import { debt_consolidation_loan_calculatorCalculatorInputs, debt_consolidation_loan_calculatorCalculatorResults, debt_consolidation_loan_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class debt_consolidation_loan_calculatorCalculatorCalculator implements Calculator<debt_consolidation_loan_calculatorCalculatorInputs, debt_consolidation_loan_calculatorCalculatorResults> {
  readonly id = 'debt_consolidation_loan_calculatorCalculator';
  readonly name = 'debt_consolidation_loan_calculatorCalculator Calculator';
  readonly description = 'Calculate debt_consolidation_loan_calculatorCalculator values';

  calculate(inputs: debt_consolidation_loan_calculatorCalculatorInputs): debt_consolidation_loan_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: debt_consolidation_loan_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: debt_consolidation_loan_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
