import { Calculator } from '../../engines/CalculatorEngine';
import { addiction_rehab_cost_financing_calculatorCalculatorInputs, addiction_rehab_cost_financing_calculatorCalculatorResults, addiction_rehab_cost_financing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class addiction_rehab_cost_financing_calculatorCalculatorCalculator implements Calculator<addiction_rehab_cost_financing_calculatorCalculatorInputs, addiction_rehab_cost_financing_calculatorCalculatorResults> {
  readonly id = 'addiction_rehab_cost_financing_calculatorCalculator';
  readonly name = 'addiction_rehab_cost_financing_calculatorCalculator Calculator';
  readonly description = 'Calculate addiction_rehab_cost_financing_calculatorCalculator values';

  calculate(inputs: addiction_rehab_cost_financing_calculatorCalculatorInputs): addiction_rehab_cost_financing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: addiction_rehab_cost_financing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: addiction_rehab_cost_financing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
