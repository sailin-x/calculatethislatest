import { Calculator } from '../../engines/CalculatorEngine';
import { timberlandInvestmentCalculatorInputs, timberlandInvestmentCalculatorResults, timberlandInvestmentCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class timberlandInvestmentCalculatorCalculator implements Calculator<timberlandInvestmentCalculatorInputs, timberlandInvestmentCalculatorResults> {
  readonly id = 'timberlandInvestmentCalculator';
  readonly name = 'timberlandInvestmentCalculator Calculator';
  readonly description = 'Calculate timberlandInvestmentCalculator values';

  calculate(inputs: timberlandInvestmentCalculatorInputs): timberlandInvestmentCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: timberlandInvestmentCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: timberlandInvestmentCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
