import { Calculator } from '../../engines/CalculatorEngine';
import { estate_planning_calculatorCalculatorInputs, estate_planning_calculatorCalculatorResults, estate_planning_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class estate_planning_calculatorCalculatorCalculator implements Calculator<estate_planning_calculatorCalculatorInputs, estate_planning_calculatorCalculatorResults> {
  readonly id = 'estate_planning_calculatorCalculator';
  readonly name = 'estate_planning_calculatorCalculator Calculator';
  readonly description = 'Calculate estate_planning_calculatorCalculator values';

  calculate(inputs: estate_planning_calculatorCalculatorInputs): estate_planning_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: estate_planning_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: estate_planning_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
