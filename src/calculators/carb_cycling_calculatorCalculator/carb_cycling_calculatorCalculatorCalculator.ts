import { Calculator } from '../../engines/CalculatorEngine';
import { carb_cycling_calculatorCalculatorInputs, carb_cycling_calculatorCalculatorResults, carb_cycling_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class carb_cycling_calculatorCalculatorCalculator implements Calculator<carb_cycling_calculatorCalculatorInputs, carb_cycling_calculatorCalculatorResults> {
  readonly id = 'carb_cycling_calculatorCalculator';
  readonly name = 'carb_cycling_calculatorCalculator Calculator';
  readonly description = 'Calculate carb_cycling_calculatorCalculator values';

  calculate(inputs: carb_cycling_calculatorCalculatorInputs): carb_cycling_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: carb_cycling_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: carb_cycling_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
