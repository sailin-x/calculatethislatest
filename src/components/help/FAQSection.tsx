import React, { useState, useEffect } from 'react';
import { HelpSystemService, FAQ } from '../../services/HelpSystemService';

interface FAQSectionProps {
  category?: string;
  maxItems?: number;
  searchable?: boolean;
  collapsible?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  category,
  maxItems = 10,
  searchable = true,
  collapsible = true
}) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadFAQs();
  }, []);

  useEffect(() => {
    filterFAQs();
  }, [faqs, searchTerm, selectedCategory]);

  const loadFAQs = () => {
    const allFaqs = HelpSystemService.getFAQs();
    setFaqs(allFaqs);
    
    // Extract unique categories
    const uniqueCategories = [...new Set(allFaqs.map(faq => faq.category))];
    setCategories(uniqueCategories);
  };

  const filterFAQs = () => {
    let filtered = faqs;

    if (selectedCategory) {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = HelpSystemService.getFAQs(selectedCategory, searchTerm);
    }

    setFilteredFaqs(filtered.slice(0, maxItems));
  };

  const toggleExpanded = (faqId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
      // Track popularity
      HelpSystemService.incrementFAQPopularity(faqId);
    }
    setExpandedItems(newExpanded);
  };

  const highlightSearchTerm = (text: string, term: string): React.ReactNode => {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>

        {searchable && (
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategory === ''
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors capitalize ${
                      selectedCategory === cat
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="divide-y divide-gray-200">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-2">❓</div>
            <p>No FAQs found</p>
            {searchTerm && (
              <p className="text-sm">
                Try adjusting your search terms or browse all categories
              </p>
            )}
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div key={faq.id} className="p-4">
              <button
                onClick={() => collapsible && toggleExpanded(faq.id)}
                className={`w-full text-left focus:outline-none ${
                  collapsible ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {highlightSearchTerm(faq.question, searchTerm)}
                    </h3>
                    
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="capitalize bg-gray-100 px-2 py-1 rounded-full">
                        {faq.category}
                      </span>
                      <span>👀 {faq.popularity} views</span>
                      <span>Updated {formatDate(faq.lastUpdated)}</span>
                    </div>
                  </div>
                  
                  {collapsible && (
                    <div className="ml-4 flex-shrink-0">
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedItems.has(faq.id) ? 'rotate-180' : ''
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </button>

              {(!collapsible || expandedItems.has(faq.id)) && (
                <div className="mt-3 pl-0">
                  <div className="prose prose-sm max-w-none text-gray-600">
                    {highlightSearchTerm(faq.answer, searchTerm)}
                  </div>
                  
                  {faq.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {faq.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {filteredFaqs.length === maxItems && faqs.length > maxItems && (
        <div className="p-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Showing {maxItems} of {faqs.length} FAQs
          </p>
          <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All FAQs
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQSection;