import { Calculator } from '../../engines/CalculatorEngine';
import { massage_therapy_cost_calculatorCalculatorInputs, massage_therapy_cost_calculatorCalculatorResults, massage_therapy_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class massage_therapy_cost_calculatorCalculatorCalculator implements Calculator<massage_therapy_cost_calculatorCalculatorInputs, massage_therapy_cost_calculatorCalculatorResults> {
  readonly id = 'massage_therapy_cost_calculatorCalculator';
  readonly name = 'massage_therapy_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate massage_therapy_cost_calculatorCalculator values';

  calculate(inputs: massage_therapy_cost_calculatorCalculatorInputs): massage_therapy_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: massage_therapy_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: massage_therapy_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
