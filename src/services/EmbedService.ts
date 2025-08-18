import { Calculator } from '../types/Calculator';

export interface EmbedOptions {
  calculatorId: string;
  theme?: 'light' | 'dark' | 'auto';
  width?: number | string;
  height?: number | string;
  showHeader?: boolean;
  showFooter?: boolean;
  customCSS?: string;
  allowExport?: boolean;
  allowHistory?: boolean;
  branding?: {
    logo?: string;
    companyName?: string;
    website?: string;
  };
  callbacks?: {
    onCalculation?: string; // JavaScript function name
    onError?: string;
  };
}

export interface EmbedCode {
  iframe: string;
  script: string;
  direct: string;
}

export class EmbedService {
  private static readonly BASE_URL = window.location.origin;
  private static readonly EMBED_PATH = '/embed';

  static generateEmbedCode(options: EmbedOptions): EmbedCode {
    const embedUrl = this.buildEmbedUrl(options);
    
    return {
      iframe: this.generateIframeCode(embedUrl, options),
      script: this.generateScriptCode(options),
      direct: this.generateDirectCode(options)
    };
  }

  static generateEmbedUrl(options: EmbedOptions): string {
    return this.buildEmbedUrl(options);
  }

  static validateEmbedOptions(options: EmbedOptions): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!options.calculatorId) {
      errors.push('Calculator ID is required');
    }

    if (options.width && typeof options.width === 'number' && options.width < 300) {
      errors.push('Minimum width is 300px');
    }

    if (options.height && typeof options.height === 'number' && options.height < 400) {
      errors.push('Minimum height is 400px');
    }

    if (options.callbacks?.onCalculation && !this.isValidJavaScriptFunction(options.callbacks.onCalculation)) {
      errors.push('Invalid onCalculation callback function name');
    }

    if (options.callbacks?.onError && !this.isValidJavaScriptFunction(options.callbacks.onError)) {
      errors.push('Invalid onError callback function name');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static getEmbedPreview(options: EmbedOptions): string {
    const embedUrl = this.buildEmbedUrl(options);
    return `
      <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; max-width: 800px;">
        <div style="background: #f9fafb; padding: 8px 16px; font-size: 12px; color: #6b7280;">
          Preview - Calculator Embed
        </div>
        <iframe 
          src="${embedUrl}" 
          width="100%" 
          height="600"
          frameborder="0"
          style="display: block;"
        ></iframe>
      </div>
    `;
  }

  static generateEmbedDocumentation(options: EmbedOptions): string {
    const validation = this.validateEmbedOptions(options);
    const embedCode = this.generateEmbedCode(options);

    return `
# Calculator Embed Documentation

## Overview
This embed allows you to integrate the ${options.calculatorId} calculator into your website.

## Embed Options

### Basic Configuration
- **Calculator ID**: ${options.calculatorId}
- **Theme**: ${options.theme || 'auto'}
- **Width**: ${options.width || 'auto'}
- **Height**: ${options.height || 'auto'}

### Features
- **Show Header**: ${options.showHeader !== false ? 'Yes' : 'No'}
- **Show Footer**: ${options.showFooter !== false ? 'Yes' : 'No'}
- **Allow Export**: ${options.allowExport !== false ? 'Yes' : 'No'}
- **Allow History**: ${options.allowHistory !== false ? 'Yes' : 'No'}

### Branding
${options.branding ? `
- **Company**: ${options.branding.companyName || 'Not specified'}
- **Website**: ${options.branding.website || 'Not specified'}
- **Logo**: ${options.branding.logo ? 'Custom logo provided' : 'Default logo'}
` : '- No custom branding configured'}

## Implementation Methods

### 1. IFrame Embed (Recommended)
\`\`\`html
${embedCode.iframe}
\`\`\`

### 2. JavaScript Widget
\`\`\`html
${embedCode.script}
\`\`\`

### 3. Direct Integration
\`\`\`html
${embedCode.direct}
\`\`\`

## Callbacks

${options.callbacks ? `
### Available Callbacks
- **onCalculation**: Called when a calculation is completed
- **onError**: Called when an error occurs

### Example Usage
\`\`\`javascript
function ${options.callbacks.onCalculation || 'handleCalculation'}(result) {
  console.log('Calculation completed:', result);
  // Your custom logic here
}

function ${options.callbacks.onError || 'handleError'}(error) {
  console.error('Calculator error:', error);
  // Your error handling here
}
\`\`\`
` : '### No callbacks configured'}

## Validation Results
${validation.isValid ? '✅ All options are valid' : `❌ Validation errors:\n${validation.errors.map(error => `- ${error}`).join('\n')}`}

## Support
For technical support or customization requests, please contact our support team.
    `;
  }

  private static buildEmbedUrl(options: EmbedOptions): string {
    const params = new URLSearchParams();
    
    params.set('calculator', options.calculatorId);
    
    if (options.theme) params.set('theme', options.theme);
    if (options.width) params.set('width', String(options.width));
    if (options.height) params.set('height', String(options.height));
    if (options.showHeader === false) params.set('header', 'false');
    if (options.showFooter === false) params.set('footer', 'false');
    if (options.allowExport === false) params.set('export', 'false');
    if (options.allowHistory === false) params.set('history', 'false');
    
    if (options.branding) {
      if (options.branding.companyName) params.set('brand_name', options.branding.companyName);
      if (options.branding.website) params.set('brand_url', options.branding.website);
      if (options.branding.logo) params.set('brand_logo', options.branding.logo);
    }
    
    if (options.callbacks) {
      if (options.callbacks.onCalculation) params.set('callback_calc', options.callbacks.onCalculation);
      if (options.callbacks.onError) params.set('callback_error', options.callbacks.onError);
    }
    
    if (options.customCSS) {
      params.set('custom_css', btoa(options.customCSS));
    }

    return `${this.BASE_URL}${this.EMBED_PATH}?${params.toString()}`;
  }

  private static generateIframeCode(embedUrl: string, options: EmbedOptions): string {
    const width = options.width || '100%';
    const height = options.height || '600';
    
    return `<iframe 
  src="${embedUrl}" 
  width="${width}" 
  height="${height}"
  frameborder="0"
  style="border: none; border-radius: 8px;"
  title="Calculator Widget"
></iframe>`;
  }

  private static generateScriptCode(options: EmbedOptions): string {
    const config = {
      calculatorId: options.calculatorId,
      theme: options.theme || 'auto',
      width: options.width || '100%',
      height: options.height || '600',
      showHeader: options.showHeader !== false,
      showFooter: options.showFooter !== false,
      allowExport: options.allowExport !== false,
      allowHistory: options.allowHistory !== false,
      branding: options.branding,
      callbacks: options.callbacks
    };

    return `<!-- Calculator Widget Script -->
<div id="calculator-widget-${options.calculatorId}"></div>
<script>
(function() {
  var config = ${JSON.stringify(config, null, 2)};
  var script = document.createElement('script');
  script.src = '${this.BASE_URL}/widget.js';
  script.onload = function() {
    CalculatorWidget.init('calculator-widget-${options.calculatorId}', config);
  };
  document.head.appendChild(script);
})();
</script>`;
  }

  private static generateDirectCode(options: EmbedOptions): string {
    return `<!-- Direct Calculator Integration -->
<div 
  class="calculator-embed" 
  data-calculator="${options.calculatorId}"
  data-theme="${options.theme || 'auto'}"
  data-width="${options.width || '100%'}"
  data-height="${options.height || '600'}"
  ${options.showHeader === false ? 'data-no-header="true"' : ''}
  ${options.showFooter === false ? 'data-no-footer="true"' : ''}
  ${options.allowExport === false ? 'data-no-export="true"' : ''}
  ${options.allowHistory === false ? 'data-no-history="true"' : ''}
  ${options.callbacks?.onCalculation ? `data-callback-calc="${options.callbacks.onCalculation}"` : ''}
  ${options.callbacks?.onError ? `data-callback-error="${options.callbacks.onError}"` : ''}
>
  <p>Loading calculator...</p>
</div>

<script src="${this.BASE_URL}/embed.js"></script>`;
  }

  private static isValidJavaScriptFunction(functionName: string): boolean {
    // Basic validation for JavaScript function names
    const functionNameRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
    return functionNameRegex.test(functionName);
  }

  static generateEmbedWidget(): string {
    // This would be the actual widget JavaScript code
    return `
(function(window, document) {
  'use strict';
  
  var CalculatorWidget = {
    init: function(containerId, config) {
      var container = document.getElementById(containerId);
      if (!container) {
        console.error('Calculator widget container not found:', containerId);
        return;
      }
      
      this.render(container, config);
    },
    
    render: function(container, config) {
      // Create iframe for the calculator
      var iframe = document.createElement('iframe');
      iframe.src = this.buildUrl(config);
      iframe.width = config.width;
      iframe.height = config.height;
      iframe.frameBorder = '0';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';
      
      container.appendChild(iframe);
      
      // Set up message handling for callbacks
      if (config.callbacks) {
        this.setupCallbacks(config.callbacks);
      }
    },
    
    buildUrl: function(config) {
      var params = new URLSearchParams();
      params.set('calculator', config.calculatorId);
      params.set('theme', config.theme);
      params.set('widget', 'true');
      
      return '${this.BASE_URL}${this.EMBED_PATH}?' + params.toString();
    },
    
    setupCallbacks: function(callbacks) {
      window.addEventListener('message', function(event) {
        if (event.origin !== '${this.BASE_URL}') return;
        
        var data = event.data;
        if (data.type === 'calculator_result' && callbacks.onCalculation) {
          window[callbacks.onCalculation](data.result);
        } else if (data.type === 'calculator_error' && callbacks.onError) {
          window[callbacks.onError](data.error);
        }
      });
    }
  };
  
  window.CalculatorWidget = CalculatorWidget;
  
})(window, document);
    `;
  }
}