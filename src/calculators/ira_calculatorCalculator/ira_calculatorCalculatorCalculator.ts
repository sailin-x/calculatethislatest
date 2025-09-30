import { Calculator } from '../../engines/CalculatorEngine';
import { ira_calculatorCalculatorInputs, ira_calculatorCalculatorResults, ira_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ira_calculatorCalculatorCalculator implements Calculator<ira_calculatorCalculatorInputs, ira_calculatorCalculatorResults> {
  readonly id = 'ira_calculatorCalculator';
  readonly name = 'ira_calculatorCalculator Calculator';
  readonly description = 'Calculate ira_calculatorCalculator values';

  calculate(inputs: ira_calculatorCalculatorInputs): ira_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ira_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ira_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
