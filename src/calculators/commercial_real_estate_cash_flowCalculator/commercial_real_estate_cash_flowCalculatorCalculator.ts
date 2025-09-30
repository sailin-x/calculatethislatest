import { Calculator } from '../../engines/CalculatorEngine';
import { commercial_real_estate_cash_flowCalculatorInputs, commercial_real_estate_cash_flowCalculatorResults, commercial_real_estate_cash_flowCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class commercial_real_estate_cash_flowCalculatorCalculator implements Calculator<commercial_real_estate_cash_flowCalculatorInputs, commercial_real_estate_cash_flowCalculatorResults> {
  readonly id = 'commercial_real_estate_cash_flowCalculator';
  readonly name = 'commercial_real_estate_cash_flowCalculator Calculator';
  readonly description = 'Calculate commercial_real_estate_cash_flowCalculator values';

  calculate(inputs: commercial_real_estate_cash_flowCalculatorInputs): commercial_real_estate_cash_flowCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: commercial_real_estate_cash_flowCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: commercial_real_estate_cash_flowCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
