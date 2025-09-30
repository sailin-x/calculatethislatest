import { Calculator } from '../../engines/CalculatorEngine';
import { bareboat_charterCalculatorInputs, bareboat_charterCalculatorResults, bareboat_charterCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class bareboat_charterCalculatorCalculator implements Calculator<bareboat_charterCalculatorInputs, bareboat_charterCalculatorResults> {
  readonly id = 'bareboat_charterCalculator';
  readonly name = 'bareboat_charterCalculator Calculator';
  readonly description = 'Calculate bareboat_charterCalculator values';

  calculate(inputs: bareboat_charterCalculatorInputs): bareboat_charterCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: bareboat_charterCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: bareboat_charterCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
