import { Calculator } from '../../engines/CalculatorEngine';
import { physical_therapy_cost_calculatorCalculatorInputs, physical_therapy_cost_calculatorCalculatorResults, physical_therapy_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class physical_therapy_cost_calculatorCalculatorCalculator implements Calculator<physical_therapy_cost_calculatorCalculatorInputs, physical_therapy_cost_calculatorCalculatorResults> {
  readonly id = 'physical_therapy_cost_calculatorCalculator';
  readonly name = 'physical_therapy_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate physical_therapy_cost_calculatorCalculator values';

  calculate(inputs: physical_therapy_cost_calculatorCalculatorInputs): physical_therapy_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: physical_therapy_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: physical_therapy_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
