// Add to the existing Prospect interface:
export interface Prospect {
  // ... existing fields ...
  tags?: {
    type: 'intro-paths' | 'event' | 'competitor' | 'lookalike';
    label: string;
  }[];
}