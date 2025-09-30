import { Calculator } from '../../engines/CalculatorEngine';
import { supply_chain_bullwhip_effect_calculatorCalculatorInputs, supply_chain_bullwhip_effect_calculatorCalculatorResults, supply_chain_bullwhip_effect_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class supply_chain_bullwhip_effect_calculatorCalculatorCalculator implements Calculator<supply_chain_bullwhip_effect_calculatorCalculatorInputs, supply_chain_bullwhip_effect_calculatorCalculatorResults> {
  readonly id = 'supply_chain_bullwhip_effect_calculatorCalculator';
  readonly name = 'supply_chain_bullwhip_effect_calculatorCalculator Calculator';
  readonly description = 'Calculate supply_chain_bullwhip_effect_calculatorCalculator values';

  calculate(inputs: supply_chain_bullwhip_effect_calculatorCalculatorInputs): supply_chain_bullwhip_effect_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: supply_chain_bullwhip_effect_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: supply_chain_bullwhip_effect_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
