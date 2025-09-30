import { Calculator } from '../../engines/CalculatorEngine';
import { concrete_calculatorCalculatorInputs, concrete_calculatorCalculatorResults, concrete_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class concrete_calculatorCalculatorCalculator implements Calculator<concrete_calculatorCalculatorInputs, concrete_calculatorCalculatorResults> {
  readonly id = 'concrete_calculatorCalculator';
  readonly name = 'concrete_calculatorCalculator Calculator';
  readonly description = 'Calculate concrete_calculatorCalculator values';

  calculate(inputs: concrete_calculatorCalculatorInputs): concrete_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: concrete_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: concrete_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
