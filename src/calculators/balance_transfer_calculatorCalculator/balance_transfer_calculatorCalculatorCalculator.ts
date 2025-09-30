import { Calculator } from '../../engines/CalculatorEngine';
import { balance_transfer_calculatorCalculatorInputs, balance_transfer_calculatorCalculatorResults, balance_transfer_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class balance_transfer_calculatorCalculatorCalculator implements Calculator<balance_transfer_calculatorCalculatorInputs, balance_transfer_calculatorCalculatorResults> {
  readonly id = 'balance_transfer_calculatorCalculator';
  readonly name = 'balance_transfer_calculatorCalculator Calculator';
  readonly description = 'Calculate balance_transfer_calculatorCalculator values';

  calculate(inputs: balance_transfer_calculatorCalculatorInputs): balance_transfer_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: balance_transfer_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: balance_transfer_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
