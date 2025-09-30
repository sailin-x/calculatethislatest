import { Calculator } from '../../engines/CalculatorEngine';
import { dash_diet_calculatorCalculatorInputs, dash_diet_calculatorCalculatorResults, dash_diet_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class dash_diet_calculatorCalculatorCalculator implements Calculator<dash_diet_calculatorCalculatorInputs, dash_diet_calculatorCalculatorResults> {
  readonly id = 'dash_diet_calculatorCalculator';
  readonly name = 'dash_diet_calculatorCalculator Calculator';
  readonly description = 'Calculate dash_diet_calculatorCalculator values';

  calculate(inputs: dash_diet_calculatorCalculatorInputs): dash_diet_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: dash_diet_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: dash_diet_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
