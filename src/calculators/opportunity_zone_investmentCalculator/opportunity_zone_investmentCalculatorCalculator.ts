import { Calculator } from '../../engines/CalculatorEngine';
import { opportunity_zone_investmentCalculatorInputs, opportunity_zone_investmentCalculatorResults, opportunity_zone_investmentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class opportunity_zone_investmentCalculatorCalculator implements Calculator<opportunity_zone_investmentCalculatorInputs, opportunity_zone_investmentCalculatorResults> {
  readonly id = 'opportunity_zone_investmentCalculator';
  readonly name = 'opportunity_zone_investmentCalculator Calculator';
  readonly description = 'Calculate opportunity_zone_investmentCalculator values';

  calculate(inputs: opportunity_zone_investmentCalculatorInputs): opportunity_zone_investmentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: opportunity_zone_investmentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: opportunity_zone_investmentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
