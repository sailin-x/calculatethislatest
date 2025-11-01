import { describe, it, expect } from 'vitest';
import { CostSegregationDepreciationCalculator } from './CostSegregationDepreciationCalculator';
import { calculateCostSegregation } from './formulas';
import { validateCostSegregationInputs } from './validation';
import { validateAllCostSegregationInputs } from './quickValidation';

describe('Cost Segregation Depreciation Calculator', () => {
  describe('Calculator Structure', () => {
    it('should have correct basic properties', () => {
      expect(CostSegregationDepreciationCalculator.id).toBe('CostSegregationDepreciation-calculator');
      expect(CostSegregationDepreciationCalculator.name).toBe('Cost Segregation Depreciation Calculator');
      expect(CostSegregationDepreciationCalculator.category).toBe('finance');
      expect(CostSegregationDepreciationCalculator.subcategory).toBe('tax');
    });

    it('should have required inputs', () => {
      const inputIds = CostSegregationDepreciationCalculator.inputs.map(input => input.id);
      expect(inputIds).toContain('propertyType');
      expect(inputIds).toContain('totalPropertyCost');
      expect(inputIds).toContain('landCost');
      expect(inputIds).toContain('buildingCost');
      expect(inputIds).toContain('siteImprovements');
      expect(inputIds).toContain('personalProperty');
      expect(inputIds).toContain('landImprovements');
      expect(inputIds).toContain('acquisitionDate');
      expect(inputIds).toContain('studyCost');
      expect(inputIds).toContain('taxYear');
      expect(inputIds).toContain('marginalTaxRate');
      expect(inputIds).toContain('stateTaxRate');
      expect(inputIds).toContain('propertyAge');
      expect(inputIds).toContain('renovationCost');
      expect(inputIds).toContain('renovationDate');
      expect(inputIds).toContain('propertyUse');
      expect(inputIds).toContain('ownershipType');
      expect(inputIds).toContain('bonusDepreciation');
      expect(inputIds).toContain('section179');
      expect(inputIds).toContain('priorDepreciation');
      expect(inputIds).toContain('recoveryPeriod');
      expect(inputIds).toContain('depreciationMethod');
      expect(inputIds).toContain('convention');
    });

    it('should have required outputs', () => {
      const outputIds = CostSegregationDepreciationCalculator.outputs.map(output => output.id);
      expect(outputIds).toContain('totalDepreciableCost');
      expect(outputIds).toContain('costSegregationAllocation');
      expect(outputIds).toContain('acceleratedDepreciation');
      expect(outputIds).toContain('taxSavings');
      expect(outputIds).toContain('presentValueTaxSavings');
      expect(outputIds).toContain('paybackPeriod');
      expect(outputIds).toContain('roi');
      expect(outputIds).toContain('depreciationSchedule');
      expect(outputIds).toContain('cashFlowImpact');
      expect(outputIds).toContain('netPresentValue');
      expect(outputIds).toContain('internalRateOfReturn');
      expect(outputIds).toContain('depreciationRecapture');
      expect(outputIds).toContain('adjustedBasis');
      expect(outputIds).toContain('gainDeferral');
      expect(outputIds).toContain('complianceRisk');
      expect(outputIds).toContain('costSegregationAnalysis');
    });

    it('should have calculate function', () => {
      expect(typeof CostSegregationDepreciationCalculator.calculate).toBe('function');
    });

    it('should have generateReport function', () => {
      expect(typeof CostSegregationDepreciationCalculator.generateReport).toBe('function');
    });
  });

  describe('Validation', () => {
    const validInputs = {
      propertyType: 'office',
      totalPropertyCost: 5000000,
      landCost: 1000000,
      buildingCost: 3500000,
      siteImprovements: 300000,
      personalProperty: 150000,
      landImprovements: 50000,
      acquisitionDate: '20230115',
      studyCost: 15000,
      taxYear: 2024,
      marginalTaxRate: 37,
      stateTaxRate: 5,
      propertyAge: 2,
      renovationCost: 200000,
      renovationDate: '20230601',
      propertyUse: 'business',
      ownershipType: 'corporation',
      bonusDepreciation: '80',
      section179: 50000,
      priorDepreciation: 50000,
      recoveryPeriod: '39',
      depreciationMethod: 'straight-line',
      convention: 'mid-month'
    };

    it('should validate correct inputs', () => {
      const result = validateCostSegregationInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.totalPropertyCost;
      
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('totalPropertyCost is required');
    });

    it('should reject invalid total property cost', () => {
      const invalidInputs = { ...validInputs, totalPropertyCost: 50000 };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total property cost must be at least $100,000');
    });

    it('should reject negative land cost', () => {
      const invalidInputs = { ...validInputs, landCost: -1000 };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Land cost cannot be negative');
    });

    it('should reject invalid building cost', () => {
      const invalidInputs = { ...validInputs, buildingCost: 25000 };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Building cost must be at least $50,000');
    });

    it('should reject invalid study cost', () => {
      const invalidInputs = { ...validInputs, studyCost: 2000 };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Study cost must be at least $5,000');
    });

    it('should reject invalid tax year', () => {
      const invalidInputs = { ...validInputs, taxYear: 2010 };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Tax year must be at least 2015');
    });

    it('should reject invalid marginal tax rate', () => {
      const invalidInputs = { ...validInputs, marginalTaxRate: 5 };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Marginal tax rate must be at least 10%');
    });

    it('should reject invalid property type', () => {
      const invalidInputs = { ...validInputs, propertyType: 'invalid' };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a valid property type');
    });

    it('should reject invalid property use', () => {
      const invalidInputs = { ...validInputs, propertyUse: 'invalid' };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a valid property use');
    });

    it('should reject invalid ownership type', () => {
      const invalidInputs = { ...validInputs, ownershipType: 'invalid' };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a valid ownership type');
    });

    it('should reject invalid bonus depreciation', () => {
      const invalidInputs = { ...validInputs, bonusDepreciation: '90' };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a valid bonus depreciation percentage');
    });

    it('should reject invalid recovery period', () => {
      const invalidInputs = { ...validInputs, recoveryPeriod: '25' };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a valid recovery period');
    });

    it('should reject invalid depreciation method', () => {
      const invalidInputs = { ...validInputs, depreciationMethod: 'invalid' };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a valid depreciation method');
    });

    it('should reject invalid convention', () => {
      const invalidInputs = { ...validInputs, convention: 'invalid' };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please select a valid depreciation convention');
    });

    it('should reject invalid dates', () => {
      const invalidInputs = { ...validInputs, renovationDate: '20221231' };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Renovation date must be after acquisition date');
    });

    it('should reject cost mismatch', () => {
      const invalidInputs = { ...validInputs, totalPropertyCost: 6000000 };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Total property cost should equal sum of all cost components');
    });

    it('should reject excessive prior depreciation', () => {
      const invalidInputs = { ...validInputs, priorDepreciation: 6000000 };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Prior depreciation cannot exceed total depreciable cost');
    });

    it('should reject excessive section 179', () => {
      const invalidInputs = { ...validInputs, section179: 200000 };
      const result = validateCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Section 179 deduction cannot exceed personal property cost');
    });
  });

  describe('Calculation Logic', () => {
    const testInputs = {
      propertyType: 'office',
      totalPropertyCost: 5000000,
      landCost: 1000000,
      buildingCost: 3500000,
      siteImprovements: 300000,
      personalProperty: 150000,
      landImprovements: 50000,
      acquisitionDate: '20230115',
      studyCost: 15000,
      taxYear: 2024,
      marginalTaxRate: 37,
      stateTaxRate: 5,
      propertyAge: 2,
      renovationCost: 200000,
      renovationDate: '20230601',
      propertyUse: 'business',
      ownershipType: 'corporation',
      bonusDepreciation: '80',
      section179: 50000,
      priorDepreciation: 50000,
      recoveryPeriod: '39',
      depreciationMethod: 'straight-line',
      convention: 'mid-month'
    };

    it('should calculate total depreciable cost correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      // 3,500,000 + 300,000 + 150,000 + 50,000 = 4,000,000
      expect(outputs.totalDepreciableCost).toBe(4000000);
    });

    it('should calculate cost segregation allocation correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      // Office building allocations: 5-year: 8%, 7-year: 12%, 15-year: 15%, 39-year: 65%
      expect(outputs.costSegregationAllocation['5-year']).toBe(320000); // 4,000,000 * 0.08
      expect(outputs.costSegregationAllocation['7-year']).toBe(480000); // 4,000,000 * 0.12
      expect(outputs.costSegregationAllocation['15-year']).toBe(600000); // 4,000,000 * 0.15
      expect(outputs.costSegregationAllocation['39-year']).toBe(2600000); // 4,000,000 * 0.65
    });

    it('should calculate accelerated depreciation correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      expect(outputs.acceleratedDepreciation).toBeGreaterThan(0);
    });

    it('should calculate tax savings correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      // Tax savings = accelerated depreciation * (37% + 5%)
      const expectedTaxRate = (37 + 5) / 100;
      expect(outputs.taxSavings).toBe(Math.round(outputs.acceleratedDepreciation * expectedTaxRate));
    });

    it('should calculate present value tax savings correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      expect(outputs.presentValueTaxSavings).toBeGreaterThan(0);
    });

    it('should calculate payback period correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      if (outputs.taxSavings > 0) {
        expect(outputs.paybackPeriod).toBe(Math.round((15000 / outputs.taxSavings) * 12));
      }
    });

    it('should calculate ROI correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      const totalTaxSavings = outputs.depreciationSchedule.reduce((sum, item) => sum + item.totalDepreciation, 0) * 0.42;
      const expectedROI = ((totalTaxSavings - 15000) / 15000) * 100;
      expect(outputs.roi).toBe(Math.round(expectedROI * 10) / 10);
    });

    it('should calculate net present value correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      expect(outputs.netPresentValue).toBe(outputs.presentValueTaxSavings - 15000);
    });

    it('should calculate internal rate of return correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      expect(outputs.internalRateOfReturn).toBeGreaterThan(0);
    });

    it('should calculate depreciation recapture correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      const totalAcceleratedDepreciation = outputs.depreciationSchedule.reduce((sum, item) => sum + item.totalDepreciation, 0);
      expect(outputs.depreciationRecapture).toBe(Math.round(totalAcceleratedDepreciation * 0.25));
    });

    it('should calculate adjusted basis correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      const totalAcceleratedDepreciation = outputs.depreciationSchedule.reduce((sum, item) => sum + item.totalDepreciation, 0);
      expect(outputs.adjustedBasis).toBe(4000000 - 50000 - totalAcceleratedDepreciation);
    });

    it('should calculate gain deferral benefit correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      const totalAcceleratedDepreciation = outputs.depreciationSchedule.reduce((sum, item) => sum + item.totalDepreciation, 0);
      expect(outputs.gainDeferral).toBe(Math.round(totalAcceleratedDepreciation * 0.15));
    });
  });

  describe('Property Type Analysis', () => {
    it('should calculate different allocations for retail property', () => {
      const retailInputs = {
        propertyType: 'retail',
        totalPropertyCost: 3000000,
        landCost: 800000,
        buildingCost: 1800000,
        siteImprovements: 200000,
        personalProperty: 120000,
        landImprovements: 80000,
        acquisitionDate: '20220301',
        studyCost: 12000,
        taxYear: 2024,
        marginalTaxRate: 32,
        stateTaxRate: 7,
        propertyAge: 3,
        renovationCost: 150000,
        renovationDate: '20230915',
        propertyUse: 'rental',
        ownershipType: 'llc',
        bonusDepreciation: '80',
        section179: 30000,
        priorDepreciation: 75000,
        recoveryPeriod: '39',
        depreciationMethod: 'straight-line',
        convention: 'mid-month'
      };

      const outputs = calculateCostSegregation(retailInputs);
      // Retail allocations: 5-year: 12%, 7-year: 15%, 15-year: 18%, 39-year: 55%
      expect(outputs.costSegregationAllocation['5-year']).toBe(264000); // 2,200,000 * 0.12
      expect(outputs.costSegregationAllocation['7-year']).toBe(330000); // 2,200,000 * 0.15
      expect(outputs.costSegregationAllocation['15-year']).toBe(396000); // 2,200,000 * 0.18
      expect(outputs.costSegregationAllocation['39-year']).toBe(1210000); // 2,200,000 * 0.55
    });

    it('should calculate different allocations for warehouse property', () => {
      const warehouseInputs = {
        propertyType: 'warehouse',
        totalPropertyCost: 8000000,
        landCost: 2000000,
        buildingCost: 5000000,
        siteImprovements: 500000,
        personalProperty: 300000,
        landImprovements: 200000,
        acquisitionDate: '20210701',
        studyCost: 20000,
        taxYear: 2024,
        marginalTaxRate: 24,
        stateTaxRate: 0,
        propertyAge: 4,
        renovationCost: 300000,
        renovationDate: '20231201',
        propertyUse: 'business',
        ownershipType: 'partnership',
        bonusDepreciation: '60',
        section179: 75000,
        priorDepreciation: 120000,
        recoveryPeriod: '39',
        depreciationMethod: 'straight-line',
        convention: 'mid-month'
      };

      const outputs = calculateCostSegregation(warehouseInputs);
      // Warehouse allocations: 5-year: 6%, 7-year: 10%, 15-year: 12%, 39-year: 72%
      expect(outputs.costSegregationAllocation['5-year']).toBe(360000); // 6,000,000 * 0.06
      expect(outputs.costSegregationAllocation['7-year']).toBe(600000); // 6,000,000 * 0.10
      expect(outputs.costSegregationAllocation['15-year']).toBe(720000); // 6,000,000 * 0.12
      expect(outputs.costSegregationAllocation['39-year']).toBe(4320000); // 6,000,000 * 0.72
    });
  });

  describe('Depreciation Schedule Analysis', () => {
    const testInputs = {
      propertyType: 'office',
      totalPropertyCost: 5000000,
      landCost: 1000000,
      buildingCost: 3500000,
      siteImprovements: 300000,
      personalProperty: 150000,
      landImprovements: 50000,
      acquisitionDate: '20230115',
      studyCost: 15000,
      taxYear: 2024,
      marginalTaxRate: 37,
      stateTaxRate: 5,
      propertyAge: 2,
      renovationCost: 200000,
      renovationDate: '20230601',
      propertyUse: 'business',
      ownershipType: 'corporation',
      bonusDepreciation: '80',
      section179: 50000,
      priorDepreciation: 50000,
      recoveryPeriod: '39',
      depreciationMethod: 'straight-line',
      convention: 'mid-month'
    };

    it('should generate depreciation schedule correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      expect(outputs.depreciationSchedule).toBeDefined();
      expect(Array.isArray(outputs.depreciationSchedule)).toBe(true);
      expect(outputs.depreciationSchedule.length).toBeGreaterThan(0);
    });

    it('should calculate cumulative depreciation correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      const schedule = outputs.depreciationSchedule;
      expect(schedule[schedule.length - 1].cumulativeDepreciation).toBeGreaterThan(0);
    });

    it('should generate cash flow impact correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      expect(outputs.cashFlowImpact).toBeDefined();
      expect(Array.isArray(outputs.cashFlowImpact)).toBe(true);
      expect(outputs.cashFlowImpact.length).toBeGreaterThan(0);
    });

    it('should calculate tax savings in cash flow correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      const cashFlow = outputs.cashFlowImpact;
      const totalTaxRate = (37 + 5) / 100;
      
      cashFlow.forEach((item, index) => {
        const expectedTaxSavings = outputs.depreciationSchedule[index].totalDepreciation * totalTaxRate;
        expect(item.taxSavings).toBe(Math.round(expectedTaxSavings));
      });
    });
  });

  describe('Compliance Risk Assessment', () => {
    const testInputs = {
      propertyType: 'office',
      totalPropertyCost: 5000000,
      landCost: 1000000,
      buildingCost: 3500000,
      siteImprovements: 300000,
      personalProperty: 150000,
      landImprovements: 50000,
      acquisitionDate: '20230115',
      studyCost: 15000,
      taxYear: 2024,
      marginalTaxRate: 37,
      stateTaxRate: 5,
      propertyAge: 2,
      renovationCost: 200000,
      renovationDate: '20230601',
      propertyUse: 'business',
      ownershipType: 'corporation',
      bonusDepreciation: '80',
      section179: 50000,
      priorDepreciation: 50000,
      recoveryPeriod: '39',
      depreciationMethod: 'straight-line',
      convention: 'mid-month'
    };

    it('should generate compliance risk assessment correctly', () => {
      const outputs = calculateCostSegregation(testInputs);
      expect(outputs.complianceRisk).toBeDefined();
      expect(outputs.complianceRisk.risks).toBeDefined();
      expect(outputs.complianceRisk.riskScore).toBeDefined();
      expect(outputs.complianceRisk.overallRisk).toBeDefined();
    });

    it('should identify property age risks', () => {
      const oldPropertyInputs = { ...testInputs, propertyAge: 20 };
      const outputs = calculateCostSegregation(oldPropertyInputs);
      const ageRisk = outputs.complianceRisk.risks.find((risk: any) => risk.type === 'property-age');
      expect(ageRisk).toBeDefined();
      expect(ageRisk.severity).toBe('high');
    });

    it('should identify cost-benefit risks', () => {
      const expensiveStudyInputs = { ...testInputs, studyCost: 50000 };
      const outputs = calculateCostSegregation(expensiveStudyInputs);
      const costBenefitRisk = outputs.complianceRisk.risks.find((risk: any) => risk.type === 'cost-benefit');
      expect(costBenefitRisk).toBeDefined();
    });

    it('should identify documentation risks', () => {
      const outputs = calculateCostSegregation(testInputs);
      const documentationRisk = outputs.complianceRisk.risks.find((risk: any) => risk.type === 'documentation');
      expect(documentationRisk).toBeDefined();
    });

    it('should identify recapture risks', () => {
      const outputs = calculateCostSegregation(testInputs);
      if (outputs.depreciationRecapture > 0) {
        const recaptureRisk = outputs.complianceRisk.risks.find((risk: any) => risk.type === 'recapture');
        expect(recaptureRisk).toBeDefined();
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero study cost', () => {
      const inputs = {
        propertyType: 'office',
        totalPropertyCost: 1000000,
        landCost: 200000,
        buildingCost: 700000,
        siteImprovements: 60000,
        personalProperty: 30000,
        landImprovements: 10000,
        acquisitionDate: '20230101',
        studyCost: 0,
        taxYear: 2024,
        marginalTaxRate: 24,
        stateTaxRate: 5,
        propertyAge: 1,
        renovationCost: 0,
        renovationDate: '20230101',
        propertyUse: 'business',
        ownershipType: 'individual',
        bonusDepreciation: '100',
        section179: 0,
        priorDepreciation: 0,
        recoveryPeriod: '39',
        depreciationMethod: 'straight-line',
        convention: 'mid-month'
      };

      const outputs = calculateCostSegregation(inputs);
      expect(outputs.paybackPeriod).toBe(0);
      expect(outputs.roi).toBe(Infinity);
    });

    it('should handle maximum property values', () => {
      const inputs = {
        propertyType: 'hotel',
        totalPropertyCost: 100000000,
        landCost: 20000000,
        buildingCost: 70000000,
        siteImprovements: 5000000,
        personalProperty: 2000000,
        landImprovements: 3000000,
        acquisitionDate: '20230101',
        studyCost: 50000,
        taxYear: 2024,
        marginalTaxRate: 37,
        stateTaxRate: 10,
        propertyAge: 1,
        renovationCost: 5000000,
        renovationDate: '20231201',
        propertyUse: 'business',
        ownershipType: 'corporation',
        bonusDepreciation: '80',
        section179: 1000000,
        priorDepreciation: 0,
        recoveryPeriod: '39',
        depreciationMethod: 'straight-line',
        convention: 'mid-month'
      };

      const outputs = calculateCostSegregation(inputs);
      expect(outputs.totalDepreciableCost).toBe(80000000);
      expect(outputs.costSegregationAllocation['5-year']).toBe(12000000); // 80M * 0.15
    });

    it('should handle minimum property values', () => {
      const inputs = {
        propertyType: 'apartment',
        totalPropertyCost: 100000,
        landCost: 20000,
        buildingCost: 70000,
        siteImprovements: 5000,
        personalProperty: 3000,
        landImprovements: 2000,
        acquisitionDate: '20230101',
        studyCost: 5000,
        taxYear: 2024,
        marginalTaxRate: 12,
        stateTaxRate: 0,
        propertyAge: 1,
        renovationCost: 0,
        renovationDate: '20230101',
        propertyUse: 'rental',
        ownershipType: 'individual',
        bonusDepreciation: '100',
        section179: 0,
        priorDepreciation: 0,
        recoveryPeriod: '27.5',
        depreciationMethod: 'straight-line',
        convention: 'mid-month'
      };

      const outputs = calculateCostSegregation(inputs);
      expect(outputs.totalDepreciableCost).toBe(80000);
      expect(outputs.costSegregationAllocation['5-year']).toBe(4000); // 80K * 0.05
    });
  });

  describe('Quick Validation', () => {
    it('should validate individual fields correctly', () => {
      const { validateTotalPropertyCost } = require('./quickValidation');
      
      expect(validateTotalPropertyCost(5000000).isValid).toBe(true);
      expect(validateTotalPropertyCost(50000).isValid).toBe(false);
      expect(validateTotalPropertyCost('invalid').isValid).toBe(false);
      expect(validateTotalPropertyCost('').isValid).toBe(false);
    });

    it('should validate all inputs correctly', () => {
      const validInputs = {
        propertyType: 'office',
        totalPropertyCost: 5000000,
        landCost: 1000000,
        buildingCost: 3500000,
        siteImprovements: 300000,
        personalProperty: 150000,
        landImprovements: 50000,
        acquisitionDate: '20230115',
        studyCost: 15000,
        taxYear: 2024,
        marginalTaxRate: 37,
        stateTaxRate: 5,
        propertyAge: 2,
        renovationCost: 200000,
        renovationDate: '20230601',
        propertyUse: 'business',
        ownershipType: 'corporation',
        bonusDepreciation: '80',
        section179: 50000,
        priorDepreciation: 50000,
        recoveryPeriod: '39',
        depreciationMethod: 'straight-line',
        convention: 'mid-month'
      };

      const result = validateAllCostSegregationInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch validation errors in quick validation', () => {
      const invalidInputs = {
        propertyType: 'invalid',
        totalPropertyCost: 50000, // Too low
        landCost: 1000000,
        buildingCost: 3500000,
        siteImprovements: 300000,
        personalProperty: 150000,
        landImprovements: 50000,
        acquisitionDate: '20230115',
        studyCost: 2000, // Too low
        taxYear: 2010, // Too old
        marginalTaxRate: 37,
        stateTaxRate: 5,
        propertyAge: 2,
        renovationCost: 200000,
        renovationDate: '20230601',
        propertyUse: 'invalid',
        ownershipType: 'corporation',
        bonusDepreciation: '90', // Invalid
        section179: 50000,
        priorDepreciation: 50000,
        recoveryPeriod: '25', // Invalid
        depreciationMethod: 'straight-line',
        convention: 'mid-month'
      };

      const result = validateAllCostSegregationInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
