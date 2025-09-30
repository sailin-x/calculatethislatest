import { Calculator } from '../../engines/CalculatorEngine';
import { blockchain_gas_fee_calculatorCalculatorInputs, blockchain_gas_fee_calculatorCalculatorResults, blockchain_gas_fee_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class blockchain_gas_fee_calculatorCalculatorCalculator implements Calculator<blockchain_gas_fee_calculatorCalculatorInputs, blockchain_gas_fee_calculatorCalculatorResults> {
  readonly id = 'blockchain_gas_fee_calculatorCalculator';
  readonly name = 'blockchain_gas_fee_calculatorCalculator Calculator';
  readonly description = 'Calculate blockchain_gas_fee_calculatorCalculator values';

  calculate(inputs: blockchain_gas_fee_calculatorCalculatorInputs): blockchain_gas_fee_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: blockchain_gas_fee_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: blockchain_gas_fee_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
