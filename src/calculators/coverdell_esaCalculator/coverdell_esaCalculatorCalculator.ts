import { Calculator } from '../../engines/CalculatorEngine';
import { coverdell_esaCalculatorInputs, coverdell_esaCalculatorResults, coverdell_esaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class coverdell_esaCalculatorCalculator implements Calculator<coverdell_esaCalculatorInputs, coverdell_esaCalculatorResults> {
  readonly id = 'coverdell_esaCalculator';
  readonly name = 'coverdell_esaCalculator Calculator';
  readonly description = 'Calculate coverdell_esaCalculator values';

  calculate(inputs: coverdell_esaCalculatorInputs): coverdell_esaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: coverdell_esaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: coverdell_esaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
