import { Calculator } from '../../engines/CalculatorEngine';
import { debt_management_calculatorCalculatorInputs, debt_management_calculatorCalculatorResults, debt_management_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class debt_management_calculatorCalculatorCalculator implements Calculator<debt_management_calculatorCalculatorInputs, debt_management_calculatorCalculatorResults> {
  readonly id = 'debt_management_calculatorCalculator';
  readonly name = 'debt_management_calculatorCalculator Calculator';
  readonly description = 'Calculate debt_management_calculatorCalculator values';

  calculate(inputs: debt_management_calculatorCalculatorInputs): debt_management_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: debt_management_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: debt_management_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
