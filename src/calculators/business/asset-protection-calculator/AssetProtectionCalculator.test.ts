import { AssetProtectionCalculator } from './AssetProtectionCalculator';

describe('AssetProtectionCalculator', () => {
  let calculator: AssetProtectionCalculator;

  beforeEach(() => {
    calculator = new AssetProtectionCalculator();
  });

  describe('calculate', () => {
    it('should calculate asset protection metrics correctly', () => {
      const inputs = {
        totalAssets: 1000000,
        liquidAssets: 200000,
        realEstateValue: 500000,
        businessValue: 300000,
        personalLiability: 100000,
        insuranceCoverage: 500000,
        trustProtection: 200000,
        llcProtection: 150000,
        retirementProtection: 100000,
        homesteadExemption: 50000,
        riskTolerance: 'Medium',
        stateOfResidence: 'California',
        maritalStatus: 'Married',
        businessStructure: 'LLC',
        assetLocation: 'Domestic'
      };

      const result = calculator.calculate(inputs);

      expect(result).toBeDefined();
      expect(result.protectedAssets).toBeGreaterThan(0);
      expect(result.unprotectedAssets).toBeGreaterThanOrEqual(0);
      expect(result.protectionPercentage).toBeGreaterThan(0);
      expect(result.protectionPercentage).toBeLessThanOrEqual(100);
      expect(result.riskLevel).toBeDefined();
      expect(result.recommendations).toBeDefined();
    });

    it('should handle zero assets', () => {
      const inputs = {
        totalAssets: 0,
        liquidAssets: 0,
        realEstateValue: 0,
        businessValue: 0,
        personalLiability: 0,
        insuranceCoverage: 0,
        trustProtection: 0,
        llcProtection: 0,
        retirementProtection: 0,
        homesteadExemption: 0,
        riskTolerance: 'Low',
        stateOfResidence: 'California',
        maritalStatus: 'Single',
        businessStructure: 'Sole Proprietorship',
        assetLocation: 'Domestic'
      };

      const result = calculator.calculate(inputs);

      expect(result.protectedAssets).toBe(0);
      expect(result.unprotectedAssets).toBe(0);
      expect(result.protectionPercentage).toBe(0);
    });

    it('should handle high risk tolerance', () => {
      const inputs = {
        totalAssets: 2000000,
        liquidAssets: 500000,
        realEstateValue: 1000000,
        businessValue: 500000,
        personalLiability: 200000,
        insuranceCoverage: 1000000,
        trustProtection: 500000,
        llcProtection: 300000,
        retirementProtection: 200000,
        homesteadExemption: 100000,
        riskTolerance: 'High',
        stateOfResidence: 'Texas',
        maritalStatus: 'Married',
        businessStructure: 'Corporation',
        assetLocation: 'International'
      };

      const result = calculator.calculate(inputs);

      expect(result.riskLevel).toBeDefined();
      expect(result.recommendations).toContain('Consider additional protection strategies');
    });
  });

  describe('validateInputs', () => {
    it('should validate required inputs', () => {
      const inputs = {
        totalAssets: 1000000,
        liquidAssets: 200000,
        realEstateValue: 500000,
        businessValue: 300000,
        personalLiability: 100000,
        insuranceCoverage: 500000,
        trustProtection: 200000,
        llcProtection: 150000,
        retirementProtection: 100000,
        homesteadExemption: 50000,
        riskTolerance: 'Medium',
        stateOfResidence: 'California',
        maritalStatus: 'Married',
        businessStructure: 'LLC',
        assetLocation: 'Domestic'
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(true);
    });

    it('should reject negative values', () => {
      const inputs = {
        totalAssets: -1000000,
        liquidAssets: 200000,
        realEstateValue: 500000,
        businessValue: 300000,
        personalLiability: 100000,
        insuranceCoverage: 500000,
        trustProtection: 200000,
        llcProtection: 150000,
        retirementProtection: 100000,
        homesteadExemption: 50000,
        riskTolerance: 'Medium',
        stateOfResidence: 'California',
        maritalStatus: 'Married',
        businessStructure: 'LLC',
        assetLocation: 'Domestic'
      };

      const validation = calculator.validateInputs(inputs);
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Total assets must be positive');
    });
  });
});
