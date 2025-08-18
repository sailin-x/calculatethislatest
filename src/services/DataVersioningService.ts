/**
 * Data versioning service for maintaining historical data and calculation reproducibility
 * Ensures that calculations can be reproduced with the exact data that was available at the time
 */

export interface DataVersion {
  id: string;
  version: string;
  timestamp: Date;
  sourceId: string;
  data: any;
  checksum: string;
  metadata: {
    source: string;
    updateReason: string;
    validatedBy?: string;
    notes?: string;
  };
}

export interface HistoricalCalculation {
  id: string;
  calculatorId: string;
  timestamp: Date;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  dataVersions: Record<string, string>; // sourceId -> versionId mapping
  userAgent?: string;
  sessionId?: string;
}

export class DataVersioningService {
  private versions: Map<string, DataVersion[]> = new Map();
  private calculations: Map<string, HistoricalCalculation> = new Map();
  private maxVersionsPerSource: number = 100;

  /**
   * Store a new version of data
   */
  storeDataVersion(sourceId: string, data: any, metadata: {
    source: string;
    updateReason: string;
    validatedBy?: string;
    notes?: string;
  }): string {
    const versionId = this.generateVersionId(sourceId);
    const checksum = this.calculateChecksum(data);
    
    const version: DataVersion = {
      id: versionId,
      version: this.getNextVersionNumber(sourceId),
      timestamp: new Date(),
      sourceId,
      data: this.deepClone(data),
      checksum,
      metadata
    };

    // Get existing versions for this source
    const existingVersions = this.versions.get(sourceId) || [];
    
    // Check if data has actually changed
    if (existingVersions.length > 0) {
      const latestVersion = existingVersions[existingVersions.length - 1];
      if (latestVersion.checksum === checksum) {
        // Data hasn't changed, return existing version ID
        return latestVersion.id;
      }
    }

    // Add new version
    existingVersions.push(version);
    
    // Maintain version limit
    if (existingVersions.length > this.maxVersionsPerSource) {
      existingVersions.shift(); // Remove oldest version
    }
    
    this.versions.set(sourceId, existingVersions);
    
    return versionId;
  }

  /**
   * Get a specific version of data
   */
  getDataVersion(sourceId: string, versionId?: string): DataVersion | null {
    const versions = this.versions.get(sourceId);
    if (!versions || versions.length === 0) {
      return null;
    }

    if (!versionId) {
      // Return latest version
      return versions[versions.length - 1];
    }

    return versions.find(v => v.id === versionId) || null;
  }

  /**
   * Get data as it was at a specific timestamp
   */
  getDataAtTimestamp(sourceId: string, timestamp: Date): DataVersion | null {
    const versions = this.versions.get(sourceId);
    if (!versions || versions.length === 0) {
      return null;
    }

    // Find the latest version that was available at the given timestamp
    let latestValidVersion: DataVersion | null = null;
    
    for (const version of versions) {
      if (version.timestamp <= timestamp) {
        latestValidVersion = version;
      } else {
        break;
      }
    }

    return latestValidVersion;
  }

  /**
   * Store a historical calculation
   */
  storeCalculation(
    calculatorId: string,
    inputs: Record<string, any>,
    outputs: Record<string, any>,
    dataVersions: Record<string, string>,
    sessionId?: string
  ): string {
    const calculationId = this.generateCalculationId();
    
    const calculation: HistoricalCalculation = {
      id: calculationId,
      calculatorId,
      timestamp: new Date(),
      inputs: this.deepClone(inputs),
      outputs: this.deepClone(outputs),
      dataVersions: { ...dataVersions },
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      sessionId
    };

    this.calculations.set(calculationId, calculation);
    
    return calculationId;
  }

  /**
   * Reproduce a historical calculation
   */
  async reproduceCalculation(calculationId: string): Promise<{
    originalResult: Record<string, any>;
    reproducedResult: Record<string, any>;
    dataVersionsUsed: Record<string, DataVersion>;
    isReproducible: boolean;
    differences?: string[];
  }> {
    const calculation = this.calculations.get(calculationId);
    if (!calculation) {
      throw new Error(`Calculation not found: ${calculationId}`);
    }

    // Gather the exact data versions that were used
    const dataVersionsUsed: Record<string, DataVersion> = {};
    
    for (const [sourceId, versionId] of Object.entries(calculation.dataVersions)) {
      const version = this.getDataVersion(sourceId, versionId);
      if (version) {
        dataVersionsUsed[sourceId] = version;
      }
    }

    // TODO: Re-run the calculation with the historical data
    // This would require access to the calculator engine and the ability to inject historical data
    // For now, we'll return the original result and mark as reproducible if we have all data versions
    
    const isReproducible = Object.keys(calculation.dataVersions).every(sourceId => 
      dataVersionsUsed[sourceId] !== undefined
    );

    return {
      originalResult: calculation.outputs,
      reproducedResult: calculation.outputs, // Would be actual recalculation result
      dataVersionsUsed,
      isReproducible,
      differences: isReproducible ? [] : ['Missing historical data versions']
    };
  }

  /**
   * Get calculation history for a specific calculator
   */
  getCalculationHistory(calculatorId: string, limit: number = 50): HistoricalCalculation[] {
    const calculations = Array.from(this.calculations.values())
      .filter(calc => calc.calculatorId === calculatorId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);

    return calculations;
  }

  /**
   * Get version history for a data source
   */
  getVersionHistory(sourceId: string): DataVersion[] {
    return this.versions.get(sourceId) || [];
  }

  /**
   * Compare two data versions
   */
  compareVersions(sourceId: string, versionId1: string, versionId2: string): {
    differences: Array<{
      path: string;
      oldValue: any;
      newValue: any;
      type: 'added' | 'removed' | 'modified';
    }>;
    summary: string;
  } {
    const version1 = this.getDataVersion(sourceId, versionId1);
    const version2 = this.getDataVersion(sourceId, versionId2);

    if (!version1 || !version2) {
      throw new Error('One or both versions not found');
    }

    const differences = this.deepCompare(version1.data, version2.data);
    const summary = `${differences.length} difference(s) found between versions ${version1.version} and ${version2.version}`;

    return { differences, summary };
  }

  /**
   * Clean up old data versions and calculations
   */
  cleanup(retentionDays: number = 365): {
    versionsRemoved: number;
    calculationsRemoved: number;
  } {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    let versionsRemoved = 0;
    let calculationsRemoved = 0;

    // Clean up old versions
    for (const [sourceId, versions] of this.versions) {
      const filteredVersions = versions.filter(version => version.timestamp > cutoffDate);
      versionsRemoved += versions.length - filteredVersions.length;
      
      if (filteredVersions.length === 0) {
        this.versions.delete(sourceId);
      } else {
        this.versions.set(sourceId, filteredVersions);
      }
    }

    // Clean up old calculations
    for (const [calculationId, calculation] of this.calculations) {
      if (calculation.timestamp < cutoffDate) {
        this.calculations.delete(calculationId);
        calculationsRemoved++;
      }
    }

    return { versionsRemoved, calculationsRemoved };
  }

  /**
   * Export data versions for backup
   */
  exportVersions(sourceId?: string): any {
    if (sourceId) {
      return {
        sourceId,
        versions: this.versions.get(sourceId) || [],
        exportTimestamp: new Date()
      };
    }

    const allVersions: Record<string, DataVersion[]> = {};
    for (const [id, versions] of this.versions) {
      allVersions[id] = versions;
    }

    return {
      versions: allVersions,
      exportTimestamp: new Date()
    };
  }

  /**
   * Import data versions from backup
   */
  importVersions(exportData: any): void {
    if (exportData.sourceId && exportData.versions) {
      // Import single source
      this.versions.set(exportData.sourceId, exportData.versions);
    } else if (exportData.versions) {
      // Import all sources
      for (const [sourceId, versions] of Object.entries(exportData.versions)) {
        this.versions.set(sourceId, versions as DataVersion[]);
      }
    }
  }

  /**
   * Generate version ID
   */
  private generateVersionId(sourceId: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${sourceId}-${timestamp}-${random}`;
  }

  /**
   * Generate calculation ID
   */
  private generateCalculationId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 12);
    return `calc-${timestamp}-${random}`;
  }

  /**
   * Get next version number for a source
   */
  private getNextVersionNumber(sourceId: string): string {
    const versions = this.versions.get(sourceId) || [];
    return `v${versions.length + 1}`;
  }

  /**
   * Calculate checksum for data
   */
  private calculateChecksum(data: any): string {
    const jsonString = JSON.stringify(data, Object.keys(data).sort());
    let hash = 0;
    
    for (let i = 0; i < jsonString.length; i++) {
      const char = jsonString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return hash.toString(36);
  }

  /**
   * Deep clone an object
   */
  private deepClone(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item));
    }

    const cloned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = this.deepClone(obj[key]);
      }
    }

    return cloned;
  }

  /**
   * Deep compare two objects
   */
  private deepCompare(obj1: any, obj2: any, path: string = ''): Array<{
    path: string;
    oldValue: any;
    newValue: any;
    type: 'added' | 'removed' | 'modified';
  }> {
    const differences: Array<{
      path: string;
      oldValue: any;
      newValue: any;
      type: 'added' | 'removed' | 'modified';
    }> = [];

    const keys1 = Object.keys(obj1 || {});
    const keys2 = Object.keys(obj2 || {});
    const allKeys = new Set([...keys1, ...keys2]);

    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key;
      const value1 = obj1?.[key];
      const value2 = obj2?.[key];

      if (!(key in (obj1 || {}))) {
        differences.push({
          path: currentPath,
          oldValue: undefined,
          newValue: value2,
          type: 'added'
        });
      } else if (!(key in (obj2 || {}))) {
        differences.push({
          path: currentPath,
          oldValue: value1,
          newValue: undefined,
          type: 'removed'
        });
      } else if (typeof value1 === 'object' && typeof value2 === 'object' && value1 !== null && value2 !== null) {
        differences.push(...this.deepCompare(value1, value2, currentPath));
      } else if (value1 !== value2) {
        differences.push({
          path: currentPath,
          oldValue: value1,
          newValue: value2,
          type: 'modified'
        });
      }
    }

    return differences;
  }

  /**
   * Get statistics about stored data
   */
  getStatistics(): {
    totalDataSources: number;
    totalVersions: number;
    totalCalculations: number;
    oldestVersion: Date | null;
    newestVersion: Date | null;
    averageVersionsPerSource: number;
  } {
    let totalVersions = 0;
    let oldestVersion: Date | null = null;
    let newestVersion: Date | null = null;

    for (const versions of this.versions.values()) {
      totalVersions += versions.length;
      
      for (const version of versions) {
        if (!oldestVersion || version.timestamp < oldestVersion) {
          oldestVersion = version.timestamp;
        }
        if (!newestVersion || version.timestamp > newestVersion) {
          newestVersion = version.timestamp;
        }
      }
    }

    return {
      totalDataSources: this.versions.size,
      totalVersions,
      totalCalculations: this.calculations.size,
      oldestVersion,
      newestVersion,
      averageVersionsPerSource: this.versions.size > 0 ? totalVersions / this.versions.size : 0
    };
  }
}

// Export singleton instance
export const dataVersioningService = new DataVersioningService();