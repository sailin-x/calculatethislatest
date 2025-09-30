import { Calculator } from '../../engines/CalculatorEngine';
import { net_unrealized_appreciation_nua_tax_calculatorCalculatorInputs, net_unrealized_appreciation_nua_tax_calculatorCalculatorResults, net_unrealized_appreciation_nua_tax_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class net_unrealized_appreciation_nua_tax_calculatorCalculatorCalculator implements Calculator<net_unrealized_appreciation_nua_tax_calculatorCalculatorInputs, net_unrealized_appreciation_nua_tax_calculatorCalculatorResults> {
  readonly id = 'net_unrealized_appreciation_nua_tax_calculatorCalculator';
  readonly name = 'net_unrealized_appreciation_nua_tax_calculatorCalculator Calculator';
  readonly description = 'Calculate net_unrealized_appreciation_nua_tax_calculatorCalculator values';

  calculate(inputs: net_unrealized_appreciation_nua_tax_calculatorCalculatorInputs): net_unrealized_appreciation_nua_tax_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: net_unrealized_appreciation_nua_tax_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: net_unrealized_appreciation_nua_tax_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
