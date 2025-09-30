import { Calculator } from '../../engines/CalculatorEngine';
import { tokenomics_simulation_calculatorCalculatorInputs, tokenomics_simulation_calculatorCalculatorResults, tokenomics_simulation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class tokenomics_simulation_calculatorCalculatorCalculator implements Calculator<tokenomics_simulation_calculatorCalculatorInputs, tokenomics_simulation_calculatorCalculatorResults> {
  readonly id = 'tokenomics_simulation_calculatorCalculator';
  readonly name = 'tokenomics_simulation_calculatorCalculator Calculator';
  readonly description = 'Calculate tokenomics_simulation_calculatorCalculator values';

  calculate(inputs: tokenomics_simulation_calculatorCalculatorInputs): tokenomics_simulation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: tokenomics_simulation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: tokenomics_simulation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
