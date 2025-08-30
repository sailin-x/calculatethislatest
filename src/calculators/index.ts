// Calculator registry - imports and registers all calculators
import { calculatorRegistry } from '../data/calculatorRegistry';

// Finance calculators
import { mortgageCalculator } from './finance/mortgage';
import { portfolioCalculator } from './finance/investment';
import { compoundInterestCalculator } from './finance/compound-interest-calculator';
import { retirementCalculator } from './finance/retirement-calculator';
import { annuityCalculator } from './finance/annuity-calculator';
import { socialSecurityCalculator } from './finance/social-security-calculator';
import { lifeInsuranceCalculator } from './finance/life-insurance-calculator';
import { BalloonMortgageCalculator as balloonMortgageCalculator } from './finance/balloon-mortgage';
import { BareboatCharterCalculator as bareboatCharterCalculator } from './finance/bareboat-charter';
import { BiweeklyMortgageCalculator as biweeklyMortgageCalculator } from './finance/biweekly-mortgage';
import { BridgeLoanCalculator as bridgeLoanCalculator } from './finance/bridge-loan';
import { BRRRRStrategyCalculator as brrrrStrategyCalculator } from './finance/brrrr-strategy';
import { BuildingReplacementCostCalculator as buildingReplacementCostCalculator } from './finance/building-replacement-cost';
import { CapRateCalculator as capRateCalculator } from './finance/cap-rate';
import { CashFlowCalculator as cashFlowCalculator } from './finance/cash-flow';
import { CashOnCashReturnCalculator as cashOnCashReturnCalculator } from './finance/cash-on-cash-return';
import { CommercialRealEstateCalculator as commercialRealEstateCalculator } from './finance/commercial-real-estate';
import { CashOutRefinanceCalculator as cashOutRefinanceCalculator } from './finance/cash-out-refinance';
import { VALoanCalculator as vaLoanCalculator } from './finance/va-loan';
import { VineyardProfitabilityCalculator as vineyardProfitabilityCalculator } from './finance/vineyard-profitability';
import { WindstormInsuranceCalculator as windstormInsuranceCalculator } from './finance/windstorm-insurance';
import { FourZeroOneKCalculator as fourZeroOneKCalculator } from './finance/401k';
import { FourZeroOneKCompanyMatchROICalculator as fourZeroOneKCompanyMatchROICalculator } from './finance/401k-company-match-roi';
import { FourZeroOneKPlanCalculator as fourZeroOneKPlanCalculator } from './finance/401k-plan';
import { FourZeroOneKRolloverCalculator as fourZeroOneKRolloverCalculator } from './finance/401k-rollover';
import { MezzanineFinancingCalculator as mezzanineFinancingCalculator } from './finance/mezzanine-financing';
import { MortgageAPRComparisonCalculator as mortgageAPRComparisonCalculator } from './finance/mortgage-apr-comparison';
import { MortgageEquityCalculator as mortgageEquityCalculator } from './finance/mortgage-equity';
import { MortgageInsuranceCalculator as mortgageInsuranceCalculator } from './finance/mortgage-insurance';
import { MortgageLifeCalculator as mortgageLifeCalculator } from './finance/mortgage-life';
import { MortgagePayoffCalculator as mortgagePayoffCalculator } from './finance/mortgage-payoff';
import { mortgagePaymentCalculator } from './finance/mortgage-payment';
import { mortgagePointsCalculator } from './finance/mortgage-points';
import { mortgageQualificationCalculator } from './finance/mortgage-qualification';
import { mortgageRateLockCalculator } from './finance/mortgage-rate-lock';
import { mortgageRefinanceCalculator } from './finance/mortgage-refinance';
import { mortgageVsRentCalculator } from './finance/mortgage-vs-rent';
import { netOperatingIncomeCalculator } from './finance/net-operating-income';
import { opportunityZoneInvestmentCalculator } from './finance/opportunity-zone-investment';
import { pmiCancellationCalculator } from './finance/pmi-cancellation';
import { pricePerSquareFootCalculator } from './finance/price-per-square-foot';
import { privateMortgageInsuranceCalculator } from './finance/private-mortgage-insurance';
import { propertyTaxCalculator } from './finance/property-tax';

// Missing Finance calculators that exist but weren't registered
import { Exchange1031Calculator as exchange1031Calculator } from './finance/1031-exchange';
import { ARMMortgageCalculator as armMortgageCalculator } from './finance/arm-mortgage';
import { AmortizationCalculator as amortizationCalculator } from './finance/amortization';
import { ARMvsFixedCalculator as armVsFixedCalculator } from './finance/arm-vs-fixed';
import { cryptoStakingCalculator } from './finance/crypto-staking';
import { nftRoyaltyCalculator } from './finance/nft-royalty';
import { stockOptionsCalculator } from './finance/stock-options';
import { commercialLeaseBuyoutCalculator } from './finance/commercial-lease-buyout';
import { commercialPropertyInsuranceCalculator } from './finance/commercial-property-insurance';
import { commercialPropertyValuationCalculator } from './finance/commercial-property-valuation';
import { commercialRealEstateCashFlowCalculator } from './finance/commercial-real-estate-cash-flow';
import { commercialRealEstateLoanAmortizationCalculator } from './finance/commercial-real-estate-loan-amortization';
import { mezzanineFinancingRealEstateCalculator } from './finance/mezzanine-financing-real-estate';
import { timberlandInvestmentCalculator } from './finance/timberland-investment';
import { farmlandInvestmentROICalculator } from './finance/farmland-investment-roi';
import { realEstateInvestmentCalculator } from './finance/real-estate-investment';
import { selfStorageROICalculator } from './finance/self-storage-roi';
import { conservationEasementTaxBenefitCalculator } from './finance/conservation-easement-tax-benefit';
import { costSegregationDepreciationCalculator } from './finance/cost-segregation-depreciation';
import { usdaLoanCalculator } from './finance/usda-loan';
import { jumboLoanCalculator } from './finance/jumbo-loan';
import { fhaLoanCalculator } from './finance/fha-loan';
import { rentersInsuranceCalculator } from './finance/renters-insurance';
import { titleInsuranceCalculator } from './finance/title-insurance';
import { homeownersInsuranceCalculator } from './finance/homeowners-insurance';
import { mortgageClosingCostCalculator } from './finance/mortgage-closing-cost';
import { homeAffordabilityCalculator } from './finance/home-affordability';
import { refinanceCalculator } from './finance/refinance';
import { homeEquityLoanCalculator } from './finance/home-equity-loan';
import { cashOutRefinanceCalculator } from './finance/cash-out-refinance';
import { reverseMortgageCalculator } from './finance/reverse-mortgage';
import { escrowAnalysisCalculator } from './finance/escrow-analysis';
import { investmentCalculator } from './finance/investment';
import { loanToCostRatioCalculator } from './finance/loan-to-cost-ratio';
import { earthquakeInsuranceCalculator } from './finance/earthquake-insurance';
import { downPaymentAssistanceCalculator } from './finance/down-payment-assistance';
import { hardMoneyLoanCalculator } from './finance/hard-money-loan';
import { tenantImprovementCalculator } from './finance/tenant-improvement';
import { helocCalculator } from './finance/heloc';
import { homeInsuranceCalculator } from './finance/home-insurance';
import { constructionLoanCalculator } from './finance/construction-loan';
import { rentVsBuyCalculator } from './finance/rent-vs-buy';
import { debtServiceCoverageRatioCalculator } from './finance/debt-service-coverage-ratio';
import { taxCalculator } from './finance/tax';
import { grossRentMultiplierCalculator } from './finance/gross-rent-multiplier';
import { rentalPropertyROICalculator } from './finance/rental-property-roi';
import { hotelFeasibilityCalculator } from './finance/hotel-feasibility';
import { landlordInsuranceCalculator } from './finance/landlord-insurance';
import { condoInsuranceCalculator } from './finance/condo-insurance';
import { groundLeaseValuationCalculator } from './finance/ground-lease-valuation';
import { studentLoanCalculator } from './finance/student-loan';
import { FixAndFlipCalculator as fixAndFlipCalculator } from './finance/fix-and-flip';
import { loanToValueRatioCalculator } from './finance/loan-to-value-ratio';
import { FloodInsuranceCalculator as floodInsuranceCalculator } from './finance/flood-insurance';
import { GroundLeaseValuationCalculator as groundLeaseValuationCalculator } from './finance/ground-lease-valuation';
import { GrossRentMultiplierCalculator as grossRentMultiplierCalculator } from './finance/gross-rent-multiplier';
import { HardMoneyLoanCalculator as hardMoneyLoanCalculator } from './finance/hard-money-loan';
import { HELOCCalculator as helocCalculator } from './finance/heloc';
import { HomeAffordabilityCalculator as homeAffordabilityCalculator } from './finance/home-affordability';
import { HomeEquityLoanCalculator as homeEquityLoanCalculator } from './finance/home-equity-loan';
import { rentalYieldCalculator } from './finance/rental-yield';
import { hoaFeeCalculator } from './finance/hoa-fee';
import { debtYieldRatioCalculator } from './finance/debt-yield-ratio';
import { industrialWarehouseProfitabilityCalculator } from './finance/industrial-warehouse-profitability';
import { tripleNetLeaseROICalculator } from './finance/triple-net-lease';

// Investment & Portfolio calculators
import { AccretionDilutionCalculator } from './finance/accretion-dilution';
import { AlphaBetaCalculator } from './finance/alpha-beta';
import { AlphaCalculator } from './finance/alpha';
import { AngelInvestmentDilutionCalculator } from './finance/angel-investment-dilution';
import { AngelInvestmentCalculator } from './finance/angel-investment';

// Legal calculators
import { personalInjuryCalculator } from './legal/personal-injury';

// Business calculators
import { saasMetricsCalculator } from './business/saas-metrics';
import customerLifetimeValueCalculator from './business/customer-lifetime-value';
import roiCalculator from './business/roi';
import customerAcquisitionCostCalculator from './business/customer-acquisition-cost';
import churnRateCalculator from './business/churn-rate';
import paybackPeriodCalculator from './business/payback-period';
import businessValuationCalculator from './business/business-valuation';
import { breakEvenAnalysisCalculator } from './business/break-even-analysis-calculator';
import { aiopsImplementationSavingsCalculator } from './business/aiops-implementation-savings-calculator';
import { assetProtectionCalculator } from './business/asset-protection-calculator';
import { balancedScorecardCalculator } from './business/balanced-scorecard-calculator';
import { billOfMaterialsCalculator } from './business/bill-of-materials-calculator';
import { breakevenPointCalculator } from './business/breakeven-point-calculator';
import budgetOptimizationCalculator from './business/budget-optimization-calculator';
import cohortAnalysisCalculator from './business/cohort-analysis-calculator';
import attributionModelsCalculator from './business/attribution-models-calculator';
import industryBenchmarkingCalculator from './business/industry-benchmarking-calculator';

// Health calculators
import { bmrCalculator } from './health/bmr-tdee';

// Construction calculators
import { concreteCalculator } from './construction/concrete';

// Math calculators
import { statisticsCalculator } from './math/statistics';
import { algebraCalculator } from './math/algebra';
import { calculusCalculator } from './math/calculus';
import { geometryCalculator } from './math/geometry';
import { unitConversionCalculator } from './math/unit-conversion';
import { complexNumberCalculator } from './math/complex-numbers';
import { matrixCalculator } from './math/matrix';
import { scientificCalculator } from './math/scientific';

// Technology calculators
import { gpuMiningProfitabilityCalculator } from './technology/gpu-mining-profitability';
import { aiPromptCostCalculator } from './technology/ai-prompt-cost';

// Career calculators
import { developerSalaryCalculator } from './career/developer-salary';

// Lifestyle calculators
import { automotiveCalculator } from './lifestyle/automotive';
import { cookingCalculator } from './lifestyle/cooking';
import { everydayCalculator } from './lifestyle/everyday';
import { hobbiesCalculator } from './lifestyle/hobbies';

/**
 * Register all calculators with the system
 */
export function registerAllCalculators(): void {
  // Finance & Investment calculators
  calculatorRegistry.register(mortgageCalculator);
  calculatorRegistry.register(portfolioCalculator);
  calculatorRegistry.register(compoundInterestCalculator);
  calculatorRegistry.register(retirementCalculator);
  calculatorRegistry.register(annuityCalculator);
  calculatorRegistry.register(socialSecurityCalculator);
  calculatorRegistry.register(lifeInsuranceCalculator);
  calculatorRegistry.register(balloonMortgageCalculator);
  calculatorRegistry.register(bareboatCharterCalculator);
  calculatorRegistry.register(biweeklyMortgageCalculator);
  calculatorRegistry.register(bridgeLoanCalculator);
  calculatorRegistry.register(brrrrStrategyCalculator);
  calculatorRegistry.register(buildingReplacementCostCalculator);
  calculatorRegistry.register(capRateCalculator);
  calculatorRegistry.register(cashFlowCalculator);
  calculatorRegistry.register(cashOnCashReturnCalculator);
  calculatorRegistry.register(commercialRealEstateCalculator);
  calculatorRegistry.register(cashOutRefinanceCalculator);
  calculatorRegistry.register(vaLoanCalculator);
  calculatorRegistry.register(vineyardProfitabilityCalculator);
  calculatorRegistry.register(windstormInsuranceCalculator);
  calculatorRegistry.register(fourZeroOneKCalculator);
  calculatorRegistry.register(fourZeroOneKCompanyMatchROICalculator);
  calculatorRegistry.register(fourZeroOneKPlanCalculator);
  calculatorRegistry.register(fourZeroOneKRolloverCalculator);
  calculatorRegistry.register(mezzanineFinancingCalculator);
  calculatorRegistry.register(mortgageAPRComparisonCalculator);
  calculatorRegistry.register(mortgageEquityCalculator);
  calculatorRegistry.register(mortgageInsuranceCalculator);
      calculatorRegistry.register(mortgageLifeCalculator);
    calculatorRegistry.register(mortgagePayoffCalculator);
    calculatorRegistry.register(mortgagePaymentCalculator);
    calculatorRegistry.register(mortgagePointsCalculator);
    calculatorRegistry.register(mortgageQualificationCalculator);
    calculatorRegistry.register(mortgageRateLockCalculator);
    calculatorRegistry.register(mortgageRefinanceCalculator);
    calculatorRegistry.register(mortgageVsRentCalculator);
    calculatorRegistry.register(netOperatingIncomeCalculator);
    calculatorRegistry.register(opportunityZoneInvestmentCalculator);
    calculatorRegistry.register(pmiCancellationCalculator);
    calculatorRegistry.register(pricePerSquareFootCalculator);
    calculatorRegistry.register(privateMortgageInsuranceCalculator);
    calculatorRegistry.register(propertyTaxCalculator);

    // Register missing finance calculators
    calculatorRegistry.register(exchange1031Calculator);
  calculatorRegistry.register(armMortgageCalculator);
  calculatorRegistry.register(amortizationCalculator);
  calculatorRegistry.register(armVsFixedCalculator);
  calculatorRegistry.register(cryptoStakingCalculator);
  calculatorRegistry.register(nftRoyaltyCalculator);
  calculatorRegistry.register(stockOptionsCalculator);
  calculatorRegistry.register(commercialLeaseBuyoutCalculator);
  calculatorRegistry.register(commercialPropertyInsuranceCalculator);
  calculatorRegistry.register(commercialPropertyValuationCalculator);
  calculatorRegistry.register(commercialRealEstateCashFlowCalculator);
  calculatorRegistry.register(commercialRealEstateLoanAmortizationCalculator);
  calculatorRegistry.register(mezzanineFinancingRealEstateCalculator);
  calculatorRegistry.register(timberlandInvestmentCalculator);
  calculatorRegistry.register(farmlandInvestmentROICalculator);
  calculatorRegistry.register(realEstateInvestmentCalculator);
  calculatorRegistry.register(selfStorageROICalculator);
  calculatorRegistry.register(conservationEasementTaxBenefitCalculator);
  calculatorRegistry.register(costSegregationDepreciationCalculator);
  calculatorRegistry.register(usdaLoanCalculator);
  calculatorRegistry.register(jumboLoanCalculator);
  calculatorRegistry.register(fhaLoanCalculator);
  calculatorRegistry.register(rentersInsuranceCalculator);
  calculatorRegistry.register(titleInsuranceCalculator);
  calculatorRegistry.register(homeownersInsuranceCalculator);
  calculatorRegistry.register(mortgageClosingCostCalculator);
  calculatorRegistry.register(homeAffordabilityCalculator);
  calculatorRegistry.register(refinanceCalculator);
  calculatorRegistry.register(homeEquityLoanCalculator);
  calculatorRegistry.register(cashOutRefinanceCalculator);
  calculatorRegistry.register(reverseMortgageCalculator);
  calculatorRegistry.register(escrowAnalysisCalculator);
  calculatorRegistry.register(investmentCalculator);
  calculatorRegistry.register(loanToCostRatioCalculator);
  calculatorRegistry.register(earthquakeInsuranceCalculator);
  calculatorRegistry.register(downPaymentAssistanceCalculator);
  calculatorRegistry.register(hardMoneyLoanCalculator);
  calculatorRegistry.register(tenantImprovementCalculator);
  calculatorRegistry.register(helocCalculator);
  calculatorRegistry.register(homeInsuranceCalculator);
  calculatorRegistry.register(constructionLoanCalculator);
  calculatorRegistry.register(rentVsBuyCalculator);
  calculatorRegistry.register(debtServiceCoverageRatioCalculator);
  calculatorRegistry.register(taxCalculator);
  calculatorRegistry.register(grossRentMultiplierCalculator);
  calculatorRegistry.register(rentalPropertyROICalculator);
  calculatorRegistry.register(hotelFeasibilityCalculator);
  calculatorRegistry.register(landlordInsuranceCalculator);
  calculatorRegistry.register(condoInsuranceCalculator);
  calculatorRegistry.register(groundLeaseValuationCalculator);
  calculatorRegistry.register(studentLoanCalculator);
  calculatorRegistry.register(fixAndFlipCalculator);
  calculatorRegistry.register(loanToValueRatioCalculator);
  calculatorRegistry.register(floodInsuranceCalculator);
calculatorRegistry.register(groundLeaseValuationCalculator);
calculatorRegistry.register(grossRentMultiplierCalculator);
calculatorRegistry.register(hardMoneyLoanCalculator);
calculatorRegistry.register(helocCalculator);
calculatorRegistry.register(homeAffordabilityCalculator);
calculatorRegistry.register(homeEquityLoanCalculator);
calculatorRegistry.register(rentalYieldCalculator);
  calculatorRegistry.register(hoaFeeCalculator);
  calculatorRegistry.register(debtYieldRatioCalculator);
  calculatorRegistry.register(industrialWarehouseProfitabilityCalculator);
  calculatorRegistry.register(tripleNetLeaseROICalculator);
  calculatorRegistry.register(AccretionDilutionCalculator);
  calculatorRegistry.register(AlphaBetaCalculator);
  calculatorRegistry.register(AlphaCalculator);
  calculatorRegistry.register(AngelInvestmentDilutionCalculator);
  calculatorRegistry.register(AngelInvestmentCalculator);
  calculatorRegistry.register(commercialLeaseBuyoutCalculator);
  calculatorRegistry.register(commercialPropertyInsuranceCalculator);
  calculatorRegistry.register(commercialPropertyValuationCalculator);
  calculatorRegistry.register(commercialRealEstateCashFlowCalculator);
  calculatorRegistry.register(commercialRealEstateLoanAmortizationCalculator);
  
  // Legal & Settlement calculators
  calculatorRegistry.register(personalInjuryCalculator);
  
  // Business & Operations calculators
  calculatorRegistry.register(saasMetricsCalculator);
  calculatorRegistry.register(customerLifetimeValueCalculator);
  calculatorRegistry.register(roiCalculator);
  calculatorRegistry.register(customerAcquisitionCostCalculator);
  calculatorRegistry.register(churnRateCalculator);
  calculatorRegistry.register(paybackPeriodCalculator);
  calculatorRegistry.register(businessValuationCalculator);
  calculatorRegistry.register(breakEvenAnalysisCalculator);
  calculatorRegistry.register(aiopsImplementationSavingsCalculator);
  calculatorRegistry.register(assetProtectionCalculator);
  calculatorRegistry.register(balancedScorecardCalculator);
  calculatorRegistry.register(billOfMaterialsCalculator);
  calculatorRegistry.register(breakevenPointCalculator);
  calculatorRegistry.register(budgetOptimizationCalculator);
  calculatorRegistry.register(cohortAnalysisCalculator);
  calculatorRegistry.register(attributionModelsCalculator);
  calculatorRegistry.register(industryBenchmarkingCalculator);
  
  // Health & Fitness calculators
  calculatorRegistry.register(bmrCalculator);
  
  // Construction & Industrial calculators
  calculatorRegistry.register(concreteCalculator);
  
  // Math & Science calculators
  calculatorRegistry.register(statisticsCalculator);
  calculatorRegistry.register(algebraCalculator);
  calculatorRegistry.register(calculusCalculator);
  calculatorRegistry.register(geometryCalculator);
  calculatorRegistry.register(unitConversionCalculator);
  calculatorRegistry.register(complexNumberCalculator);
  calculatorRegistry.register(matrixCalculator);
  calculatorRegistry.register(scientificCalculator);
  
  // Technology calculators
  calculatorRegistry.register(gpuMiningProfitabilityCalculator);
  calculatorRegistry.register(aiPromptCostCalculator);
  
  // Career calculators
  calculatorRegistry.register(developerSalaryCalculator);
  
  // Lifestyle & Automotive calculators
  calculatorRegistry.register(automotiveCalculator);
  calculatorRegistry.register(cookingCalculator);
  calculatorRegistry.register(everydayCalculator);
  calculatorRegistry.register(hobbiesCalculator);
}

// Auto-register calculators when module is imported
registerAllCalculators();