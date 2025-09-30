import { Calculator } from '../../engines/CalculatorEngine';
import { gas_cost_calculatorCalculatorInputs, gas_cost_calculatorCalculatorResults, gas_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class gas_cost_calculatorCalculatorCalculator implements Calculator<gas_cost_calculatorCalculatorInputs, gas_cost_calculatorCalculatorResults> {
  readonly id = 'gas_cost_calculatorCalculator';
  readonly name = 'gas_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate gas_cost_calculatorCalculator values';

  calculate(inputs: gas_cost_calculatorCalculatorInputs): gas_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: gas_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: gas_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
