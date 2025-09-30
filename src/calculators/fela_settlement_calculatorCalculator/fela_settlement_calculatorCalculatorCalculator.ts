import { Calculator } from '../../engines/CalculatorEngine';
import { fela_settlement_calculatorCalculatorInputs, fela_settlement_calculatorCalculatorResults, fela_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fela_settlement_calculatorCalculatorCalculator implements Calculator<fela_settlement_calculatorCalculatorInputs, fela_settlement_calculatorCalculatorResults> {
  readonly id = 'fela_settlement_calculatorCalculator';
  readonly name = 'fela_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate fela_settlement_calculatorCalculator values';

  calculate(inputs: fela_settlement_calculatorCalculatorInputs): fela_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fela_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fela_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
