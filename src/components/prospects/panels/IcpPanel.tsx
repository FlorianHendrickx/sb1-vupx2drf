import React, { useState } from 'react';
import { X, RotateCcw, ChevronDown } from 'lucide-react';
import { ConciergeButton } from '../../ui/ConciergeButton';

interface IcpVersion {
  prompt: string;
  timestamp: string;
}

const SAMPLE_ICP_PROMPT = `Target companies:
- Industry: Technology, SaaS, AI/ML
- Size: 50-1000 employees
- Growth stage: Series A to C
- Location: US, UK, Europe

Target roles:
- Primary: CTO, VP Engineering, Head of AI
- Secondary: CEO, COO (for smaller companies)

Pain points:
- Scaling AI/ML operations
- High infrastructure costs
- Long model training times
- Need for specialized ML engineers

Must have:
- Current AI/ML initiatives
- Growing engineering team
- Recent funding or revenue growth`;

export const IcpPanel = ({ onClose }: { onClose: () => void }) => {
  const [prompt, setPrompt] = useState(SAMPLE_ICP_PROMPT);
  const [showVersions, setShowVersions] = useState(false);
  const [versions, setVersions] = useState<IcpVersion[]>([
    { prompt: SAMPLE_ICP_PROMPT, timestamp: new Date().toISOString() }
  ]);

  const handleSave = () => {
    if (prompt !== versions[versions.length - 1].prompt) {
      setVersions([...versions, { 
        prompt, 
        timestamp: new Date().toISOString() 
      }]);
    }
    onClose();
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">ICP Definition</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          ICP Scoring Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-96 px-4 py-2 border rounded-lg resize-none"
        />
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowVersions(!showVersions)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <RotateCcw className="w-4 h-4" />
          Previous Versions
          <ChevronDown className={`w-4 h-4 transform ${showVersions ? 'rotate-180' : ''}`} />
        </button>
        
        {showVersions && (
          <div className="mt-2 space-y-2">
            {versions.slice().reverse().map((version, index) => (
              <button
                key={version.timestamp}
                onClick={() => setPrompt(version.prompt)}
                className="w-full p-2 text-left text-sm hover:bg-gray-50 rounded-lg"
              >
                {new Date(version.timestamp).toLocaleString()}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <ConciergeButton />
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};