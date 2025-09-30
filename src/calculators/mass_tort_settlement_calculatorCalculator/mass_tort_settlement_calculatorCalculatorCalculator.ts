import { Calculator } from '../../engines/CalculatorEngine';
import { mass_tort_settlement_calculatorCalculatorInputs, mass_tort_settlement_calculatorCalculatorResults, mass_tort_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mass_tort_settlement_calculatorCalculatorCalculator implements Calculator<mass_tort_settlement_calculatorCalculatorInputs, mass_tort_settlement_calculatorCalculatorResults> {
  readonly id = 'mass_tort_settlement_calculatorCalculator';
  readonly name = 'mass_tort_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate mass_tort_settlement_calculatorCalculator values';

  calculate(inputs: mass_tort_settlement_calculatorCalculatorInputs): mass_tort_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mass_tort_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mass_tort_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
