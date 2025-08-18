export interface PWAConfig {
  enableOfflineMode: boolean;
  enablePushNotifications: boolean;
  enableBackgroundSync: boolean;
  cacheStrategy: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  offlineCalculators: string[];
}

export interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export class PWAService {
  private static config: PWAConfig = {
    enableOfflineMode: true,
    enablePushNotifications: false,
    enableBackgroundSync: false,
    cacheStrategy: 'stale-while-revalidate',
    offlineCalculators: ['mortgage', 'investment', 'bmr-tdee']
  };

  private static installPrompt: InstallPromptEvent | null = null;
  private static isInstalled = false;

  // Installation Management
  static init(): void {
    this.checkInstallation();
    this.setupInstallPrompt();
    this.registerServiceWorker();
    this.setupOfflineDetection();
  }

  private static checkInstallation(): void {
    // Check if app is installed
    this.isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                      (window.navigator as any).standalone === true;
  }

  private static setupInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.installPrompt = e as InstallPromptEvent;
      this.showInstallBanner();
    });

    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.hideInstallBanner();
      this.trackInstallation();
    });
  }

  static async promptInstall(): Promise<boolean> {
    if (!this.installPrompt) {
      return false;
    }

    try {
      await this.installPrompt.prompt();
      const choiceResult = await this.installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        this.installPrompt = null;
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Install prompt failed:', error);
      return false;
    }
  }

  static canInstall(): boolean {
    return this.installPrompt !== null && !this.isInstalled;
  }

  static isAppInstalled(): boolean {
    return this.isInstalled;
  }

  // Service Worker Management
  private static async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.showUpdateAvailable();
              }
            });
          }
        });

        console.log('Service Worker registered successfully');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  static async updateServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        window.location.reload();
      }
    }
  }

  // Offline Functionality
  private static setupOfflineDetection(): void {
    window.addEventListener('online', () => {
      this.handleOnline();
    });

    window.addEventListener('offline', () => {
      this.handleOffline();
    });

    // Initial state
    if (!navigator.onLine) {
      this.handleOffline();
    }
  }

  private static handleOnline(): void {
    this.hideOfflineNotification();
    this.syncOfflineData();
  }

  private static handleOffline(): void {
    this.showOfflineNotification();
  }

  static isOnline(): boolean {
    return navigator.onLine;
  }

  // Cache Management
  static async cacheCalculatorData(calculatorId: string, data: any): Promise<void> {
    if ('caches' in window) {
      try {
        const cache = await caches.open(`calculator-data-v1`);
        const response = new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' }
        });
        await cache.put(`/calculator-data/${calculatorId}`, response);
      } catch (error) {
        console.error('Failed to cache calculator data:', error);
      }
    }
  }

  static async getCachedCalculatorData(calculatorId: string): Promise<any | null> {
    if ('caches' in window) {
      try {
        const cache = await caches.open(`calculator-data-v1`);
        const response = await cache.match(`/calculator-data/${calculatorId}`);
        
        if (response) {
          return await response.json();
        }
      } catch (error) {
        console.error('Failed to get cached calculator data:', error);
      }
    }
    
    return null;
  }

  static async clearCache(): Promise<void> {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }
  }

  // Background Sync
  static async scheduleBackgroundSync(tag: string, data?: any): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready;
        
        if (data) {
          // Store data for background sync
          localStorage.setItem(`bg-sync-${tag}`, JSON.stringify(data));
        }
        
        await registration.sync.register(tag);
      } catch (error) {
        console.error('Background sync registration failed:', error);
      }
    }
  }

  // Push Notifications
  static async requestNotificationPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  static async subscribeToPushNotifications(): Promise<PushSubscription | null> {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.getVapidPublicKey()
        });
        
        // Send subscription to server
        await this.sendSubscriptionToServer(subscription);
        
        return subscription;
      } catch (error) {
        console.error('Push subscription failed:', error);
        return null;
      }
    }
    return null;
  }

  private static getVapidPublicKey(): Uint8Array {
    // Replace with your actual VAPID public key
    const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI80NM9f8HnKJuOmLsOBJXoRJNQRhHlbEi2Dh1JM4YTqYVOWkKnBtgoDDU';
    return this.urlBase64ToUint8Array(vapidPublicKey);
  }

  private static urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  private static async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    // Send subscription to your server
    try {
      await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
      });
    } catch (error) {
      console.error('Failed to send subscription to server:', error);
    }
  }

  // UI Helpers
  private static showInstallBanner(): void {
    const banner = document.createElement('div');
    banner.id = 'install-banner';
    banner.className = 'fixed bottom-4 left-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50';
    banner.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-semibold">Install Calculator App</h3>
          <p class="text-sm opacity-90">Get quick access and work offline</p>
        </div>
        <div class="flex space-x-2">
          <button id="install-button" class="bg-white text-blue-500 px-3 py-1 rounded text-sm font-medium">
            Install
          </button>
          <button id="dismiss-install" class="text-white opacity-75 hover:opacity-100">
            ✕
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('install-button')?.addEventListener('click', () => {
      this.promptInstall();
    });

    document.getElementById('dismiss-install')?.addEventListener('click', () => {
      this.hideInstallBanner();
    });
  }

  private static hideInstallBanner(): void {
    const banner = document.getElementById('install-banner');
    if (banner) {
      banner.remove();
    }
  }

  private static showUpdateAvailable(): void {
    const notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-semibold">Update Available</h3>
          <p class="text-sm opacity-90">A new version is ready</p>
        </div>
        <div class="flex space-x-2">
          <button id="update-button" class="bg-white text-green-500 px-3 py-1 rounded text-sm font-medium">
            Update
          </button>
          <button id="dismiss-update" class="text-white opacity-75 hover:opacity-100">
            ✕
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    document.getElementById('update-button')?.addEventListener('click', () => {
      this.updateServiceWorker();
    });

    document.getElementById('dismiss-update')?.addEventListener('click', () => {
      notification.remove();
    });
  }

  private static showOfflineNotification(): void {
    const notification = document.createElement('div');
    notification.id = 'offline-notification';
    notification.className = 'fixed top-4 left-4 right-4 bg-yellow-500 text-white p-3 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
      <div class="flex items-center">
        <span class="mr-2">📱</span>
        <span>You're offline. Some features may be limited.</span>
      </div>
    `;

    document.body.appendChild(notification);
  }

  private static hideOfflineNotification(): void {
    const notification = document.getElementById('offline-notification');
    if (notification) {
      notification.remove();
    }
  }

  private static async syncOfflineData(): Promise<void> {
    // Sync any offline data when coming back online
    const offlineData = localStorage.getItem('offline-calculations');
    if (offlineData) {
      try {
        const calculations = JSON.parse(offlineData);
        // Send to server
        await fetch('/api/sync-calculations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(calculations)
        });
        
        localStorage.removeItem('offline-calculations');
      } catch (error) {
        console.error('Failed to sync offline data:', error);
      }
    }
  }

  private static trackInstallation(): void {
    // Track app installation
    if ('gtag' in window) {
      (window as any).gtag('event', 'app_installed', {
        event_category: 'PWA',
        event_label: 'Calculator App'
      });
    }
  }

  // Configuration
  static updateConfig(newConfig: Partial<PWAConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  static getConfig(): PWAConfig {
    return { ...this.config };
  }
}