import { Calculator } from '../../engines/CalculatorEngine';
import { martial_arts_cost_calculatorCalculatorInputs, martial_arts_cost_calculatorCalculatorResults, martial_arts_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class martial_arts_cost_calculatorCalculatorCalculator implements Calculator<martial_arts_cost_calculatorCalculatorInputs, martial_arts_cost_calculatorCalculatorResults> {
  readonly id = 'martial_arts_cost_calculatorCalculator';
  readonly name = 'martial_arts_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate martial_arts_cost_calculatorCalculator values';

  calculate(inputs: martial_arts_cost_calculatorCalculatorInputs): martial_arts_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: martial_arts_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: martial_arts_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
