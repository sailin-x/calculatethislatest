import { Calculator } from '../../engines/CalculatorEngine';
import { annuityBuyoutCalculatorInputs, annuityBuyoutCalculatorResults, annuityBuyoutCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class annuityBuyoutCalculatorCalculator implements Calculator<annuityBuyoutCalculatorInputs, annuityBuyoutCalculatorResults> {
  readonly id = 'annuityBuyoutCalculator';
  readonly name = 'annuityBuyoutCalculator Calculator';
  readonly description = 'Calculate annuityBuyoutCalculator values';

  calculate(inputs: annuityBuyoutCalculatorInputs): annuityBuyoutCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: annuityBuyoutCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: annuityBuyoutCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
