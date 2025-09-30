import { Calculator } from '../../engines/CalculatorEngine';
import { registerAnnuityBuyoutCalculatorInputs, registerAnnuityBuyoutCalculatorResults, registerAnnuityBuyoutCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerAnnuityBuyoutCalculatorCalculator implements Calculator<registerAnnuityBuyoutCalculatorInputs, registerAnnuityBuyoutCalculatorResults> {
  readonly id = 'registerAnnuityBuyoutCalculator';
  readonly name = 'registerAnnuityBuyoutCalculator Calculator';
  readonly description = 'Calculate registerAnnuityBuyoutCalculator values';

  calculate(inputs: registerAnnuityBuyoutCalculatorInputs): registerAnnuityBuyoutCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerAnnuityBuyoutCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerAnnuityBuyoutCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
