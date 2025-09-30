import { Calculator } from '../../engines/CalculatorEngine';
import { real_estate_investmentCalculatorInputs, real_estate_investmentCalculatorResults, real_estate_investmentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class real_estate_investmentCalculatorCalculator implements Calculator<real_estate_investmentCalculatorInputs, real_estate_investmentCalculatorResults> {
  readonly id = 'real_estate_investmentCalculator';
  readonly name = 'real_estate_investmentCalculator Calculator';
  readonly description = 'Calculate real_estate_investmentCalculator values';

  calculate(inputs: real_estate_investmentCalculatorInputs): real_estate_investmentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: real_estate_investmentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: real_estate_investmentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
