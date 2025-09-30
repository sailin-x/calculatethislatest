import { Calculator } from '../../engines/CalculatorEngine';
import { simple_ira_calculatorCalculatorInputs, simple_ira_calculatorCalculatorResults, simple_ira_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class simple_ira_calculatorCalculatorCalculator implements Calculator<simple_ira_calculatorCalculatorInputs, simple_ira_calculatorCalculatorResults> {
  readonly id = 'simple_ira_calculatorCalculator';
  readonly name = 'simple_ira_calculatorCalculator Calculator';
  readonly description = 'Calculate simple_ira_calculatorCalculator values';

  calculate(inputs: simple_ira_calculatorCalculatorInputs): simple_ira_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: simple_ira_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: simple_ira_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
