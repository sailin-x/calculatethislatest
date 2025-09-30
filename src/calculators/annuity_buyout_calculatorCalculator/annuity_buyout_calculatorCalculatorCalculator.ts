import { Calculator } from '../../engines/CalculatorEngine';
import { annuity_buyout_calculatorCalculatorInputs, annuity_buyout_calculatorCalculatorResults, annuity_buyout_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class annuity_buyout_calculatorCalculatorCalculator implements Calculator<annuity_buyout_calculatorCalculatorInputs, annuity_buyout_calculatorCalculatorResults> {
  readonly id = 'annuity_buyout_calculatorCalculator';
  readonly name = 'annuity_buyout_calculatorCalculator Calculator';
  readonly description = 'Calculate annuity_buyout_calculatorCalculator values';

  calculate(inputs: annuity_buyout_calculatorCalculatorInputs): annuity_buyout_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: annuity_buyout_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: annuity_buyout_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
