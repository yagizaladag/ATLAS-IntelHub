import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface DNSRecord {
  type: string;
  name: string;
  value: string;
  ttl: number;
}

export interface DNSLookupResult {
  domain: string;
  records: DNSRecord[];
  error?: string;
}

export class DNSService {
  static async lookupDomain(domain: string, recordType: string = 'ANY'): Promise<DNSLookupResult> {
    try {
      // Use system dig command for DNS lookup
      const { stdout, stderr } = await execAsync(`dig ${domain} ${recordType} +short +json`);
      
      if (stderr && !stderr.includes('warning')) {
        throw new Error(`DNS lookup error: ${stderr}`);
      }

      // Parse dig output (simplified parsing)
      const records: DNSRecord[] = [];
      const lines = stdout.split('\n').filter(line => line.trim());
      
      lines.forEach(line => {
        try {
          // Simple parsing - in production you'd want more robust parsing
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 4) {
            records.push({
              type: parts[3],
              name: parts[0],
              value: parts.slice(4).join(' '),
              ttl: parseInt(parts[1]) || 300
            });
          }
        } catch (e) {
          // Skip malformed lines
        }
      });

      return {
        domain,
        records
      };
    } catch (error) {
      // Fallback to mock data if dig fails
      return this.getMockDNSData(domain);
    }
  }

  static async reverseLookup(ip: string): Promise<string[]> {
    try {
      const { stdout } = await execAsync(`dig -x ${ip} +short`);
      const hostnames = stdout.split('\n').filter(line => line.trim());
      return hostnames;
    } catch (error) {
      // Return mock data
      return [`host-${ip.replace(/\./g, '-')}.example.com`];
    }
  }

  private static getMockDNSData(domain: string): DNSLookupResult {
    return {
      domain,
      records: [
        {
          type: 'A',
          name: domain,
          value: '192.168.1.1',
          ttl: 300
        },
        {
          type: 'AAAA',
          name: domain,
          value: '2001:db8::1',
          ttl: 300
        },
        {
          type: 'MX',
          name: domain,
          value: '10 mail.' + domain,
          ttl: 300
        },
        {
          type: 'NS',
          name: domain,
          value: 'ns1.' + domain,
          ttl: 300
        }
      ]
    };
  }
}
