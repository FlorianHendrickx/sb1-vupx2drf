import React, { useState } from 'react';
import { Users, ChevronDown, ChevronUp } from 'lucide-react';
import type { IntroPath } from '../../types';
import { ScoreDisplay } from './ScoreDisplay';
import { Tooltip } from '../ui/Tooltip';

interface IntroPathDisplayProps {
  introPaths: IntroPath[];
  onRequestIntro: (introPath: IntroPath) => void;
}

export const IntroPathDisplay = ({ introPaths, onRequestIntro }: IntroPathDisplayProps) => {
  const [showAll, setShowAll] = useState(false);

  const displayPaths = showAll ? introPaths : introPaths.slice(0, 2);
  const hasMore = introPaths.length > 2;

  const getConnectionTooltip = (strength: number, type: 'your' | 'their') => {
    if (type === 'your') {
      if (strength >= 80) return 'Strong connection:\n- Regular interactions\n- Worked together\n- Multiple shared experiences';
      if (strength >= 60) return 'Moderate connection:\n- Occasional interactions\n- Some shared experiences\n- Connected for over a year';
      return 'Weak connection:\n- Limited interactions\n- Recently connected\n- No shared experiences';
    } else {
      if (strength >= 80) return 'Strong connection:\n- Direct colleagues\n- Regular communication\n- Recent collaboration';
      if (strength >= 60) return 'Moderate connection:\n- Industry peers\n- Some interactions\n- Common network';
      return 'Weak connection:\n- Limited interaction\n- Distant connection\n- No recent activity';
    }
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg mb-4">
      <div className="flex items-center justify-between text-blue-800 font-medium mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          {introPaths.length} Introduction {introPaths.length === 1 ? 'Path' : 'Paths'} Available
        </div>
      </div>

      <div className="space-y-4">
        {displayPaths.map((introPath) => (
          <div key={introPath.id} className="bg-white rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <img
                  src={introPath.connector.profilePicture}
                  alt={introPath.connector.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium">{introPath.connector.name}</div>
                  <div className="text-sm text-gray-600">
                    {introPath.connector.position} at {introPath.connector.company}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 mb-3 px-2">
              <Tooltip content={getConnectionTooltip(introPath.connector.connectionStrength, 'your')}>
                <div className="flex flex-col items-center">
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                    introPath.connector.connectionStrength >= 80
                      ? 'bg-green-100 text-green-800'
                      : introPath.connector.connectionStrength >= 60
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {introPath.connector.connectionStrength}
                  </div>
                  <span className="text-xs text-gray-600 mt-1">Your Connection</span>
                </div>
              </Tooltip>

              <div className="border-t w-16 border-gray-200"></div>

              <Tooltip content={getConnectionTooltip(introPath.strength, 'their')}>
                <div className="flex flex-col items-center">
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                    introPath.strength >= 80
                      ? 'bg-green-100 text-green-800'
                      : introPath.strength >= 60
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {introPath.strength}
                  </div>
                  <span className="text-xs text-gray-600 mt-1">Their Connection</span>
                </div>
              </Tooltip>
            </div>

            {introPath.path.length > 0 && (
              <div className="mt-2 pl-4 border-l-2 border-blue-100">
                <div className="text-sm text-gray-500">via</div>
                {introPath.path.map((step, index) => (
                  <div key={step.id} className="text-sm text-gray-600">
                    {step.name} ({step.position} at {step.company})
                    {index < introPath.path.length - 1 && ' → '}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => onRequestIntro(introPath)}
              className={`mt-3 w-full px-3 py-1.5 text-sm rounded-lg ${
                introPath.connector.connectionStrength >= 80 && introPath.strength >= 80
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!(introPath.connector.connectionStrength >= 80 && introPath.strength >= 80)}
            >
              {introPath.connector.connectionStrength >= 80 && introPath.strength >= 80
                ? 'Request Intro'
                : 'Connection too weak for intro'}
            </button>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show {introPaths.length - 2} More <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
};