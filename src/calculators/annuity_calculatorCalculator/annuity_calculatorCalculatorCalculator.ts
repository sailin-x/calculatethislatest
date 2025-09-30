import { Calculator } from '../../engines/CalculatorEngine';
import { annuity_calculatorCalculatorInputs, annuity_calculatorCalculatorResults, annuity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class annuity_calculatorCalculatorCalculator implements Calculator<annuity_calculatorCalculatorInputs, annuity_calculatorCalculatorResults> {
  readonly id = 'annuity_calculatorCalculator';
  readonly name = 'annuity_calculatorCalculator Calculator';
  readonly description = 'Calculate annuity_calculatorCalculator values';

  calculate(inputs: annuity_calculatorCalculatorInputs): annuity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: annuity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: annuity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
