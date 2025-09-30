import { Calculator } from '../../engines/CalculatorEngine';
import { retirement_abroad_calculatorCalculatorInputs, retirement_abroad_calculatorCalculatorResults, retirement_abroad_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class retirement_abroad_calculatorCalculatorCalculator implements Calculator<retirement_abroad_calculatorCalculatorInputs, retirement_abroad_calculatorCalculatorResults> {
  readonly id = 'retirement_abroad_calculatorCalculator';
  readonly name = 'retirement_abroad_calculatorCalculator Calculator';
  readonly description = 'Calculate retirement_abroad_calculatorCalculator values';

  calculate(inputs: retirement_abroad_calculatorCalculatorInputs): retirement_abroad_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: retirement_abroad_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: retirement_abroad_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
