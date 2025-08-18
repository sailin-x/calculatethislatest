import { Formula, CalculationResult } from '../../../types/calculator';

export interface AutomotiveInputs {
  calculationType: 'lease_vs_buy' | 'depreciation' | 'total_cost_ownership' | 'fuel_efficiency' | 'loan_calculator' | 'trade_in_value';
  vehiclePrice: number;
  downPayment?: number;
  loanTerm?: number;
  interestRate?: number;
  leaseMonthlyPayment?: number;
  leaseTerm?: number;
  leaseDownPayment?: number;
  residualValue?: number;
  annualMileage?: number;
  fuelPrice?: number;
  mpg?: number;
  annualInsurance?: number;
  annualMaintenance?: number;
  ownershipPeriod?: number;
}

export class AutomotiveFormulas {
  /**
   * Calculate monthly loan payment using standard loan formula
   */
  static calculateLoanPayment(principal: number, annualRate: number, termMonths: number): number {
    if (annualRate === 0) return principal / termMonths;
    
    const monthlyRate = annualRate / 100 / 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                   (Math.pow(1 + monthlyRate, termMonths) - 1);
    return payment;
  }

  /**
   * Calculate vehicle depreciation using industry-standard rates
   */
  static calculateDepreciation(initialValue: number, years: number): {
    depreciatedValue: number;
    totalDepreciation: number;
    yearlyDepreciation: number[];
  } {
    // Standard depreciation rates: 20% first year, then 15% annually
    const depreciationRates = [0.20, 0.15, 0.15, 0.15, 0.15, 0.10, 0.10, 0.10, 0.05, 0.05];
    
    let currentValue = initialValue;
    const yearlyDepreciation: number[] = [];
    
    for (let year = 0; year < Math.min(years, 10); year++) {
      const rate = depreciationRates[year] || 0.05;
      const depreciation = currentValue * rate;
      yearlyDepreciation.push(depreciation);
      currentValue -= depreciation;
    }
    
    return {
      depreciatedValue: currentValue,
      totalDepreciation: initialValue - currentValue,
      yearlyDepreciation
    };
  }

  /**
   * Calculate total cost of ownership
   */
  static calculateTotalCostOfOwnership(inputs: AutomotiveInputs): {
    purchaseCost: number;
    financingCost: number;
    fuelCost: number;
    insuranceCost: number;
    maintenanceCost: number;
    depreciationCost: number;
    totalCost: number;
    residualValue: number;
    netCost: number;
  } {
    const years = inputs.ownershipPeriod || 5;
    const downPayment = inputs.downPayment || 0;
    const loanAmount = inputs.vehiclePrice - downPayment;
    
    // Purchase and financing costs
    const purchaseCost = inputs.vehiclePrice;
    let financingCost = 0;
    
    if (loanAmount > 0 && inputs.interestRate && inputs.loanTerm) {
      const monthlyPayment = this.calculateLoanPayment(loanAmount, inputs.interestRate, inputs.loanTerm);
      const totalPayments = monthlyPayment * inputs.loanTerm;
      financingCost = totalPayments - loanAmount;
    }
    
    // Operating costs
    const annualMileage = inputs.annualMileage || 12000;
    const fuelPrice = inputs.fuelPrice || 3.50;
    const mpg = inputs.mpg || 25;
    const annualFuelCost = (annualMileage / mpg) * fuelPrice;
    const fuelCost = annualFuelCost * years;
    
    const insuranceCost = (inputs.annualInsurance || 1200) * years;
    const maintenanceCost = (inputs.annualMaintenance || 800) * years;
    
    // Depreciation
    const depreciation = this.calculateDepreciation(inputs.vehiclePrice, years);
    const depreciationCost = depreciation.totalDepreciation;
    const residualValue = depreciation.depreciatedValue;
    
    const totalCost = purchaseCost + financingCost + fuelCost + insuranceCost + maintenanceCost;
    const netCost = totalCost - residualValue;
    
    return {
      purchaseCost,
      financingCost,
      fuelCost,
      insuranceCost,
      maintenanceCost,
      depreciationCost,
      totalCost,
      residualValue,
      netCost
    };
  }

  /**
   * Calculate lease vs buy comparison
   */
  static calculateLeaseVsBuy(inputs: AutomotiveInputs): {
    buyAnalysis: any;
    leaseAnalysis: any;
    recommendation: string;
    savings: number;
    breakEvenMileage: number;
  } {
    const years = Math.min(inputs.ownershipPeriod || 5, (inputs.leaseTerm || 36) / 12);
    
    // Buy analysis
    const buyAnalysis = this.calculateTotalCostOfOwnership(inputs);
    const buyMonthlyCost = buyAnalysis.netCost / (years * 12);
    
    // Lease analysis
    const leaseMonths = inputs.leaseTerm || 36;
    const leasePayment = inputs.leaseMonthlyPayment || 0;
    const leaseDown = inputs.leaseDownPayment || 0;
    const totalLeasePayments = (leasePayment * leaseMonths) + leaseDown;
    
    // Add insurance and maintenance for lease (usually required)
    const leaseInsurance = (inputs.annualInsurance || 1200) * (leaseMonths / 12);
    const leaseMaintenance = (inputs.annualMaintenance || 600) * (leaseMonths / 12); // Lower for lease
    
    const totalLeaseCost = totalLeasePayments + leaseInsurance + leaseMaintenance;
    const leaseMonthlyCost = totalLeaseCost / leaseMonths;
    
    const leaseAnalysis = {
      monthlyPayment: leasePayment,
      downPayment: leaseDown,
      totalPayments: totalLeasePayments,
      insurance: leaseInsurance,
      maintenance: leaseMaintenance,
      totalCost: totalLeaseCost,
      monthlyCost: leaseMonthlyCost
    };
    
    // Recommendation logic
    const buyNetCostAdjusted = buyAnalysis.netCost * (leaseMonths / (years * 12));
    let recommendation: string;
    let savings: number;
    
    if (buyNetCostAdjusted < totalLeaseCost) {
      recommendation = 'Buy';
      savings = totalLeaseCost - buyNetCostAdjusted;
    } else {
      recommendation = 'Lease';
      savings = buyNetCostAdjusted - totalLeaseCost;
    }
    
    // Break-even mileage calculation
    const annualMileage = inputs.annualMileage || 12000;
    const leaseAnnualMileage = annualMileage * (leaseMonths / 12);
    const breakEvenMileage = leaseAnnualMileage * 1.2; // Typically 20% higher
    
    return {
      buyAnalysis: {
        ...buyAnalysis,
        monthlyCost: buyMonthlyCost
      },
      leaseAnalysis,
      recommendation,
      savings,
      breakEvenMileage
    };
  }

  /**
   * Calculate fuel efficiency and costs
   */
  static calculateFuelEfficiency(inputs: AutomotiveInputs): {
    annualFuelCost: number;
    monthlyFuelCost: number;
    costPerMile: number;
    gallonsPerYear: number;
    co2EmissionsPerYear: number; // lbs
  } {
    const annualMileage = inputs.annualMileage || 12000;
    const fuelPrice = inputs.fuelPrice || 3.50;
    const mpg = inputs.mpg || 25;
    
    const gallonsPerYear = annualMileage / mpg;
    const annualFuelCost = gallonsPerYear * fuelPrice;
    const monthlyFuelCost = annualFuelCost / 12;
    const costPerMile = annualFuelCost / annualMileage;
    
    // CO2 emissions: ~19.6 lbs per gallon of gasoline
    const co2EmissionsPerYear = gallonsPerYear * 19.6;
    
    return {
      annualFuelCost,
      monthlyFuelCost,
      costPerMile,
      gallonsPerYear,
      co2EmissionsPerYear
    };
  }

  /**
   * Estimate trade-in value based on depreciation
   */
  static estimateTradeInValue(inputs: AutomotiveInputs): {
    estimatedValue: number;
    depreciationAmount: number;
    depreciationPercentage: number;
    marketFactors: string[];
  } {
    const years = inputs.ownershipPeriod || 5;
    const mileage = (inputs.annualMileage || 12000) * years;
    
    // Base depreciation
    const depreciation = this.calculateDepreciation(inputs.vehiclePrice, years);
    let estimatedValue = depreciation.depreciatedValue;
    
    // Mileage adjustment
    const averageMileage = 12000 * years;
    const mileageAdjustment = (mileage - averageMileage) * -0.10; // $0.10 per excess mile
    estimatedValue += mileageAdjustment;
    
    // Ensure minimum value
    estimatedValue = Math.max(estimatedValue, inputs.vehiclePrice * 0.1);
    
    const depreciationAmount = inputs.vehiclePrice - estimatedValue;
    const depreciationPercentage = (depreciationAmount / inputs.vehiclePrice) * 100;
    
    const marketFactors = [
      'Vehicle condition and maintenance history',
      'Market demand for make/model',
      'Seasonal factors and local market conditions',
      'Accident history and title status',
      'Optional equipment and features'
    ];
    
    return {
      estimatedValue,
      depreciationAmount,
      depreciationPercentage,
      marketFactors
    };
  }
}

export const automotiveCalculatorFormula: Formula = {
  id: 'automotive-calculator',
  name: 'Comprehensive Automotive Calculator',
  description: 'Complete automotive financial analysis including lease vs buy, TCO, and depreciation',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const automotiveInputs = inputs as AutomotiveInputs;
    
    try {
      let result: any = {};
      let explanation = '';
      let steps: any = {};

      switch (automotiveInputs.calculationType) {
        case 'lease_vs_buy':
          const comparison = AutomotiveFormulas.calculateLeaseVsBuy(automotiveInputs);
          
          result = {
            recommendation: `${comparison.recommendation} (Save $${comparison.savings.toFixed(0)})`,
            totalCostBuy: comparison.buyAnalysis.netCost,
            totalCostLease: comparison.leaseAnalysis.totalCost,
            monthlyCostBuy: comparison.buyAnalysis.monthlyCost,
            monthlyCostLease: comparison.leaseAnalysis.monthlyCost,
            equityBuilt: comparison.buyAnalysis.residualValue,
            breakEvenPoint: `${Math.round(comparison.breakEvenMileage).toLocaleString()} miles annually`
          };
          
          explanation = `${comparison.recommendation} is recommended, saving $${comparison.savings.toFixed(0)} over the comparison period.`;
          
          steps = {
            'Buy Total Cost': `$${comparison.buyAnalysis.netCost.toFixed(0)}`,
            'Lease Total Cost': `$${comparison.leaseAnalysis.totalCost.toFixed(0)}`,
            'Monthly Cost Difference': `$${Math.abs(comparison.buyAnalysis.monthlyCost - comparison.leaseAnalysis.monthlyCost).toFixed(0)}`,
            'Recommendation': comparison.recommendation
          };
          break;

        case 'total_cost_ownership':
          const tco = AutomotiveFormulas.calculateTotalCostOfOwnership(automotiveInputs);
          const fuel = AutomotiveFormulas.calculateFuelEfficiency(automotiveInputs);
          const years = automotiveInputs.ownershipPeriod || 5;
          const totalMiles = (automotiveInputs.annualMileage || 12000) * years;
          
          result = {
            totalCostBuy: tco.netCost,
            monthlyCostBuy: tco.netCost / (years * 12),
            depreciation: tco.depreciationCost,
            annualFuelCost: fuel.annualFuelCost,
            costPerMile: tco.netCost / totalMiles,
            equityBuilt: tco.residualValue
          };
          
          explanation = `Total cost of ownership over ${years} years: $${tco.netCost.toFixed(0)} (${(tco.netCost / totalMiles).toFixed(2)} per mile)`;
          
          steps = {
            'Purchase Price': `$${tco.purchaseCost.toFixed(0)}`,
            'Financing Cost': `$${tco.financingCost.toFixed(0)}`,
            'Fuel Cost': `$${tco.fuelCost.toFixed(0)}`,
            'Insurance Cost': `$${tco.insuranceCost.toFixed(0)}`,
            'Maintenance Cost': `$${tco.maintenanceCost.toFixed(0)}`,
            'Depreciation': `$${tco.depreciationCost.toFixed(0)}`,
            'Residual Value': `$${tco.residualValue.toFixed(0)}`,
            'Net Cost': `$${tco.netCost.toFixed(0)}`
          };
          break;

        case 'fuel_efficiency':
          const fuelAnalysis = AutomotiveFormulas.calculateFuelEfficiency(automotiveInputs);
          
          result = {
            annualFuelCost: fuelAnalysis.annualFuelCost,
            costPerMile: fuelAnalysis.costPerMile
          };
          
          explanation = `Annual fuel cost: $${fuelAnalysis.annualFuelCost.toFixed(0)} (${fuelAnalysis.costPerMile.toFixed(3)} per mile)`;
          
          steps = {
            'Annual Mileage': `${(automotiveInputs.annualMileage || 12000).toLocaleString()} miles`,
            'Fuel Efficiency': `${automotiveInputs.mpg || 25} MPG`,
            'Fuel Price': `$${(automotiveInputs.fuelPrice || 3.50).toFixed(2)}/gallon`,
            'Gallons per Year': `${fuelAnalysis.gallonsPerYear.toFixed(0)} gallons`,
            'CO2 Emissions': `${fuelAnalysis.co2EmissionsPerYear.toFixed(0)} lbs/year`
          };
          break;

        case 'loan_calculator':
          if (!automotiveInputs.loanTerm || !automotiveInputs.interestRate) {
            throw new Error('Loan term and interest rate required for loan calculation');
          }
          
          const loanAmount = automotiveInputs.vehiclePrice - (automotiveInputs.downPayment || 0);
          const monthlyPayment = AutomotiveFormulas.calculateLoanPayment(
            loanAmount, 
            automotiveInputs.interestRate, 
            automotiveInputs.loanTerm
          );
          const totalPayments = monthlyPayment * automotiveInputs.loanTerm;
          const totalInterest = totalPayments - loanAmount;
          
          result = {
            monthlyCostBuy: monthlyPayment,
            totalCostBuy: totalPayments + (automotiveInputs.downPayment || 0)
          };
          
          explanation = `Monthly payment: $${monthlyPayment.toFixed(0)}, Total interest: $${totalInterest.toFixed(0)}`;
          
          steps = {
            'Loan Amount': `$${loanAmount.toFixed(0)}`,
            'Interest Rate': `${automotiveInputs.interestRate}%`,
            'Loan Term': `${automotiveInputs.loanTerm} months`,
            'Monthly Payment': `$${monthlyPayment.toFixed(2)}`,
            'Total Interest': `$${totalInterest.toFixed(0)}`
          };
          break;

        case 'trade_in_value':
          const tradeIn = AutomotiveFormulas.estimateTradeInValue(automotiveInputs);
          
          result = {
            equityBuilt: tradeIn.estimatedValue,
            depreciation: tradeIn.depreciationAmount
          };
          
          explanation = `Estimated trade-in value: $${tradeIn.estimatedValue.toFixed(0)} (${tradeIn.depreciationPercentage.toFixed(1)}% depreciation)`;
          
          steps = {
            'Original Price': `$${automotiveInputs.vehiclePrice.toFixed(0)}`,
            'Ownership Period': `${automotiveInputs.ownershipPeriod || 5} years`,
            'Estimated Mileage': `${((automotiveInputs.annualMileage || 12000) * (automotiveInputs.ownershipPeriod || 5)).toLocaleString()} miles`,
            'Depreciation Amount': `$${tradeIn.depreciationAmount.toFixed(0)}`,
            'Depreciation Rate': `${tradeIn.depreciationPercentage.toFixed(1)}%`
          };
          break;

        default:
          throw new Error(`Unknown calculation type: ${automotiveInputs.calculationType}`);
      }

      return {
        outputs: result,
        explanation,
        intermediateSteps: steps
      };
    } catch (error) {
      throw new Error(`Automotive calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};