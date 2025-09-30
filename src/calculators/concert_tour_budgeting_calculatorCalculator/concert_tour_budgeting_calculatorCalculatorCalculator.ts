import { Calculator } from '../../engines/CalculatorEngine';
import { concert_tour_budgeting_calculatorCalculatorInputs, concert_tour_budgeting_calculatorCalculatorResults, concert_tour_budgeting_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class concert_tour_budgeting_calculatorCalculatorCalculator implements Calculator<concert_tour_budgeting_calculatorCalculatorInputs, concert_tour_budgeting_calculatorCalculatorResults> {
  readonly id = 'concert_tour_budgeting_calculatorCalculator';
  readonly name = 'concert_tour_budgeting_calculatorCalculator Calculator';
  readonly description = 'Calculate concert_tour_budgeting_calculatorCalculator values';

  calculate(inputs: concert_tour_budgeting_calculatorCalculatorInputs): concert_tour_budgeting_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: concert_tour_budgeting_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: concert_tour_budgeting_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
