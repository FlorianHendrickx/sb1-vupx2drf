import React, { useState } from 'react';
import type { Prospect, IntroPath } from '../../types';
import { BriefingHeader } from './sections/BriefingHeader';
import { ScoreDisplay } from '../scores/ScoreDisplay';
import { ScoreFeedback } from '../scores/ScoreFeedback';
import { CollapsibleSection } from './sections/CollapsibleSection';
import { IntroPathDisplay } from './IntroPathDisplay';

interface ProspectBriefingProps {
  prospect: Prospect;
  onRequestIntro: (introPath: IntroPath) => void;
}

export const ProspectBriefing = ({ prospect, onRequestIntro }: ProspectBriefingProps) => {
  const [openSections, setOpenSections] = useState<string[]>(['score-reasoning']);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleScoreFeedback = (type: string, isPositive: boolean, reason?: string) => {
    console.log('Score feedback:', { type, isPositive, reason });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
      <BriefingHeader prospect={prospect} />

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          {prospect.timingScore >= 60 && (
            <span className="text-xl">
              {prospect.timingScore >= 80 ? '🔥🔥' : '🔥'}
            </span>
          )}
          <ScoreDisplay score={prospect.timingScore} label="TIMING" />
        </div>
        <ScoreDisplay score={prospect.icpScore} label="ICP" />
      </div>

      <div className="space-y-4">
        <CollapsibleSection
          title="Score Reasoning"
          isOpen={openSections.includes('score-reasoning')}
          onToggle={() => toggleSection('score-reasoning')}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">ICP Score ({prospect.icpScore})</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ Perfect company size match</li>
                <li>✓ Target industry alignment</li>
                <li>✓ Decision maker role</li>
                <li>✓ Recent funding secured</li>
              </ul>
              <div className="mt-2">
                <ScoreFeedback scoreType="icp" onFeedback={handleScoreFeedback} />
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Timing Score ({prospect.timingScore})</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>🔥 Recently viewed pricing page</li>
                <li>📈 Company in growth phase</li>
                <li>💼 New role (3 months)</li>
              </ul>
              <div className="mt-2">
                <ScoreFeedback scoreType="timing" onFeedback={handleScoreFeedback} />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {prospect.introPaths && prospect.introPaths.length > 0 && (
          <CollapsibleSection
            title="Introduction Paths"
            count={prospect.introPaths.length}
            isOpen={openSections.includes('intro-paths')}
            onToggle={() => toggleSection('intro-paths')}
          >
            <IntroPathDisplay 
              introPaths={prospect.introPaths}
              onRequestIntro={onRequestIntro}
            />
          </CollapsibleSection>
        )}

        <CollapsibleSection
          title="Personalization Angles"
          count={3}
          isOpen={openSections.includes('personalization')}
          onToggle={() => toggleSection('personalization')}
        >
          <div className="space-y-2 text-sm">
            <div className="mb-2">
              <h4 className="font-medium">Recent Posts</h4>
              <p>Shared article about AI implementation challenges</p>
            </div>
            <div className="mb-2">
              <h4 className="font-medium">Company News</h4>
              <p>Recently raised Series B funding ($25M)</p>
            </div>
            <div className="mb-2">
              <h4 className="font-medium">Professional Updates</h4>
              <p>Started new role as {prospect.position} 3 months ago</p>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Prospect Summary"
          isOpen={openSections.includes('summary')}
          onToggle={() => toggleSection('summary')}
        >
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              {prospect.firstName} is a seasoned {prospect.position} at {prospect.company}, 
              focusing on scaling AI operations and improving infrastructure efficiency. 
              Their company recently secured Series B funding and is actively expanding their team.
            </p>
            <p>
              Key interests include machine learning optimization, team leadership, and 
              technical strategy. Active speaker at industry conferences and regular 
              contributor to tech communities.
            </p>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};