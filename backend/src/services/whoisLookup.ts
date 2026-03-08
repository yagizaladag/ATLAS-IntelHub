import axios from 'axios';

export interface WHOISResult {
  domain: string;
  registrar: string;
  creationDate: string;
  expirationDate: string;
  status: string[];
  nameServers: string[];
  registrant: {
    name?: string;
    organization?: string;
    country?: string;
    email?: string;
  };
}

export class WHOISService {
  private static readonly API_URL = 'https://api.whoisjson.com/v1/lookup';

  static async lookupDomain(domain: string): Promise<WHOISResult> {
    try {
      // Using a mock response for demonstration since most WHOIS APIs require paid keys
      // In production, you would use a service like whoisjson.com, whois.com API, etc.
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock WHOIS data for demonstration
      const mockData: WHOISResult = {
        domain: domain,
        registrar: "Mock Registrar Inc.",
        creationDate: "2020-01-15T00:00:00Z",
        expirationDate: "2025-01-15T00:00:00Z",
        status: ["clientTransferProhibited", "serverTransferProhibited"],
        nameServers: ["ns1.example.com", "ns2.example.com"],
        registrant: {
          name: "Domain Administrator",
          organization: "Example Organization",
          country: "US",
          email: "admin@example.com"
        }
      };

      return mockData;
    } catch (error) {
      throw new Error(`WHOIS lookup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async quickLookup(domain: string): Promise<Partial<WHOISResult>> {
    try {
      // Simulate basic DNS record lookup
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        domain: domain,
        nameServers: [`ns1.${domain}`, `ns2.${domain}`],
        status: ["active"]
      };
    } catch (error) {
      throw new Error(`Quick WHOIS lookup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
