/**
 * Automated data update scheduler for managing periodic updates of external data sources
 * Handles scheduling, retry logic, and failure notifications
 */

import { dataService, DataSource } from './DataService';
import { dataVersioningService } from './DataVersioningService';

export interface UpdateJob {
  id: string;
  sourceId: string;
  scheduledTime: Date;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  attempts: number;
  maxAttempts: number;
  lastAttempt?: Date;
  lastError?: string;
  duration?: number;
  priority: 'low' | 'normal' | 'high' | 'critical';
}

export interface UpdateResult {
  success: boolean;
  sourceId: string;
  duration: number;
  recordsUpdated?: number;
  error?: string;
  versionId?: string;
}

export interface SchedulerConfig {
  maxConcurrentJobs: number;
  defaultRetryAttempts: number;
  retryDelayMinutes: number;
  healthCheckIntervalMinutes: number;
  enableNotifications: boolean;
}

export class DataUpdateScheduler {
  private jobs: Map<string, UpdateJob> = new Map();
  private runningJobs: Set<string> = new Set();
  private schedulerTimer: NodeJS.Timeout | null = null;
  private healthCheckTimer: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;

  private config: SchedulerConfig = {
    maxConcurrentJobs: 3,
    defaultRetryAttempts: 3,
    retryDelayMinutes: 15,
    healthCheckIntervalMinutes: 60,
    enableNotifications: true
  };

  constructor(config?: Partial<SchedulerConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  /**
   * Start the scheduler
   */
  start(): void {
    if (this.isRunning) {
      console.warn('Scheduler is already running');
      return;
    }

    this.isRunning = true;
    console.log('Starting data update scheduler');

    // Schedule initial jobs for all data sources
    this.scheduleInitialJobs();

    // Start the main scheduler loop
    this.schedulerTimer = setInterval(() => {
      this.processJobs();
    }, 60000); // Check every minute

    // Start health check timer
    this.healthCheckTimer = setInterval(() => {
      this.performHealthCheck();
    }, this.config.healthCheckIntervalMinutes * 60000);

    console.log('Data update scheduler started successfully');
  }

  /**
   * Stop the scheduler
   */
  stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    console.log('Stopping data update scheduler');

    // Clear timers
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }

    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
      this.healthCheckTimer = null;
    }

    // Cancel pending jobs
    for (const job of this.jobs.values()) {
      if (job.status === 'pending') {
        job.status = 'cancelled';
      }
    }

    console.log('Data update scheduler stopped');
  }

  /**
   * Schedule a job for a specific data source
   */
  scheduleJob(
    sourceId: string, 
    scheduledTime: Date, 
    priority: 'low' | 'normal' | 'high' | 'critical' = 'normal'
  ): string {
    const jobId = this.generateJobId(sourceId);
    
    const job: UpdateJob = {
      id: jobId,
      sourceId,
      scheduledTime,
      status: 'pending',
      attempts: 0,
      maxAttempts: this.config.defaultRetryAttempts,
      priority
    };

    this.jobs.set(jobId, job);
    console.log(`Scheduled job ${jobId} for source ${sourceId} at ${scheduledTime.toISOString()}`);
    
    return jobId;
  }

  /**
   * Schedule immediate update for a data source
   */
  scheduleImmediateUpdate(sourceId: string, priority: 'high' | 'critical' = 'high'): string {
    const now = new Date();
    return this.scheduleJob(sourceId, now, priority);
  }

  /**
   * Cancel a scheduled job
   */
  cancelJob(jobId: string): boolean {
    const job = this.jobs.get(jobId);
    if (!job) {
      return false;
    }

    if (job.status === 'running') {
      console.warn(`Cannot cancel running job ${jobId}`);
      return false;
    }

    job.status = 'cancelled';
    console.log(`Cancelled job ${jobId}`);
    return true;
  }

  /**
   * Get job status
   */
  getJobStatus(jobId: string): UpdateJob | null {
    return this.jobs.get(jobId) || null;
  }

  /**
   * Get all jobs for a data source
   */
  getJobsForSource(sourceId: string): UpdateJob[] {
    return Array.from(this.jobs.values()).filter(job => job.sourceId === sourceId);
  }

  /**
   * Get scheduler statistics
   */
  getStatistics(): {
    totalJobs: number;
    pendingJobs: number;
    runningJobs: number;
    completedJobs: number;
    failedJobs: number;
    cancelledJobs: number;
    averageJobDuration: number;
    successRate: number;
  } {
    const jobs = Array.from(this.jobs.values());
    const completedJobs = jobs.filter(j => j.status === 'completed');
    const failedJobs = jobs.filter(j => j.status === 'failed');
    
    const totalCompleted = completedJobs.length + failedJobs.length;
    const successRate = totalCompleted > 0 ? completedJobs.length / totalCompleted : 0;
    
    const averageJobDuration = completedJobs.length > 0 
      ? completedJobs.reduce((sum, job) => sum + (job.duration || 0), 0) / completedJobs.length
      : 0;

    return {
      totalJobs: jobs.length,
      pendingJobs: jobs.filter(j => j.status === 'pending').length,
      runningJobs: jobs.filter(j => j.status === 'running').length,
      completedJobs: completedJobs.length,
      failedJobs: failedJobs.length,
      cancelledJobs: jobs.filter(j => j.status === 'cancelled').length,
      averageJobDuration,
      successRate
    };
  }

  /**
   * Schedule initial jobs for all data sources
   */
  private scheduleInitialJobs(): void {
    // In a real implementation, this would get data sources from the DataService
    const dataSources = [
      { id: 'mortgage-rates', updateFrequency: 'weekly' },
      { id: 'regional-property-data', updateFrequency: 'quarterly' },
      { id: 'legal-multipliers', updateFrequency: 'monthly' },
      { id: 'market-indices', updateFrequency: 'daily' },
      { id: 'construction-costs', updateFrequency: 'monthly' }
    ];

    for (const source of dataSources) {
      const nextUpdate = this.calculateNextUpdateTime(source.updateFrequency);
      this.scheduleJob(source.id, nextUpdate);
    }
  }

  /**
   * Process pending jobs
   */
  private async processJobs(): Promise<void> {
    if (!this.isRunning) {
      return;
    }

    const now = new Date();
    const pendingJobs = Array.from(this.jobs.values())
      .filter(job => 
        job.status === 'pending' && 
        job.scheduledTime <= now &&
        !this.runningJobs.has(job.id)
      )
      .sort((a, b) => {
        // Sort by priority first, then by scheduled time
        const priorityOrder = { critical: 0, high: 1, normal: 2, low: 3 };
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return a.scheduledTime.getTime() - b.scheduledTime.getTime();
      });

    // Limit concurrent jobs
    const availableSlots = this.config.maxConcurrentJobs - this.runningJobs.size;
    const jobsToRun = pendingJobs.slice(0, availableSlots);

    for (const job of jobsToRun) {
      this.executeJob(job);
    }
  }

  /**
   * Execute a single job
   */
  private async executeJob(job: UpdateJob): Promise<void> {
    job.status = 'running';
    job.attempts++;
    job.lastAttempt = new Date();
    this.runningJobs.add(job.id);

    const startTime = Date.now();
    console.log(`Starting job ${job.id} for source ${job.sourceId} (attempt ${job.attempts})`);

    try {
      // Perform the actual data update
      const result = await this.updateDataSource(job.sourceId);
      
      const duration = Date.now() - startTime;
      job.duration = duration;

      if (result.success) {
        job.status = 'completed';
        console.log(`Job ${job.id} completed successfully in ${duration}ms`);
        
        // Schedule next update
        this.scheduleNextUpdate(job.sourceId);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      job.duration = duration;
      job.lastError = error instanceof Error ? error.message : 'Unknown error';
      
      console.error(`Job ${job.id} failed (attempt ${job.attempts}):`, job.lastError);

      if (job.attempts >= job.maxAttempts) {
        job.status = 'failed';
        console.error(`Job ${job.id} failed permanently after ${job.attempts} attempts`);
        
        if (this.config.enableNotifications) {
          this.sendFailureNotification(job);
        }
      } else {
        // Schedule retry
        job.status = 'pending';
        job.scheduledTime = new Date(Date.now() + this.config.retryDelayMinutes * 60000);
        console.log(`Job ${job.id} scheduled for retry at ${job.scheduledTime.toISOString()}`);
      }
    } finally {
      this.runningJobs.delete(job.id);
    }
  }

  /**
   * Update a specific data source
   */
  private async updateDataSource(sourceId: string): Promise<UpdateResult> {
    const startTime = Date.now();
    
    try {
      // Get fresh data from the source
      const data = await dataService.getData(sourceId, true);
      
      // Store version for historical tracking
      const versionId = dataVersioningService.storeDataVersion(sourceId, data, {
        source: 'automated-update',
        updateReason: 'Scheduled update',
        notes: `Automated update via scheduler`
      });

      const duration = Date.now() - startTime;
      
      return {
        success: true,
        sourceId,
        duration,
        versionId,
        recordsUpdated: this.countRecords(data)
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      
      return {
        success: false,
        sourceId,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Schedule next update for a data source
   */
  private scheduleNextUpdate(sourceId: string): void {
    // In a real implementation, this would get the update frequency from the data source configuration
    const updateFrequencies: Record<string, string> = {
      'mortgage-rates': 'weekly',
      'regional-property-data': 'quarterly',
      'legal-multipliers': 'monthly',
      'market-indices': 'daily',
      'construction-costs': 'monthly'
    };

    const frequency = updateFrequencies[sourceId] || 'weekly';
    const nextUpdate = this.calculateNextUpdateTime(frequency);
    
    this.scheduleJob(sourceId, nextUpdate);
  }

  /**
   * Calculate next update time based on frequency
   */
  private calculateNextUpdateTime(frequency: string): Date {
    const now = new Date();
    const nextUpdate = new Date(now);

    switch (frequency) {
      case 'daily':
        nextUpdate.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        nextUpdate.setDate(now.getDate() + 7);
        break;
      case 'monthly':
        nextUpdate.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        nextUpdate.setMonth(now.getMonth() + 3);
        break;
      default:
        nextUpdate.setDate(now.getDate() + 7); // Default to weekly
    }

    return nextUpdate;
  }

  /**
   * Perform health check on the scheduler
   */
  private performHealthCheck(): void {
    console.log('Performing scheduler health check');
    
    const stats = this.getStatistics();
    const cacheStats = dataService.getCacheStats();
    
    // Check for stuck jobs
    const stuckJobs = Array.from(this.jobs.values()).filter(job => 
      job.status === 'running' && 
      job.lastAttempt && 
      Date.now() - job.lastAttempt.getTime() > 30 * 60000 // 30 minutes
    );

    if (stuckJobs.length > 0) {
      console.warn(`Found ${stuckJobs.length} stuck jobs`);
      // Reset stuck jobs
      for (const job of stuckJobs) {
        job.status = 'pending';
        job.scheduledTime = new Date();
        this.runningJobs.delete(job.id);
      }
    }

    // Clean up old completed/failed jobs
    this.cleanupOldJobs();

    // Clear expired cache
    const clearedEntries = dataService.clearExpiredCache();
    if (clearedEntries > 0) {
      console.log(`Cleared ${clearedEntries} expired cache entries`);
    }

    console.log(`Health check completed. Stats: ${JSON.stringify(stats)}`);
  }

  /**
   * Clean up old jobs
   */
  private cleanupOldJobs(): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7); // Keep jobs for 7 days

    let removedCount = 0;
    for (const [jobId, job] of this.jobs) {
      if ((job.status === 'completed' || job.status === 'failed' || job.status === 'cancelled') &&
          job.lastAttempt && job.lastAttempt < cutoffDate) {
        this.jobs.delete(jobId);
        removedCount++;
      }
    }

    if (removedCount > 0) {
      console.log(`Cleaned up ${removedCount} old jobs`);
    }
  }

  /**
   * Send failure notification
   */
  private sendFailureNotification(job: UpdateJob): void {
    // In a real implementation, this would send notifications via email, Slack, etc.
    console.error(`NOTIFICATION: Data update failed for source ${job.sourceId} after ${job.attempts} attempts. Last error: ${job.lastError}`);
  }

  /**
   * Count records in data (simplified)
   */
  private countRecords(data: any): number {
    if (Array.isArray(data)) {
      return data.length;
    }
    if (typeof data === 'object' && data !== null) {
      return Object.keys(data).length;
    }
    return 1;
  }

  /**
   * Generate unique job ID
   */
  private generateJobId(sourceId: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `job-${sourceId}-${timestamp}-${random}`;
  }
}

// Export singleton instance
export const dataUpdateScheduler = new DataUpdateScheduler();