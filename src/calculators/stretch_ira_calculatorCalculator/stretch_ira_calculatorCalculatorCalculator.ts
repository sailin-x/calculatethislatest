import { Calculator } from '../../engines/CalculatorEngine';
import { stretch_ira_calculatorCalculatorInputs, stretch_ira_calculatorCalculatorResults, stretch_ira_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class stretch_ira_calculatorCalculatorCalculator implements Calculator<stretch_ira_calculatorCalculatorInputs, stretch_ira_calculatorCalculatorResults> {
  readonly id = 'stretch_ira_calculatorCalculator';
  readonly name = 'stretch_ira_calculatorCalculator Calculator';
  readonly description = 'Calculate stretch_ira_calculatorCalculator values';

  calculate(inputs: stretch_ira_calculatorCalculatorInputs): stretch_ira_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: stretch_ira_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: stretch_ira_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
