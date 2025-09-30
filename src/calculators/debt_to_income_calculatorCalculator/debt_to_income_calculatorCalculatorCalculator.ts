import { Calculator } from '../../engines/CalculatorEngine';
import { debt_to_income_calculatorCalculatorInputs, debt_to_income_calculatorCalculatorResults, debt_to_income_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class debt_to_income_calculatorCalculatorCalculator implements Calculator<debt_to_income_calculatorCalculatorInputs, debt_to_income_calculatorCalculatorResults> {
  readonly id = 'debt_to_income_calculatorCalculator';
  readonly name = 'debt_to_income_calculatorCalculator Calculator';
  readonly description = 'Calculate debt_to_income_calculatorCalculator values';

  calculate(inputs: debt_to_income_calculatorCalculatorInputs): debt_to_income_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: debt_to_income_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: debt_to_income_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
