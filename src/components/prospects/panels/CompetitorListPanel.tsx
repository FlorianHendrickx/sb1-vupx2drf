import React, { useState } from 'react';
import { X, Upload, Table } from 'lucide-react';

const SUGGESTED_COMPETITORS = [
  { name: 'CompeteAI', reason: 'Similar product offering' },
  { name: 'MLOps Pro', reason: 'Market overlap' },
  { name: 'DataScale', reason: 'Common customer base' }
];

export const CompetitorListPanel = ({ onClose }: { onClose: () => void }) => {
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [newCompetitor, setNewCompetitor] = useState('');

  const handleAddCompetitor = () => {
    if (newCompetitor.trim()) {
      setCompetitors([...competitors, newCompetitor.trim()]);
      setNewCompetitor('');
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Competitor List</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCompetitor}
              onChange={(e) => setNewCompetitor(e.target.value)}
              placeholder="Add competitor name"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleAddCompetitor}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              Upload CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Table className="w-4 h-4" />
              Connect Sheet
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Your Competitors</h3>
          <div className="space-y-2">
            {competitors.map((competitor, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
              >
                <span>{competitor}</span>
                <button
                  onClick={() => setCompetitors(competitors.filter((_, i) => i !== index))}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Suggested Competitors</h3>
          <div className="space-y-2">
            {SUGGESTED_COMPETITORS.map((competitor, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
              >
                <div>
                  <div>{competitor.name}</div>
                  <div className="text-xs text-gray-500">Reason: {competitor.reason}</div>
                </div>
                <button
                  onClick={() => setCompetitors([...competitors, competitor.name])}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};