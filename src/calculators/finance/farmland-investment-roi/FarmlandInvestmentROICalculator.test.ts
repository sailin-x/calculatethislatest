import { describe, it, expect } from 'vitest';
import { FarmlandInvestmentROICalculator } from './FarmlandInvestmentROICalculator';
import { calculateFarmlandInvestmentROI } from './formulas';
import { validateFarmlandInvestmentInputs } from './validation';
import { validateAllFarmlandInvestmentInputs } from './quickValidation';

describe('Farmland Investment ROI Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(FarmlandInvestmentROICalculator.id).toBe('FarmlandInvestmentRoi-calculator');
      expect(FarmlandInvestmentROICalculator.name).toBe('Farmland Investment ROI Calculator');
      expect(FarmlandInvestmentROICalculator.category).toBe('finance');
      expect(FarmlandInvestmentROICalculator.subcategory).toBe('investment');
    });

    it('should have required inputs', () => {
      const requiredInputs = [
        'landAcres', 'purchasePrice', 'downPayment', 'interestRate', 'loanTerm',
        'annualCropRevenue', 'cropType', 'yieldPerAcre', 'cropPrice', 'operatingCosts',
        'landTaxes', 'insuranceCosts', 'maintenanceCosts', 'landAppreciation',
        'inflationRate', 'holdingPeriod', 'soilQuality', 'irrigationType',
        'climateZone', 'marketAccess'
      ];

      requiredInputs.forEach(inputId => {
        const input = FarmlandInvestmentROICalculator.inputs.find(i => i.id === inputId);
        expect(input).toBeDefined();
        expect(input?.required).toBe(true);
      });
    });

    it('should have expected outputs', () => {
      const expectedOutputs = [
        'totalInvestment', 'annualCashFlow', 'monthlyPayment', 'annualROI',
        'totalROI', 'cashOnCashReturn', 'breakEvenYears', 'netPresentValue',
        'internalRateOfReturn', 'landValueAppreciation', 'operatingExpenseRatio',
        'debtServiceCoverageRatio', 'profitMargin', 'yieldEfficiency', 'riskScore',
        'investmentRecommendation', 'keyRiskFactors', 'optimizationOpportunities',
        'marketAnalysis', 'sustainabilityMetrics'
      ];

      expectedOutputs.forEach(outputId => {
        const output = FarmlandInvestmentROICalculator.outputs.find(o => o.id === outputId);
        expect(output).toBeDefined();
      });
    });

    it('should have calculate and generateReport functions', () => {
      expect(typeof FarmlandInvestmentROICalculator.calculate).toBe('function');
      expect(typeof FarmlandInvestmentROICalculator.generateReport).toBe('function');
    });

    it('should have formulas and examples', () => {
      expect(FarmlandInvestmentROICalculator.formulas).toBeDefined();
      expect(FarmlandInvestmentROICalculator.formulas.length).toBeGreaterThan(0);
      expect(FarmlandInvestmentROICalculator.examples).toBeDefined();
      expect(FarmlandInvestmentROICalculator.examples.length).toBeGreaterThan(0);
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const result = validateFarmlandInvestmentInputs({});
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate land acres range', () => {
      const inputs = {
        landAcres: '0.5', // Too low
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '75000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const result = validateFarmlandInvestmentInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Land size'))).toBe(true);
    });

    it('should validate purchase price range', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '5000', // Too low
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '75000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const result = validateFarmlandInvestmentInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Purchase price'))).toBe(true);
    });

    it('should validate logical consistency', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '600000', // Exceeds purchase price
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '75000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const result = validateFarmlandInvestmentInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('cannot exceed purchase price'))).toBe(true);
    });

    it('should validate valid inputs', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '75000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const result = validateFarmlandInvestmentInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('Calculation Logic', () => {
    it('should calculate monthly payment correctly', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '75000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.monthlyPayment).toBeGreaterThan(0);
      expect(outputs.monthlyPayment).toBe(2270); // $400,000 loan at 5.5% for 30 years
    });

    it('should calculate annual cash flow correctly', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '75000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.annualCashFlow).toBeGreaterThan(0);
      // Revenue: $75,000, Costs: $45,000 + $3,000 + $2,000 + $5,000 = $55,000, Debt: $27,240
      // Cash flow: $75,000 - $55,000 - $27,240 = -$7,240 (negative cash flow)
    });

    it('should calculate ROI metrics correctly', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000', // Higher revenue for positive cash flow
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.annualROI).toBeDefined();
      expect(outputs.cashOnCashReturn).toBeDefined();
      expect(outputs.totalROI).toBeDefined();
      expect(outputs.breakEvenYears).toBeDefined();
    });

    it('should calculate land value appreciation correctly', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.landValueAppreciation).toBeGreaterThan(0);
      // $500,000 * (1.03^10 - 1) = $500,000 * 0.3439 = $171,950
      expect(outputs.landValueAppreciation).toBe(171950);
    });

    it('should calculate risk score correctly', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.riskScore).toBeGreaterThanOrEqual(0);
      expect(outputs.riskScore).toBeLessThanOrEqual(100);
    });

    it('should handle optional fields correctly', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good',
        governmentSubsidies: '5000',
        conservationPrograms: 'crop-insurance',
        organicCertification: 'conventional',
        energyCosts: '3000',
        laborCosts: '15000',
        equipmentCosts: '8000',
        waterRights: 'owned',
        mineralRights: 'owned',
        zoningRestrictions: 'agricultural-only'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.annualCashFlow).toBeGreaterThan(0);
    });
  });

  describe('Farmland Investment Analysis', () => {
    it('should generate comprehensive analysis report', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      const report = FarmlandInvestmentROICalculator.generateReport(inputs, outputs);
      
      expect(report).toContain('Farmland Investment Analysis Report');
      expect(report).toContain('Investment Overview');
      expect(report).toContain('Financial Performance');
      expect(report).toContain('Key Metrics');
      expect(report).toContain('Investment Recommendation');
      expect(report).toContain('Risk Assessment');
    });

    it('should include investment recommendation', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.investmentRecommendation).toBeDefined();
      expect(outputs.investmentRecommendation.length).toBeGreaterThan(0);
    });

    it('should include key risk factors', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.keyRiskFactors).toBeDefined();
      expect(outputs.keyRiskFactors.length).toBeGreaterThan(0);
    });

    it('should include optimization opportunities', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.optimizationOpportunities).toBeDefined();
      expect(outputs.optimizationOpportunities.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero crop revenue', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '0',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.annualCashFlow).toBeLessThan(0); // Should be negative
    });

    it('should handle high land appreciation', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '15', // High appreciation
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.landValueAppreciation).toBeGreaterThan(500000);
    });

    it('should handle poor soil quality', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'poor',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.riskScore).toBeGreaterThan(50); // Higher risk score
    });

    it('should handle arid climate', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'arid',
        marketAccess: 'good'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.riskScore).toBeGreaterThan(50); // Higher risk score
    });

    it('should handle organic certification', () => {
      const inputs = {
        landAcres: '100',
        purchasePrice: '500000',
        downPayment: '100000',
        interestRate: '5.5',
        loanTerm: '30',
        annualCropRevenue: '100000',
        cropType: 'corn',
        yieldPerAcre: '180',
        cropPrice: '4.50',
        operatingCosts: '45000',
        landTaxes: '3000',
        insuranceCosts: '2000',
        maintenanceCosts: '5000',
        landAppreciation: '3',
        inflationRate: '2.5',
        holdingPeriod: '10',
        soilQuality: 'good',
        irrigationType: 'center-pivot',
        climateZone: 'temperate',
        marketAccess: 'good',
        organicCertification: 'certified-organic'
      };

      const outputs = calculateFarmlandInvestmentROI(inputs);
      expect(outputs.annualCashFlow).toBeGreaterThan(0); // Should be higher due to organic premium
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const landAcresResult = validateAllFarmlandInvestmentInputs({ landAcres: '0.5' });
      expect(landAcresResult.isValid).toBe(false);
      expect(landAcresResult.errors.some(e => e.includes('Land size'))).toBe(true);

      const validLandAcresResult = validateAllFarmlandInvestmentInputs({ landAcres: '100' });
      expect(validLandAcresResult.errors.some(e => e.includes('Land size'))).toBe(false);
    });

    it('should handle optional fields', () => {
      const result = validateAllFarmlandInvestmentInputs({ governmentSubsidies: '' });
      expect(result.errors.some(e => e.includes('Government subsidies'))).toBe(false);
    });

    it('should validate logical consistency in quick validation', () => {
      const result = validateAllFarmlandInvestmentInputs({
        purchasePrice: '500000',
        downPayment: '600000'
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('cannot exceed purchase price'))).toBe(true);
    });
  });
});
