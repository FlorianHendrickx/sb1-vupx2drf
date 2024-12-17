import React from 'react';
import { useStore } from '../store/useStore';
import { ProspectCard } from './prospects/ProspectCard';

export const ProspectList = () => {
  const { prospects, setCurrentProspect } = useStore();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Prospects</h2>
      </div>
      
      <div className="divide-y">
        {prospects.map((prospect) => (
          <ProspectCard
            key={prospect.id}
            prospect={prospect}
            onClick={() => setCurrentProspect(prospect)}
          />
        ))}
      </div>
    </div>
  );
};