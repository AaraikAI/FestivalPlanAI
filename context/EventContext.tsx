
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Event, Vendor } from '../types';
import { MOCK_EVENTS, MOCK_VENDORS } from '../constants';
import { encryptData, decryptData } from '../services/storageService';

interface EventContextType {
  events: Event[];
  vendors: Vendor[];
  addEvent: (newEvent: Event) => void;
  addVendor: (newVendor: Vendor) => void;
  updateVendor: (updatedVendor: Vendor) => void;
  addVendorToEvent: (eventId: string, vendorId: string) => void;
  updateEvent: (updatedEvent: Event) => void;
  getEvent: (id: string) => Event | undefined;
  getVendor: (id: string) => Vendor | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Data
  useEffect(() => {
    const loadData = async () => {
        const storedEvents = localStorage.getItem('festplan_events');
        const storedVendors = localStorage.getItem('festplan_vendors');
        
        if (storedEvents) {
            const dec = await decryptData<Event[]>(storedEvents, MOCK_EVENTS);
            setEvents(dec);
        } else {
            setEvents(MOCK_EVENTS);
        }

        if (storedVendors) {
            const dec = await decryptData<Vendor[]>(storedVendors, MOCK_VENDORS);
            setVendors(dec);
        } else {
            setVendors(MOCK_VENDORS);
        }
        setIsLoaded(true);
    };
    loadData();
  }, []);

  // Save Data
  useEffect(() => {
    if (!isLoaded) return;
    const saveEvents = async () => {
        const enc = await encryptData(events);
        localStorage.setItem('festplan_events', enc);
    };
    saveEvents();
  }, [events, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const saveVendors = async () => {
        const enc = await encryptData(vendors);
        localStorage.setItem('festplan_vendors', enc);
    };
    saveVendors();
  }, [vendors, isLoaded]);

  const addEvent = (newEvent: Event) => {
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };

  const addVendor = (newVendor: Vendor) => {
    setVendors(prev => [newVendor, ...prev]);
  };
  
  const updateVendor = (updatedVendor: Vendor) => {
      setVendors(prev => prev.map(v => v.id === updatedVendor.id ? updatedVendor : v));
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
    <EventContext.Provider value={{ events, vendors, addEvent, addVendor, updateVendor, addVendorToEvent, updateEvent, getEvent, getVendor }}>
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
