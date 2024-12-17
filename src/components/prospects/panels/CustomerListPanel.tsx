import React, { useState } from 'react';
import { X, Upload, Database, Info, Table } from 'lucide-react';
import { Tooltip } from '../../ui/Tooltip';
import { ConciergeButton } from '../../ui/ConciergeButton';

const SUGGESTED_CUSTOMERS = [
  { domain: 'techcorp.com', source: 'Website Testimonial' },
  { domain: 'innovatelabs.com', source: 'Case Study' },
  { domain: 'dataflow.io', source: 'LinkedIn Post' }
];

export const CustomerListPanel = ({ onClose }: { onClose: () => void }) => {
  const [customers, setCustomers] = useState<string[]>([]);
  const [newCustomer, setNewCustomer] = useState('');

  const handleAddCustomer = () => {
    if (newCustomer.trim()) {
      setCustomers([...customers, newCustomer.trim()]);
      setNewCustomer('');
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Customer List</h2>
          <Tooltip content="We automatically detect customers from your website testimonials and public case studies">
            <Info className="w-4 h-4 text-gray-400" />
          </Tooltip>
        </div>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
              placeholder="Add customer domain"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleAddCustomer}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              Upload CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Database className="w-4 h-4" />
              Connect CRM
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Your Customers</h3>
          <div className="space-y-2">
            {customers.map((domain, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
              >
                <span>{domain}</span>
                <button
                  onClick={() => setCustomers(customers.filter((_, i) => i !== index))}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Suggested Customers</h3>
          <div className="space-y-2">
            {SUGGESTED_CUSTOMERS.map((customer, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
              >
                <div>
                  <div>{customer.domain}</div>
                  <div className="text-xs text-gray-500">Source: {customer.source}</div>
                </div>
                <button
                  onClick={() => setCustomers([...customers, customer.domain])}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        <ConciergeButton />
      </div>
    </div>
  );
};