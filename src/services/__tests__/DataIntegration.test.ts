import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DataService } from '../DataService';
import { DataVersioningService } from '../DataVersioningService';
import { DataValidationService } from '../DataValidationService';
import { DataUpdateScheduler } from '../DataUpdateScheduler';

describe('Data Integration System', () => {
  let dataService: DataService;
  let versioningService: DataVersioningService;
  let validationService: DataValidationService;
  let scheduler: DataUpdateScheduler;

  beforeEach(() => {
    dataService = new DataService();
    versioningService = new DataVersioningService();
    validationService = new DataValidationService();
    scheduler = new DataUpdateScheduler();
  });

  afterEach(() => {
    scheduler.stop();
  });

  describe('DataService', () => {
    it('should fetch mortgage rates data', async () => {
      const data = await dataService.getMortgageRates();
      
      expect(data).toBeDefined();
      expect(data.conventional30).toBeGreaterThan(0);
      expect(data.conventional15).toBeGreaterThan(0);
      expect(data.fha30).toBeGreaterThan(0);
      expect(data.va30).toBeGreaterThan(0);
      expect(data.jumbo30).toBeGreaterThan(0);
      expect(data.lastUpdated).toBeInstanceOf(Date);
    });

    it('should fetch regional property data', async () => {
      const propertyTaxRate = await dataService.getRegionalData('propertyTaxRates', 'CA');
      const insuranceRate = await dataService.getRegionalData('insuranceRates', 'TX');
      
      expect(propertyTaxRate).toBeGreaterThan(0);
      expect(propertyTaxRate).toBeLessThan(0.1); // Should be reasonable percentage
      expect(insuranceRate).toBeGreaterThan(0);
      expect(insuranceRate).toBeLessThan(0.1);
    });

    it('should fetch legal multipliers', async () => {
      const multipliers = await dataService.getLegalMultipliers('CA');
      
      expect(multipliers).toBeDefined();
      expect(multipliers.minor).toBeGreaterThan(1);
      expect(multipliers.moderate).toBeGreaterThan(multipliers.minor);
      expect(multipliers.severe).toBeGreaterThan(multipliers.moderate);
    });

    it('should handle fallback data when API fails', async () => {
      // Mock API failure
      vi.spyOn(dataService as any, 'fetchFromSource').mockRejectedValue(new Error('API Error'));
      
      const data = await dataService.getMortgageRates();
      
      expect(data).toBeDefined();
      expect(data.conventional30).toBeGreaterThan(0); // Should get fallback data
    });

    it('should cache data properly', async () => {
      const start1 = Date.now();
      await dataService.getMortgageRates();
      const duration1 = Date.now() - start1;

      const start2 = Date.now();
      await dataService.getMortgageRates();
      const duration2 = Date.now() - start2;

      // Second call should be much faster (cached)
      expect(duration2).toBeLessThan(duration1);
    });

    it('should provide cache statistics', () => {
      const stats = dataService.getCacheStats();
      
      expect(stats).toBeDefined();
      expect(stats.totalEntries).toBeGreaterThanOrEqual(0);
      expect(stats.expiredEntries).toBeGreaterThanOrEqual(0);
      expect(stats.hitRate).toBeGreaterThanOrEqual(0);
      expect(stats.hitRate).toBeLessThanOrEqual(1);
    });
  });

  describe('DataVersioningService', () => {
    it('should store and retrieve data versions', () => {
      const testData = { rate: 7.25, timestamp: new Date() };
      const versionId = versioningService.storeDataVersion('test-source', testData, {
        source: 'test',
        updateReason: 'unit test'
      });

      expect(versionId).toBeDefined();
      expect(typeof versionId).toBe('string');

      const retrievedVersion = versioningService.getDataVersion('test-source', versionId);
      expect(retrievedVersion).toBeDefined();
      expect(retrievedVersion?.data).toEqual(testData);
    });

    it('should not create duplicate versions for identical data', () => {
      const testData = { rate: 7.25 };
      
      const versionId1 = versioningService.storeDataVersion('test-source', testData, {
        source: 'test',
        updateReason: 'first'
      });
      
      const versionId2 = versioningService.storeDataVersion('test-source', testData, {
        source: 'test',
        updateReason: 'second'
      });

      expect(versionId1).toBe(versionId2);
    });

    it('should retrieve data at specific timestamp', () => {
      const timestamp1 = new Date('2024-01-01');
      const timestamp2 = new Date('2024-01-02');
      const timestamp3 = new Date('2024-01-03');

      // Store versions at different times
      versioningService.storeDataVersion('test-source', { value: 1 }, {
        source: 'test',
        updateReason: 'first'
      });

      // Manually set timestamp for testing
      const versions = (versioningService as any).versions.get('test-source');
      if (versions && versions.length > 0) {
        versions[0].timestamp = timestamp1;
      }

      versioningService.storeDataVersion('test-source', { value: 2 }, {
        source: 'test',
        updateReason: 'second'
      });

      if (versions && versions.length > 1) {
        versions[1].timestamp = timestamp2;
      }

      const dataAtTimestamp = versioningService.getDataAtTimestamp('test-source', timestamp3);
      expect(dataAtTimestamp?.data.value).toBe(2); // Should get latest available
    });

    it('should store and retrieve calculation history', () => {
      const calculationId = versioningService.storeCalculation(
        'test-calculator',
        { input1: 100 },
        { output1: 200 },
        { 'test-source': 'version-1' }
      );

      expect(calculationId).toBeDefined();

      const history = versioningService.getCalculationHistory('test-calculator');
      expect(history).toHaveLength(1);
      expect(history[0].inputs.input1).toBe(100);
      expect(history[0].outputs.output1).toBe(200);
    });

    it('should compare data versions', () => {
      const data1 = { rate: 7.25, fees: 100 };
      const data2 = { rate: 7.50, fees: 100, newField: 'test' };

      const versionId1 = versioningService.storeDataVersion('test-source', data1, {
        source: 'test',
        updateReason: 'first'
      });

      const versionId2 = versioningService.storeDataVersion('test-source', data2, {
        source: 'test',
        updateReason: 'second'
      });

      const comparison = versioningService.compareVersions('test-source', versionId1, versionId2);
      
      expect(comparison.differences).toHaveLength(2); // rate changed, newField added
      expect(comparison.differences.some(d => d.path === 'rate' && d.type === 'modified')).toBe(true);
      expect(comparison.differences.some(d => d.path === 'newField' && d.type === 'added')).toBe(true);
    });
  });

  describe('DataValidationService', () => {
    it('should validate mortgage rates data', () => {
      const validData = {
        conventional30: 7.25,
        conventional15: 6.75,
        fha30: 7.00,
        va30: 6.95,
        jumbo30: 7.45,
        lastUpdated: new Date()
      };

      const report = validationService.validateData('mortgage-rates', validData);
      
      expect(report.overallScore).toBeGreaterThan(80);
      expect(report.errors).toBe(0);
    });

    it('should detect invalid mortgage rates', () => {
      const invalidData = {
        conventional30: 25, // Too high
        conventional15: 8.0, // Higher than 30-year (warning)
        fha30: 7.00,
        va30: 6.95,
        jumbo30: 7.45,
        lastUpdated: new Date('2020-01-01') // Old data (warning)
      };

      const report = validationService.validateData('mortgage-rates', invalidData);
      
      expect(report.errors).toBeGreaterThan(0);
      expect(report.warnings).toBeGreaterThan(0);
      expect(report.overallScore).toBeLessThan(100);
    });

    it('should validate regional property data', () => {
      const validData = {
        propertyTaxRates: {
          'CA': 0.0075,
          'TX': 0.0181,
          'FL': 0.0098,
          'default': 0.0110
        },
        insuranceRates: {
          'CA': 0.0035,
          'TX': 0.0045,
          'FL': 0.0065,
          'default': 0.0040
        }
      };

      const report = validationService.validateData('regional-property-data', validData);
      
      expect(report.errors).toBe(0);
      expect(report.overallScore).toBeGreaterThan(80);
    });

    it('should generate quality summary', () => {
      const reports = [
        {
          sourceId: 'source1',
          timestamp: new Date(),
          overallScore: 90,
          totalRules: 5,
          passedRules: 5,
          failedRules: 0,
          warnings: 0,
          errors: 0,
          results: [],
          recommendations: []
        },
        {
          sourceId: 'source2',
          timestamp: new Date(),
          overallScore: 70,
          totalRules: 5,
          passedRules: 3,
          failedRules: 2,
          warnings: 1,
          errors: 1,
          results: [],
          recommendations: []
        }
      ];

      const summary = validationService.getQualitySummary(reports);
      
      expect(summary.averageScore).toBe(80);
      expect(summary.totalSources).toBe(2);
      expect(summary.sourcesWithErrors).toBe(1);
      expect(summary.sourcesWithWarnings).toBe(1);
      expect(summary.worstPerformingSource).toBe('source2');
      expect(summary.bestPerformingSource).toBe('source1');
    });
  });

  describe('DataUpdateScheduler', () => {
    it('should schedule and track jobs', () => {
      const jobId = scheduler.scheduleJob('test-source', new Date(), 'normal');
      
      expect(jobId).toBeDefined();
      expect(typeof jobId).toBe('string');

      const job = scheduler.getJobStatus(jobId);
      expect(job).toBeDefined();
      expect(job?.sourceId).toBe('test-source');
      expect(job?.status).toBe('pending');
    });

    it('should schedule immediate updates', () => {
      const jobId = scheduler.scheduleImmediateUpdate('test-source', 'high');
      
      const job = scheduler.getJobStatus(jobId);
      expect(job?.priority).toBe('high');
      expect(job?.scheduledTime.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('should cancel jobs', () => {
      const jobId = scheduler.scheduleJob('test-source', new Date(Date.now() + 60000), 'normal');
      
      const cancelled = scheduler.cancelJob(jobId);
      expect(cancelled).toBe(true);

      const job = scheduler.getJobStatus(jobId);
      expect(job?.status).toBe('cancelled');
    });

    it('should provide statistics', () => {
      scheduler.scheduleJob('test-source-1', new Date(), 'normal');
      scheduler.scheduleJob('test-source-2', new Date(), 'high');
      
      const stats = scheduler.getStatistics();
      
      expect(stats.totalJobs).toBeGreaterThanOrEqual(2);
      expect(stats.pendingJobs).toBeGreaterThanOrEqual(2);
      expect(stats.successRate).toBeGreaterThanOrEqual(0);
    });

    it('should start and stop scheduler', () => {
      expect(() => scheduler.start()).not.toThrow();
      expect(() => scheduler.stop()).not.toThrow();
    });
  });

  describe('Integration Tests', () => {
    it('should integrate data service with versioning', async () => {
      const data = await dataService.getMortgageRates();
      
      const versionId = versioningService.storeDataVersion('mortgage-rates', data, {
        source: 'integration-test',
        updateReason: 'test integration'
      });

      const storedVersion = versioningService.getDataVersion('mortgage-rates', versionId);
      expect(storedVersion?.data).toEqual(data);
    });

    it('should integrate data service with validation', async () => {
      const data = await dataService.getMortgageRates();
      const report = validationService.validateData('mortgage-rates', data);
      
      expect(report.sourceId).toBe('mortgage-rates');
      expect(report.totalRules).toBeGreaterThan(0);
    });

    it('should handle complete data update workflow', async () => {
      // 1. Fetch data
      const data = await dataService.getMortgageRates();
      
      // 2. Validate data
      const validationReport = validationService.validateData('mortgage-rates', data);
      expect(validationReport.errors).toBe(0);
      
      // 3. Store version
      const versionId = versioningService.storeDataVersion('mortgage-rates', data, {
        source: 'workflow-test',
        updateReason: 'complete workflow test'
      });
      
      // 4. Track calculation
      const calculationId = versioningService.storeCalculation(
        'test-calculator',
        { loanAmount: 300000 },
        { monthlyPayment: 2000 },
        { 'mortgage-rates': versionId }
      );
      
      expect(calculationId).toBeDefined();
      
      // 5. Verify reproducibility
      const reproduction = await versioningService.reproduceCalculation(calculationId);
      expect(reproduction.isReproducible).toBe(true);
    });
  });
});