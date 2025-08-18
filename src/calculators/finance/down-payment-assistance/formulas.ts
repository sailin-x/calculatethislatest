import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Calculate monthly mortgage payment
function calculateMonthlyPayment(loanAmount: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / totalPayments;
  }
  
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
         (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

// Calculate debt-to-income ratio
function calculateDTI(monthlyDebt: number, monthlyPayment: number, annualIncome: number): number {
  const monthlyIncome = annualIncome / 12;
  return ((monthlyDebt + monthlyPayment) / monthlyIncome) * 100;
}

// Calculate loan-to-value ratio
function calculateLTV(loanAmount: number, homePrice: number): number {
  return (loanAmount / homePrice) * 100;
}

// Get available programs based on criteria
function getAvailablePrograms(inputs: CalculatorInputs): {
  programs: string[];
  grants: number;
  forgivableLoans: number;
  deferredLoans: number;
} {
  const {
    location, firstTimeBuyer, veteranStatus, ruralArea, targetArea,
    annualIncome, householdSize, creditScore, propertyType, occupancyType
  } = inputs;
  
  const programs: string[] = [];
  let grants = 0;
  let forgivableLoans = 0;
  let deferredLoans = 0;
  
  // FHA Programs
  if (creditScore >= 580) {
    programs.push('FHA Loan (3.5% down)');
    if (firstTimeBuyer === 'yes') {
      programs.push('FHA First-Time Homebuyer Program');
    }
  }
  
  // VA Programs
  if (veteranStatus !== 'none') {
    programs.push('VA Loan (0% down)');
    grants += 5000; // VA funding fee assistance
  }
  
  // USDA Programs
  if (ruralArea === 'yes' && annualIncome <= 80000) {
    programs.push('USDA Rural Development Loan');
    deferredLoans += 10000;
  }
  
  // State-specific programs
  switch (location) {
    case 'CA':
      if (firstTimeBuyer === 'yes' && annualIncome <= 100000) {
        programs.push('CalHFA First-Time Homebuyer Program');
        grants += 15000;
        forgivableLoans += 20000;
      }
      break;
    case 'TX':
      if (firstTimeBuyer === 'yes') {
        programs.push('Texas Department of Housing and Community Affairs');
        grants += 10000;
        deferredLoans += 15000;
      }
      break;
    case 'FL':
      if (firstTimeBuyer === 'yes') {
        programs.push('Florida Housing Finance Corporation');
        grants += 12000;
        forgivableLoans += 18000;
      }
      break;
    case 'NY':
      if (firstTimeBuyer === 'yes' && annualIncome <= 90000) {
        programs.push('SonyMA First-Time Homebuyer Program');
        grants += 15000;
        deferredLoans += 25000;
      }
      break;
    case 'NC':
      if (firstTimeBuyer === 'yes') {
        programs.push('NC Housing Finance Agency');
        grants += 8000;
        forgivableLoans += 12000;
      }
      break;
    default:
      // Generic state programs
      if (firstTimeBuyer === 'yes') {
        programs.push('State First-Time Homebuyer Program');
        grants += 5000;
        deferredLoans += 10000;
      }
  }
  
  // Federal programs
  if (firstTimeBuyer === 'yes') {
    programs.push('FHA First-Time Homebuyer Program');
    programs.push('Good Neighbor Next Door Program');
    if (targetArea === 'yes') {
      grants += 8000;
    }
  }
  
  // Income-based programs
  if (annualIncome <= 60000) {
    programs.push('Low-Income Homebuyer Assistance');
    grants += 5000;
  }
  
  // Credit-based programs
  if (creditScore >= 700) {
    programs.push('Prime Borrower Programs');
    forgivableLoans += 5000;
  }
  
  return { programs, grants, forgivableLoans, deferredLoans };
}

// Calculate eligibility score
function calculateEligibilityScore(inputs: CalculatorInputs): number {
  const {
    creditScore, annualIncome, householdSize, firstTimeBuyer,
    veteranStatus, ruralArea, targetArea, location
  } = inputs;
  
  let score = 0;
  
  // Credit score factor (0-25 points)
  if (creditScore >= 750) score += 25;
  else if (creditScore >= 700) score += 20;
  else if (creditScore >= 650) score += 15;
  else if (creditScore >= 600) score += 10;
  else if (creditScore >= 580) score += 5;
  
  // Income factor (0-25 points) - lower income gets higher score
  const monthlyIncome = annualIncome / 12;
  if (monthlyIncome <= 4000) score += 25;
  else if (monthlyIncome <= 6000) score += 20;
  else if (monthlyIncome <= 8000) score += 15;
  else if (monthlyIncome <= 10000) score += 10;
  else if (monthlyIncome <= 12000) score += 5;
  
  // Location factor (0-25 points)
  if (targetArea === 'yes') score += 15;
  if (ruralArea === 'yes') score += 10;
  
  // Program factor (0-25 points)
  if (firstTimeBuyer === 'yes') score += 15;
  if (veteranStatus !== 'none') score += 10;
  
  return Math.min(score, 100);
}

// Generate program recommendations
function generateRecommendations(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const { programs } = getAvailablePrograms(inputs);
  const { eligibilityScore, downPaymentGap } = outputs;
  
  let recommendations = 'Based on your profile, here are the recommended programs:\n\n';
  
  if (eligibilityScore >= 80) {
    recommendations += '🌟 **Excellent Eligibility** - You qualify for most programs\n\n';
  } else if (eligibilityScore >= 60) {
    recommendations += '✅ **Good Eligibility** - You qualify for many programs\n\n';
  } else if (eligibilityScore >= 40) {
    recommendations += '⚠️ **Limited Eligibility** - Focus on basic programs\n\n';
  } else {
    recommendations += '❌ **Low Eligibility** - Consider improving credit/income\n\n';
  }
  
  programs.forEach(program => {
    recommendations += `• ${program}\n`;
  });
  
  if (downPaymentGap > 0) {
    recommendations += `\n💰 **Down Payment Gap**: $${downPaymentGap.toLocaleString()}\n`;
    recommendations += 'Consider these options:\n';
    recommendations += '• Apply for multiple assistance programs\n';
    recommendations += '• Look into seller concessions\n';
    recommendations += '• Consider a less expensive home\n';
    recommendations += '• Save additional funds\n';
  }
  
  return recommendations;
}

// Generate application steps
function generateApplicationSteps(inputs: CalculatorInputs): string {
  const { firstTimeBuyer, veteranStatus, ruralArea } = inputs;
  
  let steps = '**Application Process:**\n\n';
  
  steps += '1. **Pre-Approval** - Get mortgage pre-approval from lender\n';
  steps += '2. **Program Research** - Research specific programs in your area\n';
  steps += '3. **Documentation** - Gather required documents:\n';
  steps += '   • Income verification (W-2s, pay stubs)\n';
  steps += '   • Bank statements\n';
  steps += '   • Credit report\n';
  steps += '   • Tax returns\n';
  
  if (firstTimeBuyer === 'yes') {
    steps += '   • First-time homebuyer certification\n';
  }
  
  if (veteranStatus !== 'none') {
    steps += '   • DD-214 or Certificate of Eligibility\n';
  }
  
  if (ruralArea === 'yes') {
    steps += '   • Property location verification\n';
  }
  
  steps += '4. **Application** - Submit applications to programs\n';
  steps += '5. **Approval** - Wait for program approval\n';
  steps += '6. **Closing** - Coordinate with lender and programs\n';
  
  return steps;
}

// Generate timeline
function generateTimeline(inputs: CalculatorInputs): string {
  const { firstTimeBuyer, veteranStatus } = inputs;
  
  let timeline = '**Estimated Timeline:**\n\n';
  
  timeline += '• **Week 1-2**: Research programs and gather documents\n';
  timeline += '• **Week 3-4**: Submit applications\n';
  timeline += '• **Week 5-8**: Program review and approval\n';
  
  if (firstTimeBuyer === 'yes') {
    timeline += '• **Week 9-10**: Complete homebuyer education (if required)\n';
  }
  
  if (veteranStatus !== 'none') {
    timeline += '• **Week 9-10**: VA loan processing\n';
  }
  
  timeline += '• **Week 11-12**: Final approval and closing\n';
  timeline += '\n**Total Time**: 8-12 weeks\n';
  
  return timeline;
}

export function calculateDownPaymentAssistance(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    homePrice, downPaymentPercentage, annualIncome, existingDebt,
    savingsAmount, interestRate, loanTerm
  } = inputs;
  
  // Calculate basic amounts
  const downPaymentRequired = homePrice * (downPaymentPercentage / 100);
  const downPaymentGap = Math.max(0, downPaymentRequired - savingsAmount);
  const loanAmount = homePrice - downPaymentRequired;
  
  // Calculate monthly payment
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
  
  // Calculate ratios
  const debtToIncomeRatio = calculateDTI(existingDebt, monthlyPayment, annualIncome);
  const loanToValueRatio = calculateLTV(loanAmount, homePrice);
  
  // Get available programs
  const { programs, grants, forgivableLoans, deferredLoans } = getAvailablePrograms(inputs);
  const totalAssistance = grants + forgivableLoans + deferredLoans;
  
  // Calculate eligibility score
  const eligibilityScore = calculateEligibilityScore(inputs);
  
  // Generate recommendations and steps
  const programRecommendations = generateRecommendations(inputs, {
    eligibilityScore,
    downPaymentGap,
    availablePrograms: programs.join(', '),
    totalAssistance,
    grantsAvailable: grants,
    forgivableLoans,
    deferredLoans,
    monthlyPayment,
    debtToIncomeRatio,
    loanToValueRatio,
    downPaymentRequired,
    applicationSteps: '',
    timeline: '',
    downPaymentAssistanceAnalysis: ''
  });
  
  const applicationSteps = generateApplicationSteps(inputs);
  const timeline = generateTimeline(inputs);
  
  return {
    downPaymentRequired: Math.round(downPaymentRequired),
    downPaymentGap: Math.round(downPaymentGap),
    availablePrograms: programs.join(', '),
    totalAssistance: Math.round(totalAssistance),
    grantsAvailable: Math.round(grants),
    forgivableLoans: Math.round(forgivableLoans),
    deferredLoans: Math.round(deferredLoans),
    monthlyPayment: Math.round(monthlyPayment),
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 10) / 10,
    loanToValueRatio: Math.round(loanToValueRatio * 10) / 10,
    eligibilityScore: Math.round(eligibilityScore),
    programRecommendations,
    applicationSteps,
    timeline,
    downPaymentAssistanceAnalysis: 'Comprehensive down payment assistance analysis completed'
  };
}

export function generateDownPaymentAssistanceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    homePrice, downPaymentPercentage, annualIncome, householdSize,
    creditScore, location, propertyType, firstTimeBuyer, veteranStatus
  } = inputs;
  
  const {
    downPaymentRequired, downPaymentGap, availablePrograms, totalAssistance,
    grantsAvailable, forgivableLoans, deferredLoans, monthlyPayment,
    debtToIncomeRatio, loanToValueRatio, eligibilityScore,
    programRecommendations, applicationSteps, timeline
  } = outputs;
  
  let analysis = `# Down Payment Assistance Analysis\n\n`;
  
  analysis += `## Property Details\n`;
  analysis += `• **Home Price**: $${homePrice.toLocaleString()}\n`;
  analysis += `• **Down Payment Required**: $${downPaymentRequired.toLocaleString()} (${downPaymentPercentage}%)\n`;
  analysis += `• **Property Type**: ${propertyType}\n`;
  analysis += `• **Location**: ${location}\n\n`;
  
  analysis += `## Financial Profile\n`;
  analysis += `• **Annual Income**: $${annualIncome.toLocaleString()}\n`;
  analysis += `• **Household Size**: ${householdSize} people\n`;
  analysis += `• **Credit Score**: ${creditScore}\n`;
  analysis += `• **First-Time Buyer**: ${firstTimeBuyer === 'yes' ? 'Yes' : 'No'}\n`;
  analysis += `• **Veteran Status**: ${veteranStatus}\n\n`;
  
  analysis += `## Loan Analysis\n`;
  analysis += `• **Monthly Payment**: $${monthlyPayment.toLocaleString()}\n`;
  analysis += `• **Debt-to-Income Ratio**: ${debtToIncomeRatio}%\n`;
  analysis += `• **Loan-to-Value Ratio**: ${loanToValueRatio}%\n`;
  analysis += `• **Eligibility Score**: ${eligibilityScore}/100\n\n`;
  
  analysis += `## Available Assistance\n`;
  analysis += `• **Total Assistance**: $${totalAssistance.toLocaleString()}\n`;
  analysis += `• **Grants**: $${grantsAvailable.toLocaleString()}\n`;
  analysis += `• **Forgivable Loans**: $${forgivableLoans.toLocaleString()}\n`;
  analysis += `• **Deferred Loans**: $${deferredLoans.toLocaleString()}\n`;
  analysis += `• **Down Payment Gap**: $${downPaymentGap.toLocaleString()}\n\n`;
  
  analysis += `## Available Programs\n`;
  analysis += `${availablePrograms}\n\n`;
  
  analysis += `## Recommendations\n`;
  analysis += `${programRecommendations}\n\n`;
  
  analysis += `## Application Process\n`;
  analysis += `${applicationSteps}\n\n`;
  
  analysis += `## Timeline\n`;
  analysis += `${timeline}\n\n`;
  
  analysis += `## Next Steps\n`;
  analysis += `1. Contact a HUD-approved housing counselor\n`;
  analysis += `2. Research specific programs in your area\n`;
  analysis += `3. Get pre-approved for a mortgage\n`;
  analysis += `4. Begin gathering required documentation\n`;
  analysis += `5. Submit applications to multiple programs\n`;
  
  return analysis;
}
