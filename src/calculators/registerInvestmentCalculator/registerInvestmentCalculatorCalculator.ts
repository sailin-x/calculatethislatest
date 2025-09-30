import { Calculator } from '../../engines/CalculatorEngine';
import { registerInvestmentCalculatorInputs, registerInvestmentCalculatorResults, registerInvestmentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerInvestmentCalculatorCalculator implements Calculator<registerInvestmentCalculatorInputs, registerInvestmentCalculatorResults> {
  readonly id = 'registerInvestmentCalculator';
  readonly name = 'registerInvestmentCalculator Calculator';
  readonly description = 'Calculate registerInvestmentCalculator values';

  calculate(inputs: registerInvestmentCalculatorInputs): registerInvestmentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerInvestmentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerInvestmentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
