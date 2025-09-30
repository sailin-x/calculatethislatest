import { Calculator } from '../../engines/CalculatorEngine';
import { registerTimberlandInvestmentCalculatorInputs, registerTimberlandInvestmentCalculatorResults, registerTimberlandInvestmentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerTimberlandInvestmentCalculatorCalculator implements Calculator<registerTimberlandInvestmentCalculatorInputs, registerTimberlandInvestmentCalculatorResults> {
  readonly id = 'registerTimberlandInvestmentCalculator';
  readonly name = 'registerTimberlandInvestmentCalculator Calculator';
  readonly description = 'Calculate registerTimberlandInvestmentCalculator values';

  calculate(inputs: registerTimberlandInvestmentCalculatorInputs): registerTimberlandInvestmentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerTimberlandInvestmentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerTimberlandInvestmentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
