import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { ProspectBriefing } from './ProspectBriefing';
import { SequenceEditor } from './SequenceEditor';
import { RegenerationPanel } from './RegenerationPanel';
import { RejectDialog } from './RejectDialog';
import { ActionBar } from './ActionBar';
import type { SequenceStep, IntroPath } from '../../types';

const initialSteps: SequenceStep[] = [
  {
    id: '1',
    type: 'email',
    subject: 'Quick question about your AI initiatives',
    message: 'Hi {{firstName}},\n\nI noticed that {{company}} has been making waves in the AI space...',
    isOpen: true,
    score: 85
  }
];

const MIN_PANEL_WIDTH = 400;
const MAX_PANEL_WIDTH = 800;

export const SnipeMode = () => {
  const { currentProspect, clearCurrentProspect, nextProspect } = useStore();
  const [steps, setSteps] = useState<SequenceStep[]>(initialSteps);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showRegeneration, setShowRegeneration] = useState(false);
  const [selectedSteps, setSelectedSteps] = useState<SequenceStep[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isRequestingIntro, setIsRequestingIntro] = useState<{ connector: { name: string } } | null>(null);
  const [briefingWidth, setBriefingWidth] = useState(500);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = briefingWidth;
    document.body.style.cursor = 'col-resize';
  };

  const handleAddStep = () => {
    const newStep: SequenceStep = {
      id: String(Date.now()),
      type: 'email',
      subject: '',
      message: '',
      isOpen: true,
      score: 85
    };
    setSteps([...steps, newStep]);
  };

  const handleSendAndNext = async () => {
    setIsSending(true);
    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSending(false);
    nextProspect();
  };

  const handleReject = (reasons: string[], customReason: string) => {
    console.log('Rejecting with reasons:', reasons, customReason);
    setShowRejectDialog(false);
    nextProspect();
  };

  const handleRequestIntro = (introPath: IntroPath) => {
    setIsRequestingIntro({ connector: introPath.connector });
    // Reset steps with intro request template
    setSteps([{
      id: '1',
      type: 'email',
      subject: `Quick intro request to ${currentProspect?.firstName}`,
      message: `Hi ${introPath.connector.name},\n\nI noticed you're well connected with ${currentProspect?.firstName} at ${currentProspect?.company}. Would you be open to making an introduction?`,
      isOpen: true,
      score: 85
    }]);
  };

  const handleCloseIntroRequest = () => {
    setIsRequestingIntro(null);
    // Reset steps back to normal outreach
    setSteps(initialSteps);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      
      const delta = e.clientX - startX.current;
      const newWidth = Math.max(
        MIN_PANEL_WIDTH,
        Math.min(MAX_PANEL_WIDTH, startWidth.current + delta)
      );
      setBriefingWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!currentProspect) return null;

  return (
    <div className="fixed inset-0 bg-gray-100" style={{ marginLeft: 'var(--nav-width, 64px)' }}>
      <ActionBar
        onBack={clearCurrentProspect}
        onReject={() => setShowRejectDialog(true)}
        onSkip={nextProspect}
        onAddStep={handleAddStep}
        onToggleRegenerate={() => setShowRegeneration(!showRegeneration)}
        isSending={isSending}
        onSendAndNext={handleSendAndNext}
        isRequestingIntro={isRequestingIntro}
        onCloseIntroRequest={handleCloseIntroRequest}
      />

      <div className="p-8 flex gap-6 h-[calc(100vh-4rem)]">
        <div style={{ width: `${briefingWidth}px`, flexShrink: 0 }}>
          <ProspectBriefing 
            prospect={currentProspect}
            onRequestIntro={handleRequestIntro}
          />
        </div>

        <div 
          className="w-1 hover:bg-blue-200 cursor-col-resize transition-colors"
          onMouseDown={handleMouseDown}
        />

        <div className="flex-1 relative">
          <div className={`bg-white rounded-lg shadow ${isRequestingIntro ? 'border-2 border-blue-500' : ''}`}>
            {isRequestingIntro && (
              <div className="flex justify-between items-center px-6 py-2 bg-blue-50 border-b">
                <span className="text-blue-700 font-medium">
                  Requesting Introduction via {isRequestingIntro.connector.name}
                </span>
                <button 
                  onClick={handleCloseIntroRequest}
                  className="text-blue-700 hover:text-blue-800"
                >
                  ×
                </button>
              </div>
            )}
            <SequenceEditor
              steps={steps}
              setSteps={setSteps}
              showRegeneration={showRegeneration}
              onStepSelect={setSelectedSteps}
              onToggleRegenerate={() => setShowRegeneration(true)}
            />
          </div>

          {showRegeneration && (
            <div className="absolute top-0 left-0 bottom-0 w-[400px] bg-white shadow-lg transform -translate-x-full border-r">
              <RegenerationPanel
                selectedSteps={selectedSteps}
                onClose={() => setShowRegeneration(false)}
              />
            </div>
          )}
        </div>
      </div>

      <RejectDialog
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        onReject={handleReject}
      />
    </div>
  );
};