import { Calculator } from '../../engines/CalculatorEngine';
import { carpet_cleaning_cost_calculatorCalculatorInputs, carpet_cleaning_cost_calculatorCalculatorResults, carpet_cleaning_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class carpet_cleaning_cost_calculatorCalculatorCalculator implements Calculator<carpet_cleaning_cost_calculatorCalculatorInputs, carpet_cleaning_cost_calculatorCalculatorResults> {
  readonly id = 'carpet_cleaning_cost_calculatorCalculator';
  readonly name = 'carpet_cleaning_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate carpet_cleaning_cost_calculatorCalculator values';

  calculate(inputs: carpet_cleaning_cost_calculatorCalculatorInputs): carpet_cleaning_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: carpet_cleaning_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: carpet_cleaning_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
