import { Calculator } from '../../engines/CalculatorEngine';
import { employment_law_calculatorCalculatorInputs, employment_law_calculatorCalculatorResults, employment_law_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class employment_law_calculatorCalculatorCalculator implements Calculator<employment_law_calculatorCalculatorInputs, employment_law_calculatorCalculatorResults> {
  readonly id = 'employment_law_calculatorCalculator';
  readonly name = 'employment_law_calculatorCalculator Calculator';
  readonly description = 'Calculate employment_law_calculatorCalculator values';

  calculate(inputs: employment_law_calculatorCalculatorInputs): employment_law_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: employment_law_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: employment_law_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
