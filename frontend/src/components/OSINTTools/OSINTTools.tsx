'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import axios from 'axios';

export default function OSINTTools() {
  const [ipAddress, setIpAddress] = useState('');
  const [domain, setDomain] = useState('');
  const [lookupResult, setLookupResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { addEvent, addAsset } = useAppStore();

  const generateID = () => Math.random().toString(36).substr(2, 9);

  const handleIPLookup = async () => {
    if (!ipAddress) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/osint/ip-lookup?ip=${ipAddress}`);
      const data = response.data;
      
      if (data.success) {
        setLookupResult(JSON.stringify(data.data, null, 2));
        
        // Add event to feed
        addEvent({
          id: generateID(),
          timestamp: new Date(),
          type: 'signal',
          severity: 'medium',
          message: `IP lookup completed for ${ipAddress}: ${data.data.city}, ${data.data.country}`,
          source: 'OSINT_IP_LOOKUP'
        });

        // If location data is available, add asset to map
        if (data.data.latitude && data.data.longitude) {
          addAsset({
            id: `ip-${generateID()}`,
            name: `IP_${ipAddress}`,
            type: 'node',
            status: 'active',
            coordinates: { 
              lat: data.data.latitude, 
              lng: data.data.longitude 
            },
            lastSeen: new Date()
          });
        }
      } else {
        setLookupResult(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      setLookupResult('Error performing IP lookup: ' + (error instanceof Error ? error.message : 'Unknown error'));
      addEvent({
        id: generateID(),
        timestamp: new Date(),
        type: 'alert',
        severity: 'high',
        message: `IP lookup failed for ${ipAddress}`,
        source: 'OSINT_IP_LOOKUP'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWHOIS = async () => {
    if (!domain) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/osint/whois?domain=${domain}`);
      const data = response.data;
      
      if (data.success) {
        setLookupResult(JSON.stringify(data.data, null, 2));
        
        addEvent({
          id: generateID(),
          timestamp: new Date(),
          type: 'signal',
          severity: 'low',
          message: `WHOIS lookup completed for ${domain}: ${data.data.registrar}`,
          source: 'OSINT_WHOIS'
        });
      } else {
        setLookupResult(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      setLookupResult('Error performing WHOIS lookup: ' + (error instanceof Error ? error.message : 'Unknown error'));
      addEvent({
        id: generateID(),
        timestamp: new Date(),
        type: 'alert',
        severity: 'medium',
        message: `WHOIS lookup failed for ${domain}`,
        source: 'OSINT_WHOIS'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDNSLookup = async () => {
    if (!domain) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/osint/dns?domain=${domain}`);
      const data = response.data;
      
      if (data.success) {
        setLookupResult(JSON.stringify(data.data, null, 2));
        
        addEvent({
          id: generateID(),
          timestamp: new Date(),
          type: 'signal',
          severity: 'low',
          message: `DNS lookup completed for ${domain}: ${data.data.records?.length || 0} records found`,
          source: 'OSINT_DNS'
        });
      } else {
        setLookupResult(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      setLookupResult('Error performing DNS lookup: ' + (error instanceof Error ? error.message : 'Unknown error'));
      addEvent({
        id: generateID(),
        timestamp: new Date(),
        type: 'alert',
        severity: 'medium',
        message: `DNS lookup failed for ${domain}`,
        source: 'OSINT_DNS'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReverseDNS = async () => {
    if (!ipAddress) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/osint/reverse-dns?ip=${ipAddress}`);
      const data = response.data;
      
      if (data.success) {
        setLookupResult(JSON.stringify(data.data, null, 2));
        
        addEvent({
          id: generateID(),
          timestamp: new Date(),
          type: 'signal',
          severity: 'low',
          message: `Reverse DNS completed for ${ipAddress}: ${data.data.hostnames?.length || 0} hostnames found`,
          source: 'OSINT_REVERSE_DNS'
        });
      } else {
        setLookupResult(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      setLookupResult('Error performing Reverse DNS lookup: ' + (error instanceof Error ? error.message : 'Unknown error'));
      addEvent({
        id: generateID(),
        timestamp: new Date(),
        type: 'alert',
        severity: 'medium',
        message: `Reverse DNS lookup failed for ${ipAddress}`,
        source: 'OSINT_REVERSE_DNS'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-80 border-r border-tactical-border bg-tactical-bg/80 backdrop-blur-sm p-4 flex flex-col gap-4 overflow-y-auto z-30">
      {/* IP Lookup Tool */}
      <section className="border border-tactical-border bg-tactical-panel p-3 rounded-custom">
        <h2 className="text-[10px] font-bold text-brand uppercase tracking-widest mb-3 flex items-center justify-between">
          <span>IP Geolocation</span>
          <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-brand'}`}></span>
        </h2>
        <div className="space-y-2">
          <input 
            className="w-full bg-black border border-tactical-border text-xs p-2 focus:ring-1 focus:ring-brand focus:border-brand outline-none text-brand rounded-custom"
            placeholder="Enter IP Address..." 
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            disabled={isLoading}
          />
          <button 
            className={`w-full py-2 border text-[10px] font-bold uppercase transition-all rounded-custom ${
              isLoading 
                ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500 cursor-not-allowed' 
                : 'bg-brand/10 border-brand/40 text-brand hover:bg-brand/20'
            }`}
            onClick={handleIPLookup}
            disabled={isLoading}
          >
            {isLoading ? 'EXECUTING...' : 'EXECUTE TRACE'}
          </button>
        </div>
      </section>

      {/* Domain Lookup Tool */}
      <section className="border border-tactical-border bg-tactical-panel p-3 rounded-custom">
        <h2 className="text-[10px] font-bold text-brand uppercase tracking-widest mb-3">Lookup Suite</h2>
        <div className="space-y-2 mb-3">
          <input 
            className="w-full bg-black border border-tactical-border text-xs p-2 focus:ring-1 focus:ring-brand focus:border-brand outline-none text-brand rounded-custom"
            placeholder="Enter Domain..." 
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button 
            className={`text-[9px] border py-1 transition-colors rounded-custom ${
              isLoading 
                ? 'border-yellow-500/50 text-yellow-500 cursor-not-allowed' 
                : 'border-tactical-border hover:bg-brand/10'
            }`}
            onClick={handleWHOIS}
            disabled={isLoading}
          >
            WHOIS
          </button>
          <button 
            className={`text-[9px] border py-1 transition-colors rounded-custom ${
              isLoading 
                ? 'border-yellow-500/50 text-yellow-500 cursor-not-allowed' 
                : 'border-tactical-border hover:bg-brand/10'
            }`}
            onClick={handleDNSLookup}
            disabled={isLoading}
          >
            DNS Record
          </button>
          <button 
            className={`text-[9px] border py-1 transition-colors rounded-custom ${
              isLoading 
                ? 'border-yellow-500/50 text-yellow-500 cursor-not-allowed' 
                : 'border-tactical-border hover:bg-brand/10'
            }`}
            onClick={handleReverseDNS}
            disabled={isLoading}
          >
            Reverse IP
          </button>
          <button className="text-[9px] border border-tactical-border py-1 hover:bg-brand/10 transition-colors rounded-custom">
            Subdomains
          </button>
        </div>
        <div className="p-2 bg-black/50 border border-tactical-border rounded-custom">
          <pre className="text-[9px] text-tactical-muted overflow-hidden max-h-32 whitespace-pre-wrap">
            {lookupResult || '$ dig atlas-intel.mil ANY\n; <<>> DiG 9.10.6 <<>>\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 45291'}
          </pre>
        </div>
      </section>

      {/* Quick Notes */}
      <section className="flex-1 flex flex-col border border-tactical-border bg-tactical-panel p-3 rounded-custom min-h-0">
        <h2 className="text-[10px] font-bold text-brand uppercase tracking-widest mb-2 italic">Operation Notes</h2>
        <textarea 
          className="flex-1 w-full bg-black/30 border-none text-xs p-2 focus:ring-0 outline-none resize-none text-brand/80 font-mono"
          placeholder="Log details here..."
        />
      </section>
    </div>
  );
}
