import { Calculator } from '../../engines/CalculatorEngine';
import { angel_investmentCalculatorInputs, angel_investmentCalculatorResults, angel_investmentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class angel_investmentCalculatorCalculator implements Calculator<angel_investmentCalculatorInputs, angel_investmentCalculatorResults> {
  readonly id = 'angel_investmentCalculator';
  readonly name = 'angel_investmentCalculator Calculator';
  readonly description = 'Calculate angel_investmentCalculator values';

  calculate(inputs: angel_investmentCalculatorInputs): angel_investmentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: angel_investmentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: angel_investmentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
