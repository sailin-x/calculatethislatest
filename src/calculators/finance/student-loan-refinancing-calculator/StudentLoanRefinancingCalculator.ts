import { Calculator } from '../../engines/CalculatorEngine';
import { studentloanrefinancingcalculatorInputs, studentloanrefinancingcalculatorOutputs } from './types';
import { calculatestudentloanrefinancingcalculatorResults } from './formulas';
import { validatestudentloanrefinancingcalculatorInputs } from './validation';

export class studentloanrefinancingcalculator implements Calculator<
  studentloanrefinancingcalculatorInputs,
  studentloanrefinancingcalculatorOutputs
> {
  readonly id = 'student_loan_refinancing_calculator_calculator';
  readonly name = 'student loan refinancing calculator Calculator';
  readonly description = 'Professional student loan refinancing calculator calculator with domain-specific functionality';

  calculate(inputs: studentloanrefinancingcalculatorInputs): studentloanrefinancingcalculatorOutputs {
    const validation = validatestudentloanrefinancingcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestudentloanrefinancingcalculatorResults(inputs);
  }

  validateInputs(inputs: studentloanrefinancingcalculatorInputs): boolean {
    const validation = validatestudentloanrefinancingcalculatorInputs(inputs);
    return validation.isValid;
  }
}
