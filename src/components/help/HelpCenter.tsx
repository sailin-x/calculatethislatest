import React, { useState, useEffect } from 'react';
import { HelpSystemService, HelpContent, Tutorial } from '../../services/HelpSystemService';
import { FAQSection } from './FAQSection';
import { InteractiveTutorial } from './InteractiveTutorial';

interface HelpCenterProps {
  calculatorId?: string;
  initialTab?: 'overview' | 'guides' | 'tutorials' | 'formulas' | 'faq';
}

export const HelpCenter: React.FC<HelpCenterProps> = ({
  calculatorId,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<HelpContent[]>([]);
  const [usageGuide, setUsageGuide] = useState<HelpContent | null>(null);
  const [formulas, setFormulas] = useState<HelpContent[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [popularContent, setPopularContent] = useState<HelpContent[]>([]);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    loadHelpContent();
  }, [calculatorId]);

  useEffect(() => {
    if (searchTerm) {
      const results = HelpSystemService.searchHelp(searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const loadHelpContent = () => {
    if (calculatorId) {
      const guide = HelpSystemService.getUsageGuide(calculatorId);
      setUsageGuide(guide);

      const formulaDocs = HelpSystemService.getFormulaDocumentation(calculatorId);
      setFormulas(formulaDocs);

      const tutorialList = HelpSystemService.getTutorials(calculatorId);
      setTutorials(tutorialList);
    }

    const popular = HelpSystemService.getPopularContent(5);
    setPopularContent(popular);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'guides', label: 'Usage Guides', icon: '📖' },
    { id: 'tutorials', label: 'Tutorials', icon: '🎓' },
    { id: 'formulas', label: 'Formulas', icon: '🧮' },
    { id: 'faq', label: 'FAQ', icon: '❓' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search help articles, guides, and FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Search Results ({searchResults.length})
                </h3>
                <div className="space-y-3">
                  {searchResults.map(result => (
                    <div key={result.id} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-gray-900">{result.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {result.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {result.type}
                        </span>
                        {result.category && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {result.category}
                          </span>
                        )}
                        {result.estimatedReadTime && (
                          <span>⏱️ {result.estimatedReadTime} min read</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {calculatorId && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-blue-500 text-2xl mb-2">🎓</div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Interactive Tutorial
                  </h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Learn step-by-step with guided instructions
                  </p>
                  <button
                    onClick={() => setShowTutorial(true)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Start Tutorial
                  </button>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-green-500 text-2xl mb-2">📖</div>
                  <h3 className="font-semibold text-green-900 mb-1">
                    Usage Guide
                  </h3>
                  <p className="text-green-700 text-sm mb-3">
                    Comprehensive guide with examples
                  </p>
                  <button
                    onClick={() => setActiveTab('guides')}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    View Guide
                  </button>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="text-purple-500 text-2xl mb-2">🧮</div>
                  <h3 className="font-semibold text-purple-900 mb-1">
                    Formula Reference
                  </h3>
                  <p className="text-purple-700 text-sm mb-3">
                    Mathematical formulas and explanations
                  </p>
                  <button
                    onClick={() => setActiveTab('formulas')}
                    className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
                  >
                    View Formulas
                  </button>
                </div>
              </div>
            )}

            {/* Popular Content */}
            {popularContent.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Popular Help Articles
                </h3>
                <div className="space-y-2">
                  {popularContent.map(content => (
                    <div key={content.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                      <span className="text-lg">
                        {content.type === 'guide' && '📖'}
                        {content.type === 'formula' && '🧮'}
                        {content.type === 'tutorial' && '🎓'}
                        {content.type === 'faq' && '❓'}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {content.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {content.category} • {content.estimatedReadTime} min read
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'guides':
        return (
          <div className="space-y-6">
            {usageGuide ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">📖</span>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {usageGuide.title}
                  </h2>
                </div>
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: usageGuide.content.replace(/\n/g, '<br>') }} />
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📖</div>
                <p>No usage guide available</p>
                <p className="text-sm">Check back later for detailed guides</p>
              </div>
            )}
          </div>
        );

      case 'tutorials':
        return (
          <div className="space-y-6">
            {tutorials.length > 0 ? (
              <div className="grid gap-4">
                {tutorials.map(tutorial => (
                  <div key={tutorial.id} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-500 text-2xl">🎓</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {tutorial.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {tutorial.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>⏱️ {tutorial.duration} minutes</span>
                          <span>📊 {tutorial.difficulty}</span>
                          <span>📝 {tutorial.steps.length} steps</span>
                        </div>
                        <button
                          onClick={() => setShowTutorial(true)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Start Tutorial
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🎓</div>
                <p>No tutorials available</p>
                <p className="text-sm">Interactive tutorials will be added soon</p>
              </div>
            )}
          </div>
        );

      case 'formulas':
        return (
          <div className="space-y-6">
            {formulas.length > 0 ? (
              <div className="space-y-4">
                {formulas.map(formula => (
                  <div key={formula.id} className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl">🧮</span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {formula.title}
                      </h3>
                    </div>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: formula.content.replace(/\n/g, '<br>') }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🧮</div>
                <p>No formula documentation available</p>
                <p className="text-sm">Formula explanations will be added soon</p>
              </div>
            )}
          </div>
        );

      case 'faq':
        return <FAQSection category={calculatorId} />;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Help Center
          {calculatorId && (
            <span className="text-lg font-normal text-gray-600 ml-2">
              • Calculator Support
            </span>
          )}
        </h1>
        <p className="text-gray-600">
          Find answers, guides, and tutorials to help you get the most out of our calculators.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {renderTabContent()}

      {/* Interactive Tutorial Modal */}
      {showTutorial && calculatorId && (
        <InteractiveTutorial
          calculatorId={calculatorId}
          onComplete={() => setShowTutorial(false)}
          onClose={() => setShowTutorial(false)}
        />
      )}
    </div>
  );
};

export default HelpCenter;