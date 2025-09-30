import { Calculator } from '../../engines/CalculatorEngine';
import { gas_fee_optimizer_calculatorCalculatorInputs, gas_fee_optimizer_calculatorCalculatorResults, gas_fee_optimizer_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class gas_fee_optimizer_calculatorCalculatorCalculator implements Calculator<gas_fee_optimizer_calculatorCalculatorInputs, gas_fee_optimizer_calculatorCalculatorResults> {
  readonly id = 'gas_fee_optimizer_calculatorCalculator';
  readonly name = 'gas_fee_optimizer_calculatorCalculator Calculator';
  readonly description = 'Calculate gas_fee_optimizer_calculatorCalculator values';

  calculate(inputs: gas_fee_optimizer_calculatorCalculatorInputs): gas_fee_optimizer_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: gas_fee_optimizer_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: gas_fee_optimizer_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
