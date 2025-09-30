import { Calculator } from '../../engines/CalculatorEngine';
import { drywall_calculatorCalculatorInputs, drywall_calculatorCalculatorResults, drywall_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class drywall_calculatorCalculatorCalculator implements Calculator<drywall_calculatorCalculatorInputs, drywall_calculatorCalculatorResults> {
  readonly id = 'drywall_calculatorCalculator';
  readonly name = 'drywall_calculatorCalculator Calculator';
  readonly description = 'Calculate drywall_calculatorCalculator values';

  calculate(inputs: drywall_calculatorCalculatorInputs): drywall_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: drywall_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: drywall_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
