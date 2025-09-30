import { Calculator } from '../../engines/CalculatorEngine';
import { timberland_investmentCalculatorInputs, timberland_investmentCalculatorResults, timberland_investmentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class timberland_investmentCalculatorCalculator implements Calculator<timberland_investmentCalculatorInputs, timberland_investmentCalculatorResults> {
  readonly id = 'timberland_investmentCalculator';
  readonly name = 'timberland_investmentCalculator Calculator';
  readonly description = 'Calculate timberland_investmentCalculator values';

  calculate(inputs: timberland_investmentCalculatorInputs): timberland_investmentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: timberland_investmentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: timberland_investmentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
