import { Calculator } from '../../engines/CalculatorEngine';
import { souvenir_cost_calculatorCalculatorInputs, souvenir_cost_calculatorCalculatorResults, souvenir_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class souvenir_cost_calculatorCalculatorCalculator implements Calculator<souvenir_cost_calculatorCalculatorInputs, souvenir_cost_calculatorCalculatorResults> {
  readonly id = 'souvenir_cost_calculatorCalculator';
  readonly name = 'souvenir_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate souvenir_cost_calculatorCalculator values';

  calculate(inputs: souvenir_cost_calculatorCalculatorInputs): souvenir_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: souvenir_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: souvenir_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
