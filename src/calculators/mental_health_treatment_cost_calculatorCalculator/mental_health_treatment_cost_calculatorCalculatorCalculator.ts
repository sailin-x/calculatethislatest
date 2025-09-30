import { Calculator } from '../../engines/CalculatorEngine';
import { mental_health_treatment_cost_calculatorCalculatorInputs, mental_health_treatment_cost_calculatorCalculatorResults, mental_health_treatment_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mental_health_treatment_cost_calculatorCalculatorCalculator implements Calculator<mental_health_treatment_cost_calculatorCalculatorInputs, mental_health_treatment_cost_calculatorCalculatorResults> {
  readonly id = 'mental_health_treatment_cost_calculatorCalculator';
  readonly name = 'mental_health_treatment_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate mental_health_treatment_cost_calculatorCalculator values';

  calculate(inputs: mental_health_treatment_cost_calculatorCalculatorInputs): mental_health_treatment_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mental_health_treatment_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mental_health_treatment_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
