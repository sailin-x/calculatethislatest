import { Calculator } from '../../engines/CalculatorEngine';
import { pressure_washing_cost_calculatorCalculatorInputs, pressure_washing_cost_calculatorCalculatorResults, pressure_washing_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pressure_washing_cost_calculatorCalculatorCalculator implements Calculator<pressure_washing_cost_calculatorCalculatorInputs, pressure_washing_cost_calculatorCalculatorResults> {
  readonly id = 'pressure_washing_cost_calculatorCalculator';
  readonly name = 'pressure_washing_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate pressure_washing_cost_calculatorCalculator values';

  calculate(inputs: pressure_washing_cost_calculatorCalculatorInputs): pressure_washing_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pressure_washing_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pressure_washing_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
