import { Calculator } from '../../engines/CalculatorEngine';
import { building_replacement_costCalculatorInputs, building_replacement_costCalculatorResults, building_replacement_costCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class building_replacement_costCalculatorCalculator implements Calculator<building_replacement_costCalculatorInputs, building_replacement_costCalculatorResults> {
  readonly id = 'building_replacement_costCalculator';
  readonly name = 'building_replacement_costCalculator Calculator';
  readonly description = 'Calculate building_replacement_costCalculator values';

  calculate(inputs: building_replacement_costCalculatorInputs): building_replacement_costCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: building_replacement_costCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: building_replacement_costCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
