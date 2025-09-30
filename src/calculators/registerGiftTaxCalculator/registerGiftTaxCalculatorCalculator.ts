import { Calculator } from '../../engines/CalculatorEngine';
import { registerGiftTaxCalculatorInputs, registerGiftTaxCalculatorResults, registerGiftTaxCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerGiftTaxCalculatorCalculator implements Calculator<registerGiftTaxCalculatorInputs, registerGiftTaxCalculatorResults> {
  readonly id = 'registerGiftTaxCalculator';
  readonly name = 'registerGiftTaxCalculator Calculator';
  readonly description = 'Calculate registerGiftTaxCalculator values';

  calculate(inputs: registerGiftTaxCalculatorInputs): registerGiftTaxCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerGiftTaxCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerGiftTaxCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
