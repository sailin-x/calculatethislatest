import { Calculator } from '../../engines/CalculatorEngine';
import { capitalcallscheduleplannerCalculatorInputs, capitalcallscheduleplannerCalculatorOutputs } from './types';
import { calculatecapitalcallscheduleplannerCalculatorResults } from './formulas';
import { validatecapitalcallscheduleplannerCalculatorInputs } from './validation';

export class capitalcallscheduleplannerCalculator implements Calculator<
  capitalcallscheduleplannerCalculatorInputs,
  capitalcallscheduleplannerCalculatorOutputs
> {
  readonly id = 'capital_call_schedule_planner_calculator';
  readonly name = 'capital call schedule planner Calculator';
  readonly description = 'Professional capital call schedule planner calculator with domain-specific functionality';

  calculate(inputs: capitalcallscheduleplannerCalculatorInputs): capitalcallscheduleplannerCalculatorOutputs {
    const validation = validatecapitalcallscheduleplannerCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatecapitalcallscheduleplannerCalculatorResults(inputs);
  }

  validateInputs(inputs: capitalcallscheduleplannerCalculatorInputs): boolean {
    const validation = validatecapitalcallscheduleplannerCalculatorInputs(inputs);
    return validation.isValid;
  }
}
