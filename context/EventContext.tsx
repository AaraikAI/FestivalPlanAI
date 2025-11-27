
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event, Vendor } from '../types';
import { MOCK_EVENTS, MOCK_VENDORS } from '../constants';

interface EventContextType {
  events: Event[];
  vendors: Vendor[];
  addEvent: (newEvent: Event) => void;
  addVendor: (newVendor: Vendor) => void;
  addVendorToEvent: (eventId: string, vendorId: string) => void;
  updateEvent: (updatedEvent: Event) => void;
  getEvent: (id: string) => Event | undefined;
  getVendor: (id: string) => Vendor | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [vendors, setVendors] = useState<Vendor[]>(MOCK_VENDORS);

  const addEvent = (newEvent: Event) => {
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  const addVendor = (newVendor: Vendor) => {
    setVendors(prev => [newVendor, ...prev]);
  };

  const addVendorToEvent = (eventId: string, vendorId: string) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        // Prevent duplicates
        if (event.vendors.includes(vendorId)) return event;
        return { ...event, vendors: [...event.vendors, vendorId] };
      }
      return event;
    }));
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(prevEvents => prevEvents.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const getEvent = (id: string) => events.find(e => e.id === id);
  const getVendor = (id: string) => vendors.find(v => v.id === id);

  return (
    <EventContext.Provider value={{ events, vendors, addEvent, addVendor, addVendorToEvent, updateEvent, getEvent, getVendor }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
