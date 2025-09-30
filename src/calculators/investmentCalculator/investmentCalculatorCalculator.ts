import { Calculator } from '../../engines/CalculatorEngine';
import { investmentCalculatorInputs, investmentCalculatorResults, investmentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class investmentCalculatorCalculator implements Calculator<investmentCalculatorInputs, investmentCalculatorResults> {
  readonly id = 'investmentCalculator';
  readonly name = 'investmentCalculator Calculator';
  readonly description = 'Calculate investmentCalculator values';

  calculate(inputs: investmentCalculatorInputs): investmentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: investmentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: investmentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
