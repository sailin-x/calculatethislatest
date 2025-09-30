import { Calculator } from '../../engines/CalculatorEngine';
import { freecashflowtoequityfcfevaluationCalculatorInputs, freecashflowtoequityfcfevaluationCalculatorOutputs } from './types';
import { calculatefreecashflowtoequityfcfevaluationCalculatorResults } from './formulas';
import { validatefreecashflowtoequityfcfevaluationCalculatorInputs } from './validation';

export class freecashflowtoequityfcfevaluationCalculator implements Calculator<
  freecashflowtoequityfcfevaluationCalculatorInputs,
  freecashflowtoequityfcfevaluationCalculatorOutputs
> {
  readonly id = 'free_cash_flow_to_equity_fcfe_valuation_calculator';
  readonly name = 'free cash flow to equity fcfe valuation Calculator';
  readonly description = 'Professional free cash flow to equity fcfe valuation calculator with domain-specific functionality';

  calculate(inputs: freecashflowtoequityfcfevaluationCalculatorInputs): freecashflowtoequityfcfevaluationCalculatorOutputs {
    const validation = validatefreecashflowtoequityfcfevaluationCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatefreecashflowtoequityfcfevaluationCalculatorResults(inputs);
  }

  validateInputs(inputs: freecashflowtoequityfcfevaluationCalculatorInputs): boolean {
    const validation = validatefreecashflowtoequityfcfevaluationCalculatorInputs(inputs);
    return validation.isValid;
  }
}
