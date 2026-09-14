import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Users,
  CheckSquare,
  Square,
  Plus,
  Copy,
  Check,
  Shield,
  Sparkles,
  Wifi
} from 'lucide-react';

export const GroupSyncModal: React.FC = () => {
  const {
    isGroupModalOpen,
    setGroupModalOpen,
    groupMembers,
    packingList,
    togglePackingItem,
    addPackingItem,
    showToast,
    isOffline
  } = useApp();

  const [activeTab, setActiveTab] = useState<'members' | 'packing'>('members');
  const [copiedCode, setCopiedCode] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'essentials' | 'clothing' | 'electronics' | 'gear'>('essentials');
  const [newItemAssignee, setNewItemAssignee] = useState('All');

  if (!isGroupModalOpen) return null;

  const inviteCode = 'VOY-AMALFI-7729';

  const copyInvite = () => {
    navigator.clipboard?.writeText(inviteCode);
    setCopiedCode(true);
    showToast('Group expedition code copied to clipboard!', 'content_copy');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAddPacking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    addPackingItem(newItemText.trim(), newItemCategory, newItemAssignee);
    setNewItemText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full shadow-2xl border border-surface-container-high/40 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-surface-container-high/40 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface leading-tight">
                Collaborative Group Hub
              </h3>
              <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
                {isOffline ? 'Local Sync Queue' : 'Real-time broadcast sync active across devices'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setGroupModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-surface-container-high/40 bg-surface-container-low/50 px-4">
          <button
            onClick={() => setActiveTab('members')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'members'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Expedition Members ({groupMembers.length})
          </button>
          <button
            onClick={() => setActiveTab('packing')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'packing'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Shared Packing Checklist ({packingList.filter((p) => p.isCompleted).length}/{packingList.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'members' ? (
            <div className="flex flex-col gap-4">
              {/* Invite Code Box */}
              <div className="bg-surface-container-low rounded-xl p-4 border border-surface-container-high/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
                    Group Invite Code
                  </span>
                  <p className="font-mono font-bold text-sm text-on-surface">{inviteCode}</p>
                </div>
                <button
                  onClick={copyInvite}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Members List */}
              <div className="flex flex-col gap-2.5">
                {groupMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span
                          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-surface ${
                            member.isOnline ? 'bg-emerald-500' : 'bg-zinc-400'
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                          {member.name}
                          {member.role === 'Organizer' && (
                            <span className="px-1.5 py-0.2 rounded bg-primary/15 text-primary text-[9px] font-extrabold uppercase">
                              Lead
                            </span>
                          )}
                        </h4>
                        <span className="text-[11px] text-on-surface-variant">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold text-secondary">
                      {member.isOnline ? 'Online now' : 'Seen 2h ago'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Add item to list */}
              <form onSubmit={handleAddPacking} className="flex gap-2">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="Add item (e.g. Linen shirt, Sunscreen SPF 50)..."
                  className="flex-1 bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high text-xs text-on-surface focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              {/* Items List */}
              <div className="flex flex-col gap-2">
                {packingList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => togglePackingItem(item.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      item.isCompleted
                        ? 'bg-surface-container-low/50 border-surface-container-high/30 opacity-70'
                        : 'bg-surface-container-low border-surface-container-high/60 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.isCompleted ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-outline" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          item.isCompleted ? 'line-through text-outline' : 'text-on-surface'
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container font-semibold text-on-surface-variant uppercase">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-secondary font-medium">
                        {item.assignedTo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
