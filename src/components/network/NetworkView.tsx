import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Linkedin, Mail, ThumbsUp, ThumbsDown, Search, Link } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

interface Contact {
  id: string;
  name: string;
  position: string;
  company: string;
  profilePicture: string;
  connectionStrength: number;
  email?: string;
  linkedinHandle?: string;
  canIntroduceTo: number;
  connectionReason?: string;
}

const MOCK_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Alex Thompson',
    position: 'CTO',
    company: 'TechGrowth',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    connectionStrength: 85,
    email: 'alex@techgrowth.com',
    linkedinHandle: 'alexthompson',
    canIntroduceTo: 2,
    connectionReason: 'Worked together at DataTech (2019-2021)'
  },
  {
    id: 'c2',
    name: 'Lisa Chen',
    position: 'VP Engineering',
    company: 'DataFlow',
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    connectionStrength: 92,
    linkedinHandle: 'lisachen',
    canIntroduceTo: 1,
    connectionReason: 'Connected via AI Summit 2023, regular engagement on posts'
  },
  {
    id: 'c3',
    name: 'Marcus Rodriguez',
    position: 'Head of AI',
    company: 'InnovateCo',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    connectionStrength: 95,
    email: 'marcus@innovateco.com',
    linkedinHandle: 'marcusrodriguez',
    canIntroduceTo: 1,
    connectionReason: 'Former colleague, studied together at Stanford'
  }
];

interface ConnectionStatus {
  linkedin: boolean;
  gmail: boolean;
}

export const NetworkView = () => {
  const { setCurrentView, setActiveFilter } = useStore();
  const [contacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [connectionStatus] = useState<ConnectionStatus>({
    linkedin: true,
    gmail: false
  });

  const handleViewProspects = (contact: Contact) => {
    setCurrentView('prospects');
    setActiveFilter({
      type: 'connector',
      id: contact.id,
      name: contact.name
    });
  };

  const getConnectionStrengthTooltip = (contact: Contact) => {
    return contact.connectionReason || 'Connection strength based on interaction history';
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Network</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
          </div>
          <button
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
              connectionStatus.linkedin ? 'bg-blue-50 text-blue-700 border-blue-200' : 'hover:bg-gray-50'
            }`}
          >
            <Linkedin className="w-5 h-5" />
            {connectionStatus.linkedin ? 'LinkedIn Connected' : 'Connect LinkedIn'}
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
              connectionStatus.gmail ? 'bg-blue-50 text-blue-700 border-blue-200' : 'hover:bg-gray-50'
            }`}
          >
            <Mail className="w-5 h-5" />
            {connectionStatus.gmail ? 'Gmail Connected' : 'Connect Gmail'}
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-3 border-b grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-500">
          <div className="col-span-4">Contact</div>
          <div className="col-span-3">Position</div>
          <div className="col-span-2 text-center">Connection Strength</div>
          <div className="col-span-3">Actions</div>
        </div>

        <div className="divide-y">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4 flex items-center gap-3">
                <img
                  src={contact.profilePicture}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {contact.name}
                    <div className="flex gap-1">
                      {contact.linkedinHandle && (
                        <a
                          href={`https://linkedin.com/in/${contact.linkedinHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {contact.email && (
                        <span className="text-gray-400">
                          <Mail className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{contact.company}</div>
                </div>
              </div>

              <div className="col-span-3 text-gray-600">
                {contact.position}
              </div>

              <div className="col-span-2 flex justify-center">
                <Tooltip content={getConnectionStrengthTooltip(contact)}>
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                    contact.connectionStrength >= 80
                      ? 'bg-green-100 text-green-800'
                      : contact.connectionStrength >= 60
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {contact.connectionStrength}
                  </div>
                </Tooltip>
              </div>

              <div className="col-span-3 flex items-center gap-4">
                {contact.canIntroduceTo > 0 && (
                  <button
                    onClick={() => handleViewProspects(contact)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Can introduce to {contact.canIntroduceTo} prospects
                  </button>
                )}
                <div className="flex gap-1">
                  <Tooltip content="Approve as strong connection">
                    <button className="p-1 hover:bg-green-50 rounded-full">
                      <ThumbsUp className="w-4 h-4 text-gray-400 hover:text-green-600" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Mark as weak connection">
                    <button className="p-1 hover:bg-red-50 rounded-full">
                      <ThumbsDown className="w-4 h-4 text-gray-400 hover:text-red-600" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};