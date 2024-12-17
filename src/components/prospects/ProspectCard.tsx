import React from 'react';
import { Linkedin, MessageSquare, Phone, ThumbsDown } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { getTagColor } from '../../utils/tagColors';
import type { Prospect } from '../../types';

interface ProspectCardProps {
  prospect: Prospect;
  onClick: () => void;
}

export const ProspectCard = ({ prospect, onClick }: ProspectCardProps) => {
  const getTimingTooltip = (score: number) => {
    const reasons = [
      '🔥 Recently viewed pricing page',
      '📈 Company in growth phase',
      '💼 New role (3 months)',
      '🎯 Active in target market',
      '📱 High engagement on LinkedIn'
    ];
    
    if (score >= 80) return reasons.join('\n');
    if (score >= 60) return reasons.slice(0, 3).join('\n');
    return '⚠️ No recent engagement signals\n❌ Low activity score\n⏰ No urgency indicators';
  };

  const getIcpTooltip = (score: number) => {
    return [
      '✓ Perfect company size match',
      '✓ Target industry alignment',
      '✓ Decision maker role',
      '✓ Recent funding secured'
    ].join('\n');
  };

  return (
    <div 
      onClick={onClick}
      className="px-6 py-4 hover:bg-gray-50 cursor-pointer grid grid-cols-12 gap-4 items-center"
    >
      <div className="col-span-4 flex items-center gap-4">
        <img
          src={prospect.profilePicture}
          alt={`${prospect.firstName} ${prospect.lastName}`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="font-medium flex items-center gap-2">
            {prospect.firstName} {prospect.lastName}
            <div className="flex gap-1">
              {prospect.linkedinHandle && (
                <a
                  href={`https://linkedin.com/in/${prospect.linkedinHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {prospect.email && (
                <span className="text-gray-400">
                  <MessageSquare className="w-4 h-4" />
                </span>
              )}
              {prospect.phone && (
                <span className="text-gray-400">
                  <Phone className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {prospect.position} at {prospect.company}
          </div>
        </div>
      </div>

      <div className="col-span-3">
        {prospect.tags && (
          <div className="flex flex-wrap gap-2">
            {prospect.tags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded-full ${getTagColor(tag.type)}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="col-span-2 flex justify-center">
        <Tooltip content={getTimingTooltip(prospect.timingScore)}>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            prospect.timingScore >= 80
              ? 'bg-green-100 text-green-800'
              : prospect.timingScore >= 60
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {prospect.timingScore}
          </div>
        </Tooltip>
      </div>

      <div className="col-span-2 flex justify-center">
        <Tooltip content={getIcpTooltip(prospect.icpScore)}>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            prospect.icpScore >= 80
              ? 'bg-green-100 text-green-800'
              : prospect.icpScore >= 60
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {prospect.icpScore}
          </div>
        </Tooltip>
      </div>

      <div className="col-span-1 flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement reject functionality
          }}
          className="p-1 hover:bg-red-50 rounded-full"
        >
          <ThumbsDown className="w-5 h-5 text-gray-400 hover:text-red-600" />
        </button>
      </div>
    </div>
  );
};