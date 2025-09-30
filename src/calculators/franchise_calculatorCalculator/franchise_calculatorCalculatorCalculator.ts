import { Calculator } from '../../engines/CalculatorEngine';
import { franchise_calculatorCalculatorInputs, franchise_calculatorCalculatorResults, franchise_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class franchise_calculatorCalculatorCalculator implements Calculator<franchise_calculatorCalculatorInputs, franchise_calculatorCalculatorResults> {
  readonly id = 'franchise_calculatorCalculator';
  readonly name = 'franchise_calculatorCalculator Calculator';
  readonly description = 'Calculate franchise_calculatorCalculator values';

  calculate(inputs: franchise_calculatorCalculatorInputs): franchise_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: franchise_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: franchise_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
