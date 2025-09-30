import { Calculator } from '../../engines/CalculatorEngine';
import { crypto_tax_harvesting_calculatorCalculatorInputs, crypto_tax_harvesting_calculatorCalculatorResults, crypto_tax_harvesting_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class crypto_tax_harvesting_calculatorCalculatorCalculator implements Calculator<crypto_tax_harvesting_calculatorCalculatorInputs, crypto_tax_harvesting_calculatorCalculatorResults> {
  readonly id = 'crypto_tax_harvesting_calculatorCalculator';
  readonly name = 'crypto_tax_harvesting_calculatorCalculator Calculator';
  readonly description = 'Calculate crypto_tax_harvesting_calculatorCalculator values';

  calculate(inputs: crypto_tax_harvesting_calculatorCalculatorInputs): crypto_tax_harvesting_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: crypto_tax_harvesting_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: crypto_tax_harvesting_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
