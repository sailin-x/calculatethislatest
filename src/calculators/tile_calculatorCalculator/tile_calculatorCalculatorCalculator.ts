import { Calculator } from '../../engines/CalculatorEngine';
import { tile_calculatorCalculatorInputs, tile_calculatorCalculatorResults, tile_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class tile_calculatorCalculatorCalculator implements Calculator<tile_calculatorCalculatorInputs, tile_calculatorCalculatorResults> {
  readonly id = 'tile_calculatorCalculator';
  readonly name = 'tile_calculatorCalculator Calculator';
  readonly description = 'Calculate tile_calculatorCalculator values';

  calculate(inputs: tile_calculatorCalculatorInputs): tile_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: tile_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: tile_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
