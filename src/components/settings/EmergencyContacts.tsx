import React, { useState } from 'react';
import { Phone, Plus, Edit, Trash2, User } from 'lucide-react';
import DashboardCard from '../dashboard/DashboardCard';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
  onAddContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  onEditContact: (id: string, contact: Partial<EmergencyContact>) => void;
  onDeleteContact: (id: string) => void;
}

const EmergencyContacts: React.FC<EmergencyContactsProps> = ({
  contacts,
  onAddContact,
  onEditContact,
  onDeleteContact
}) => {
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    isPrimary: false
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone && newContact.relationship) {
      onAddContact(newContact);
      setNewContact({
        name: '',
        relationship: '',
        phone: '',
        isPrimary: false
      });
      setIsAddingContact(false);
    }
  };

  return (
    <DashboardCard 
      title="Emergency Contacts" 
      icon={Phone}
      headerAction={
        <button
          onClick={() => setIsAddingContact(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Contact</span>
        </button>
      }
    >
      {/* Add New Contact Form */}
      {isAddingContact && (
        <div className="mb-6 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Add Emergency Contact</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship</label>
              <select
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select relationship</option>
                <option value="Parent">Parent</option>
                <option value="Guardian">Guardian</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Sibling">Sibling</option>
                <option value="Uncle/Aunt">Uncle/Aunt</option>
                <option value="Family Friend">Family Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newContact.isPrimary}
                  onChange={(e) => setNewContact({ ...newContact, isPrimary: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-semibold text-gray-700">Primary Contact</span>
              </label>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddContact}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Contact
            </button>
            <button
              onClick={() => setIsAddingContact(false)}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Existing Contacts */}
      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="text-center py-8">
            <Phone className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-lg font-semibold text-gray-900">No Emergency Contacts</p>
            <p className="text-gray-600">Add emergency contacts for faster response</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                    {contact.isPrimary && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                  <p className="text-sm text-blue-600 font-medium">{contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.open(`tel:${contact.phone}`)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Phone className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteContact(contact.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardCard>
  );
};

export default EmergencyContacts;