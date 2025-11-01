import { Calculator } from '../../engines/CalculatorEngine';
import { studentloanrepaymentcalculatorInputs, studentloanrepaymentcalculatorOutputs } from './types';
import { calculatestudentloanrepaymentcalculatorResults } from './formulas';
import { validatestudentloanrepaymentcalculatorInputs } from './validation';

export class studentloanrepaymentcalculator implements Calculator<
  studentloanrepaymentcalculatorInputs,
  studentloanrepaymentcalculatorOutputs
> {
  readonly id = 'student_loan_repayment_calculator_calculator';
  readonly name = 'student loan repayment calculator Calculator';
  readonly description = 'Professional student loan repayment calculator calculator with domain-specific functionality';

  calculate(inputs: studentloanrepaymentcalculatorInputs): studentloanrepaymentcalculatorOutputs {
    const validation = validatestudentloanrepaymentcalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestudentloanrepaymentcalculatorResults(inputs);
  }

  validateInputs(inputs: studentloanrepaymentcalculatorInputs): boolean {
    const validation = validatestudentloanrepaymentcalculatorInputs(inputs);
    return validation.isValid;
  }
}
