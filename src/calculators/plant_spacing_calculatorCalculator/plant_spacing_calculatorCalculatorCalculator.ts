import { Calculator } from '../../engines/CalculatorEngine';
import { plant_spacing_calculatorCalculatorInputs, plant_spacing_calculatorCalculatorResults, plant_spacing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class plant_spacing_calculatorCalculatorCalculator implements Calculator<plant_spacing_calculatorCalculatorInputs, plant_spacing_calculatorCalculatorResults> {
  readonly id = 'plant_spacing_calculatorCalculator';
  readonly name = 'plant_spacing_calculatorCalculator Calculator';
  readonly description = 'Calculate plant_spacing_calculatorCalculator values';

  calculate(inputs: plant_spacing_calculatorCalculatorInputs): plant_spacing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: plant_spacing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: plant_spacing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
