import { Calculator } from '../../engines/CalculatorEngine';
import { home_improvement_calculatorCalculatorInputs, home_improvement_calculatorCalculatorResults, home_improvement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class home_improvement_calculatorCalculatorCalculator implements Calculator<home_improvement_calculatorCalculatorInputs, home_improvement_calculatorCalculatorResults> {
  readonly id = 'home_improvement_calculatorCalculator';
  readonly name = 'home_improvement_calculatorCalculator Calculator';
  readonly description = 'Calculate home_improvement_calculatorCalculator values';

  calculate(inputs: home_improvement_calculatorCalculatorInputs): home_improvement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: home_improvement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: home_improvement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
