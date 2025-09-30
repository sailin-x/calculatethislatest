import { Calculator } from '../../engines/CalculatorEngine';
import { home_insuranceCalculatorInputs, home_insuranceCalculatorResults, home_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class home_insuranceCalculatorCalculator implements Calculator<home_insuranceCalculatorInputs, home_insuranceCalculatorResults> {
  readonly id = 'home_insuranceCalculator';
  readonly name = 'home_insuranceCalculator Calculator';
  readonly description = 'Calculate home_insuranceCalculator values';

  calculate(inputs: home_insuranceCalculatorInputs): home_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: home_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: home_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
