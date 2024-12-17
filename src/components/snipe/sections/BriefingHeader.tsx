import React from 'react';
import { Linkedin, MessageSquare } from 'lucide-react';
import type { Prospect } from '../../../types';
import { getTagColor } from '../../../utils/tagColors';

interface BriefingHeaderProps {
  prospect: Prospect;
}

export const BriefingHeader = ({ prospect }: BriefingHeaderProps) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <img
        src={prospect.profilePicture}
        alt={`${prospect.firstName} ${prospect.lastName}`}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {prospect.firstName} {prospect.lastName}
          <div className="flex gap-1">
            {prospect.linkedinHandle && (
              <a
                href={`https://linkedin.com/in/${prospect.linkedinHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {prospect.email && (
              <span className="text-gray-400">
                <MessageSquare className="w-5 h-5" />
              </span>
            )}
          </div>
        </h2>
        <p className="text-gray-600">
          {prospect.position} at {prospect.company}
        </p>
        {prospect.tags && (
          <div className="flex flex-wrap gap-2 mt-2">
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
    </div>
  );
};