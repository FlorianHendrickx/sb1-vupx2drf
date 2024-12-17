import React, { useState } from 'react';
import { X, Upload, Plus, Users, Table, Calendar } from 'lucide-react';
import { ConciergeButton } from '../../ui/ConciergeButton';

interface Event {
  id: string;
  name: string;
  url: string;
  startDate: string;
  endDate: string;
  hasAttendees?: boolean;
}

const YOUR_EVENTS: Event[] = [
  {
    id: '1',
    name: 'AI Summit London',
    url: 'https://aisummit.com/london',
    startDate: '2024-05-15',
    endDate: '2024-05-17',
    hasAttendees: true
  },
  {
    id: '2',
    name: 'SaaS Growth Conference',
    url: 'https://saasgrowth.co',
    startDate: '2024-06-20',
    endDate: '2024-06-22'
  }
];

const SUGGESTED_EVENTS: Event[] = [
  {
    id: '3',
    name: 'TechCrunch Disrupt',
    url: 'https://techcrunch.com/events/disrupt-2024',
    startDate: '2024-09-15',
    endDate: '2024-09-17'
  },
  {
    id: '4',
    name: 'AI DevWorld',
    url: 'https://aidevworld.com',
    startDate: '2024-10-10',
    endDate: '2024-10-12'
  }
];

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: Event) => void;
}

const AddEventDialog = ({ isOpen, onClose, onAdd }: AddEventDialogProps) => {
  const [newEvent, setNewEvent] = useState<Event>({
    id: String(Date.now()),
    name: '',
    url: '',
    startDate: '',
    endDate: ''
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Add New Event</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            placeholder="Event name"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="url"
            value={newEvent.url}
            onChange={(e) => setNewEvent({ ...newEvent, url: e.target.value })}
            placeholder="Event URL"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={newEvent.startDate}
              onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <input
              type="date"
              value={newEvent.endDate}
              onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAdd(newEvent);
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={!newEvent.name || !newEvent.startDate || !newEvent.endDate}
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

interface UploadAttendeesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  onUpload: (eventId: string | 'new', newEvent?: Event) => void;
}

const UploadAttendeesDialog = ({ isOpen, onClose, events, onUpload }: UploadAttendeesDialogProps) => {
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [newEvent, setNewEvent] = useState<Event>({
    id: 'new',
    name: '',
    url: '',
    startDate: '',
    endDate: ''
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Upload Attendee List</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Event</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Select an event...</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
            <option value="new">Create New Event</option>
          </select>
        </div>

        {selectedEvent === 'new' && (
          <div className="space-y-4 mb-4">
            <input
              type="text"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              placeholder="Event name"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="url"
              value={newEvent.url}
              onChange={(e) => setNewEvent({ ...newEvent, url: e.target.value })}
              placeholder="Event URL"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={newEvent.startDate}
                onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <input
                type="date"
                value={newEvent.endDate}
                onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                className="flex-1 px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedEvent === 'new') {
                onUpload('new', newEvent);
              } else {
                onUpload(selectedEvent);
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={!selectedEvent || (selectedEvent === 'new' && !newEvent.name)}
          >
            Upload List
          </button>
        </div>
      </div>
    </div>
  );
};

export const EventsPanel = ({ onClose }: { onClose: () => void }) => {
  const [events, setEvents] = useState<Event[]>(YOUR_EVENTS);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAddEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  const handleUploadAttendees = (eventId: string | 'new', newEvent?: Event) => {
    if (eventId === 'new' && newEvent) {
      setEvents([...events, { ...newEvent, hasAttendees: true }]);
    } else {
      setEvents(events.map(event => 
        event.id === eventId ? { ...event, hasAttendees: true } : event
      ));
    }
    setShowUploadDialog(false);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddDialog(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
          <button
            onClick={() => setShowUploadDialog(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Upload className="w-4 h-4" />
            Upload List
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Table className="w-4 h-4" />
            Connect Sheet
          </button>
        </div>

        <div>
          <h3 className="font-medium mb-2">Your Events</h3>
          <div className="space-y-2">
            {events.map((event) => (
              <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <a 
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-blue-600"
                    >
                      {event.name}
                    </a>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  {event.hasAttendees ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      List Added
                    </span>
                  ) : (
                    <button
                      onClick={() => setShowUploadDialog(true)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Add Attendees
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Suggested Events</h3>
          <div className="space-y-2">
            {SUGGESTED_EVENTS.map((event) => (
              <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <a 
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-blue-600"
                    >
                      {event.name}
                    </a>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddEvent(event)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ConciergeButton />
      </div>

      <AddEventDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={handleAddEvent}
      />

      <UploadAttendeesDialog
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
        events={events}
        onUpload={handleUploadAttendees}
      />
    </div>
  );
};