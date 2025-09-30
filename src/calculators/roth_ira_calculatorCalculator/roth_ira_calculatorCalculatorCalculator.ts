import { Calculator } from '../../engines/CalculatorEngine';
import { roth_ira_calculatorCalculatorInputs, roth_ira_calculatorCalculatorResults, roth_ira_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class roth_ira_calculatorCalculatorCalculator implements Calculator<roth_ira_calculatorCalculatorInputs, roth_ira_calculatorCalculatorResults> {
  readonly id = 'roth_ira_calculatorCalculator';
  readonly name = 'roth_ira_calculatorCalculator Calculator';
  readonly description = 'Calculate roth_ira_calculatorCalculator values';

  calculate(inputs: roth_ira_calculatorCalculatorInputs): roth_ira_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: roth_ira_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: roth_ira_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
