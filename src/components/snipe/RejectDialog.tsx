import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const REJECT_REASONS = [
  { id: 'wrong-person', label: 'Wrong person/role' },
  { id: 'company-size', label: 'Company too small/large' },
  { id: 'industry', label: 'Wrong industry' },
  { id: 'timing', label: 'Bad timing' },
  { id: 'competitor', label: 'Using competitor' },
  { id: 'budget', label: 'No budget' },
  { id: 'other', label: 'Other' }
];

interface RejectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: (reasons: string[], customReason: string) => void;
}

export const RejectDialog = ({ isOpen, onClose, onReject }: RejectDialogProps) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const toggleReason = (reasonId: string) => {
    if (reasonId === 'other') {
      setShowCustomInput(!showCustomInput);
      if (selectedReasons.includes('other')) {
        setSelectedReasons(selectedReasons.filter(r => r !== 'other'));
        setCustomReason('');
      } else {
        setSelectedReasons([...selectedReasons, 'other']);
      }
    } else {
      setSelectedReasons(prev => 
        prev.includes(reasonId)
          ? prev.filter(r => r !== reasonId)
          : [...prev, reasonId]
      );
    }
  };

  const handleSubmit = () => {
    const reasons = selectedReasons.filter(r => r !== 'other');
    onReject(reasons, customReason);
    setSelectedReasons([]);
    setCustomReason('');
    setShowCustomInput(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Reject Prospect</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Reasons for Rejection
          </label>
          <div className="flex flex-wrap gap-2">
            {REJECT_REASONS.map((reason) => (
              <button
                key={reason.id}
                onClick={() => toggleReason(reason.id)}
                className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1 transition-colors ${
                  selectedReasons.includes(reason.id)
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {reason.label}
                {selectedReasons.includes(reason.id) && (
                  <X className="w-3 h-3" />
                )}
              </button>
            ))}
          </div>
        </div>

        {showCustomInput && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Custom Reason
            </label>
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg h-24 resize-none"
              placeholder="Enter your custom reason..."
            />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            disabled={selectedReasons.length === 0 || (showCustomInput && !customReason)}
          >
            Reject Prospect
          </button>
        </div>
      </div>
    </div>
  );
};