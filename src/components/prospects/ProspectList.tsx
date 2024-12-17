import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ProspectCard } from './ProspectCard';
import { Play, X, Filter } from 'lucide-react';
import { IcpPanel } from './panels/IcpPanel';
import { CustomerListPanel } from './panels/CustomerListPanel';
import { CompetitorListPanel } from './panels/CompetitorListPanel';
import { EventsPanel } from './panels/EventsPanel';
import type { Prospect } from '../../types';

type ActivePanel = 'icp' | 'customers' | 'competitors' | 'events' | 'filter' | null;

const LIST_IMPROVEMENT_TAGS = [
  { id: 'icp', label: 'ICP Definition' },
  { id: 'customers', label: 'Customer List' },
  { id: 'competitors', label: 'Competitor List' },
  { id: 'events', label: 'Upcoming Events' }
] as const;

const TAG_TYPES = [
  { type: 'intro-paths', label: 'Has Intro Paths' },
  { type: 'event', label: 'Event Related' },
  { type: 'competitor', label: 'Competitor Related' },
  { type: 'lookalike', label: 'Lookalike Customer' }
];

export const ProspectList = () => {
  const { prospects, setCurrentProspect, activeFilter, setActiveFilter } = useStore();
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const renderPanel = () => {
    switch (activePanel) {
      case 'icp':
        return <IcpPanel onClose={() => setActivePanel(null)} />;
      case 'customers':
        return <CustomerListPanel onClose={() => setActivePanel(null)} />;
      case 'competitors':
        return <CompetitorListPanel onClose={() => setActivePanel(null)} />;
      case 'events':
        return <EventsPanel onClose={() => setActivePanel(null)} />;
      case 'filter':
        return (
          <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filter Prospects</h2>
              <button onClick={() => setActivePanel(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {TAG_TYPES.map(tag => (
                <label key={tag.type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTags([...selectedTags, tag.type]);
                      } else {
                        setSelectedTags(selectedTags.filter(t => t !== tag.type));
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  {tag.label}
                </label>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const filterProspects = (prospects: Prospect[]) => {
    let filtered = prospects;

    // Filter by connector if active
    if (activeFilter?.type === 'connector') {
      filtered = filtered.filter(p => 
        p.introPaths?.some(path => path.connector.id === activeFilter.id)
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(prospect =>
        prospect.tags?.some(tag => selectedTags.includes(tag.type))
      );
    }

    return filtered;
  };

  const filteredProspects = filterProspects(prospects);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {LIST_IMPROVEMENT_TAGS.map(tag => (
              <button
                key={tag.id}
                onClick={() => setActivePanel(tag.id)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  activePanel === tag.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
          {activeFilter && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 rounded-lg border-2 border-blue-100">
              <span>Intro paths via {activeFilter.name}</span>
              <button
                onClick={() => setActiveFilter(null)}
                className="hover:text-blue-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActivePanel('filter')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              selectedTags.length > 0
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            {selectedTags.length > 0 ? `${selectedTags.length} Filters` : 'Filter'}
          </button>
          <button
            onClick={() => setCurrentProspect(prospects[0])}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Play className="w-5 h-5" />
            Start Sniping
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-3 border-b grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-500">
          <div className="col-span-4">Contact</div>
          <div className="col-span-3">Tags</div>
          <div className="col-span-2 text-center">Timing</div>
          <div className="col-span-2 text-center">ICP</div>
          <div className="col-span-1"></div>
        </div>
        <div className="divide-y">
          {filteredProspects.map((prospect) => (
            <ProspectCard
              key={prospect.id}
              prospect={prospect}
              onClick={() => setCurrentProspect(prospect)}
            />
          ))}
        </div>
        <div className="p-4 text-center">
          <button className="text-blue-600 hover:text-blue-700">
            Load More Prospects
          </button>
        </div>
      </div>

      {renderPanel()}
    </div>
  );
};