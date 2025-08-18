import React, { Suspense, lazy, useState, useEffect } from 'react';
import { PerformanceOptimizationService } from '../../services/PerformanceOptimizationService';

interface LazyCalculatorLoaderProps {
  calculatorId: string;
  fallback?: React.ComponentType;
  preload?: boolean;
  onLoadStart?: () => void;
  onLoadComplete?: (loadTime: number) => void;
  onLoadError?: (error: Error) => void;
}

// Cache for loaded components
const componentCache = new Map<string, React.ComponentType<any>>();
const loadingPromises = new Map<string, Promise<React.ComponentType<any>>>();

export const LazyCalculatorLoader: React.FC<LazyCalculatorLoaderProps> = ({
  calculatorId,
  fallback: Fallback,
  preload = false,
  onLoadStart,
  onLoadComplete,
  onLoadError
}) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    componentCache.get(calculatorId) || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (preload && !Component && !loadingPromises.has(calculatorId)) {
      loadComponent();
    }
  }, [calculatorId, preload, Component]);

  const loadComponent = async () => {
    // Check if already cached
    if (componentCache.has(calculatorId)) {
      setComponent(componentCache.get(calculatorId)!);
      return;
    }

    // Check if already loading
    if (loadingPromises.has(calculatorId)) {
      try {
        const component = await loadingPromises.get(calculatorId)!;
        setComponent(component);
      } catch (err) {
        setError(err as Error);
        onLoadError?.(err as Error);
      }
      return;
    }

    setIsLoading(true);
    setError(null);
    onLoadStart?.();

    const startTime = performance.now();

    try {
      // Create loading promise
      const loadingPromise = loadCalculatorComponent(calculatorId);
      loadingPromises.set(calculatorId, loadingPromise);

      const component = await loadingPromise;
      
      // Cache the component
      componentCache.set(calculatorId, component);
      setComponent(component);

      const loadTime = performance.now() - startTime;
      onLoadComplete?.(loadTime);

      // Clean up loading promise
      loadingPromises.delete(calculatorId);
    } catch (err) {
      const error = err as Error;
      setError(error);
      onLoadError?.(error);
      loadingPromises.delete(calculatorId);
    } finally {
      setIsLoading(false);
    }
  };

  // Load component when needed (not preloaded)
  useEffect(() => {
    if (!preload && !Component && !isLoading) {
      loadComponent();
    }
  }, [calculatorId, Component, isLoading, preload]);

  if (error) {
    return <ErrorFallback error={error} calculatorId={calculatorId} />;
  }

  if (!Component) {
    return Fallback ? <Fallback /> : <DefaultLoadingFallback />;
  }

  return <Component />;
};

// Dynamic component loader with error handling
const loadCalculatorComponent = async (calculatorId: string): Promise<React.ComponentType<any>> => {
  const timer = PerformanceOptimizationService.startPerformanceTimer(`load_${calculatorId}`);

  try {
    // Map calculator IDs to their module paths
    const modulePath = getCalculatorModulePath(calculatorId);
    
    if (!modulePath) {
      throw new Error(`Unknown calculator: ${calculatorId}`);
    }

    const module = await import(modulePath);
    const Component = module.default || module[getCalculatorComponentName(calculatorId)];

    if (!Component) {
      throw new Error(`Calculator component not found in module: ${calculatorId}`);
    }

    timer(); // Record load time
    return Component;
  } catch (error) {
    timer(); // Record failed load time
    throw error;
  }
};

// Helper function to map calculator IDs to module paths
const getCalculatorModulePath = (calculatorId: string): string | null => {
  const pathMap: Record<string, string> = {
    'mortgage': '../../calculators/finance/mortgage/MortgageCalculator',
    'investment': '../../calculators/finance/investment/PortfolioCalculator',
    'personal-injury': '../../calculators/legal/personal-injury/PersonalInjuryCalculator',
    'saas-metrics': '../../calculators/business/saas-metrics/SaaSMetricsCalculator',
    'bmr-tdee': '../../calculators/health/bmr-tdee/BMRCalculator',
    'concrete': '../../calculators/construction/concrete/ConcreteCalculator',
    'algebra': '../../calculators/math/algebra/AlgebraCalculator',
    'geometry': '../../calculators/math/geometry/GeometryCalculator',
    'statistics': '../../calculators/math/statistics/StatisticsCalculator',
    'unit-conversion': '../../calculators/math/unit-conversion/UnitConversionCalculator',
    'complex-numbers': '../../calculators/math/complex-numbers/ComplexNumberCalculator',
    'matrix': '../../calculators/math/matrix/MatrixCalculator',
    'scientific': '../../calculators/math/scientific/ScientificCalculator',
    'automotive': '../../calculators/lifestyle/automotive/AutomotiveCalculator',
    'cooking': '../../calculators/lifestyle/cooking/CookingCalculator',
    'everyday': '../../calculators/lifestyle/everyday/EverydayCalculator',
    'hobbies': '../../calculators/lifestyle/hobbies/HobbiesCalculator'
  };

  return pathMap[calculatorId] || null;
};

// Helper function to get component name
const getCalculatorComponentName = (calculatorId: string): string => {
  return calculatorId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Calculator';
};

// Default loading fallback component
const DefaultLoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">Loading calculator...</p>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback: React.FC<{ error: Error; calculatorId: string }> = ({ error, calculatorId }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <div className="text-red-500 text-4xl mb-4">⚠️</div>
    <h3 className="text-lg font-semibold text-red-900 mb-2">
      Failed to Load Calculator
    </h3>
    <p className="text-red-700 mb-4">
      We couldn't load the {calculatorId} calculator. Please try again.
    </p>
    <details className="text-left bg-red-100 rounded p-3 mb-4">
      <summary className="cursor-pointer font-medium text-red-800">
        Error Details
      </summary>
      <pre className="text-sm text-red-700 mt-2 whitespace-pre-wrap">
        {error.message}
      </pre>
    </details>
    <button
      onClick={() => window.location.reload()}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Reload Page
    </button>
  </div>
);

// Hook for preloading calculators
export const useCalculatorPreloader = () => {
  const preloadCalculator = (calculatorId: string) => {
    if (!componentCache.has(calculatorId) && !loadingPromises.has(calculatorId)) {
      loadCalculatorComponent(calculatorId).catch(() => {
        // Silently fail for preloading
      });
    }
  };

  const preloadCalculators = (calculatorIds: string[]) => {
    calculatorIds.forEach(preloadCalculator);
  };

  const isCalculatorLoaded = (calculatorId: string) => {
    return componentCache.has(calculatorId);
  };

  const clearCache = () => {
    componentCache.clear();
    loadingPromises.clear();
  };

  return {
    preloadCalculator,
    preloadCalculators,
    isCalculatorLoaded,
    clearCache
  };
};

// Higher-order component for lazy loading
export const withLazyLoading = <P extends object>(
  calculatorId: string,
  options: {
    fallback?: React.ComponentType;
    preload?: boolean;
  } = {}
) => {
  return (props: P) => (
    <LazyCalculatorLoader
      calculatorId={calculatorId}
      fallback={options.fallback}
      preload={options.preload}
      {...props}
    />
  );
};

export default LazyCalculatorLoader;