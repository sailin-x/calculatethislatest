import { RequiredBeginningDateRMDInputs, RequiredBeginningDateRMDOutputs } from './types';

// Required Beginning Date (RBD) calculation based on IRS rules
export function calculateRequiredBeginningDate(inputs: RequiredBeginningDateRMDInputs): RequiredBeginningDateRMDOutputs {
  const currentYear = new Date().getFullYear();
  let rbdYear: number;
  let ageAtRBD: number;

  // Determine RBD based on account type and birth year
  if (inputs.accountType === 'roth_ira') {
    // Roth IRAs have no RBD - distributions are not required during lifetime
    return {
      requiredBeginningDate: 'No RBD - Lifetime distributions not required',
      ageAtRBD: 0,
      yearsUntilRBD: 0,
      rbdExplanation: 'Roth IRA owners are not required to take distributions during their lifetime. Beneficiaries may be subject to RMD rules.'
    };
  }

  // For traditional IRAs, 401(k)s, SEP IRAs, and SIMPLE IRAs
  // RBD is April 1 of the year following the year the individual reaches age 72 (or 70½ if born before 1951)
  const birthYear = inputs.birthYear;

  // SECURE Act 2.0 changed RBD from 70½ to 72 for those born after 1950
  if (birthYear >= 1951) {
    // Age 72 RBD
    ageAtRBD = 72;
    rbdYear = birthYear + 72;
  } else {
    // Age 70½ RBD for those born 1950 or earlier
    ageAtRBD = 70.5;
    rbdYear = birthYear + 71; // Since 70½ means they turn 70 in the year they are 70, RBD is April 1 following 70th birthday
  }

  // Check for spouse beneficiary rule
  if (inputs.isSpouseBeneficialOwner && inputs.spouseBirthYear) {
    const spouseRBDYear = inputs.spouseBirthYear >= 1951 ?
      inputs.spouseBirthYear + 72 :
      inputs.spouseBirthYear + 71;

    // Use the later RBD if spouse is more than 10 years younger
    if (inputs.spouseBirthYear > birthYear + 10) {
      rbdYear = Math.max(rbdYear, spouseRBDYear);
      ageAtRBD = rbdYear - birthYear;
    }
  }

  const requiredBeginningDate = `April 1, ${rbdYear}`;
  const yearsUntilRBD = Math.max(0, rbdYear - currentYear);

  let rbdExplanation = '';
  if (birthYear >= 1951) {
    rbdExplanation = `RBD is April 1 of the year following the year you reach age 72 (SECURE Act 2.0).`;
  } else {
    rbdExplanation = `RBD is April 1 of the year following the year you reach age 70½ (pre-SECURE Act rules).`;
  }

  if (inputs.isSpouseBeneficialOwner && inputs.spouseBirthYear && inputs.spouseBirthYear > birthYear + 10) {
    rbdExplanation += ` Spouse beneficiary rule applied - using later RBD.`;
  }

  return {
    requiredBeginningDate,
    ageAtRBD,
    yearsUntilRBD,
    rbdExplanation
  };
}

export function calculateResult(inputs: RequiredBeginningDateRMDInputs): string {
  const result = calculateRequiredBeginningDate(inputs);
  return result.requiredBeginningDate;
}