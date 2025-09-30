import { Calculator } from '../../engines/CalculatorEngine';
import { contract_breach_calculatorCalculatorInputs, contract_breach_calculatorCalculatorResults, contract_breach_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class contract_breach_calculatorCalculatorCalculator implements Calculator<contract_breach_calculatorCalculatorInputs, contract_breach_calculatorCalculatorResults> {
  readonly id = 'contract_breach_calculatorCalculator';
  readonly name = 'contract_breach_calculatorCalculator Calculator';
  readonly description = 'Calculate contract_breach_calculatorCalculator values';

  calculate(inputs: contract_breach_calculatorCalculatorInputs): contract_breach_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: contract_breach_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: contract_breach_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
