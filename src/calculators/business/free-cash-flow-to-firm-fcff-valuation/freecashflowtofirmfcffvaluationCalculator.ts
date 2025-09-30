import { Calculator } from '../../engines/CalculatorEngine';
import { freecashflowtofirmfcffvaluationCalculatorInputs, freecashflowtofirmfcffvaluationCalculatorOutputs } from './types';
import { calculatefreecashflowtofirmfcffvaluationCalculatorResults } from './formulas';
import { validatefreecashflowtofirmfcffvaluationCalculatorInputs } from './validation';

export class freecashflowtofirmfcffvaluationCalculator implements Calculator<
  freecashflowtofirmfcffvaluationCalculatorInputs,
  freecashflowtofirmfcffvaluationCalculatorOutputs
> {
  readonly id = 'free_cash_flow_to_firm_fcff_valuation_calculator';
  readonly name = 'free cash flow to firm fcff valuation Calculator';
  readonly description = 'Professional free cash flow to firm fcff valuation calculator with domain-specific functionality';

  calculate(inputs: freecashflowtofirmfcffvaluationCalculatorInputs): freecashflowtofirmfcffvaluationCalculatorOutputs {
    const validation = validatefreecashflowtofirmfcffvaluationCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatefreecashflowtofirmfcffvaluationCalculatorResults(inputs);
  }

  validateInputs(inputs: freecashflowtofirmfcffvaluationCalculatorInputs): boolean {
    const validation = validatefreecashflowtofirmfcffvaluationCalculatorInputs(inputs);
    return validation.isValid;
  }
}
