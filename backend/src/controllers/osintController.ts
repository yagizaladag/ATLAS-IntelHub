import { Request, Response } from 'express';
import { IPGeolocationService } from '../services/ipGeolocation';
import { WHOISService } from '../services/whoisLookup';
import { DNSService } from '../services/dnsLookup';

export class OSINTController {
  static async ipLookup(req: Request, res: Response) {
    try {
      const { ip } = req.query;
      
      if (!ip || typeof ip !== 'string') {
        return res.status(400).json({ 
          success: false, 
          error: 'IP address is required' 
        });
      }

      // Basic IP validation
      const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (!ipRegex.test(ip)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid IP address format' 
        });
      }

      const result = await IPGeolocationService.lookupIP(ip);
      
      res.json({
        success: true,
        type: 'ip_geolocation',
        data: result,
        timestamp: new Date()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'IP lookup failed'
      });
    }
  }

  static async whoisLookup(req: Request, res: Response) {
    try {
      const { domain } = req.query;
      
      if (!domain || typeof domain !== 'string') {
        return res.status(400).json({ 
          success: false, 
          error: 'Domain name is required' 
        });
      }

      const result = await WHOISService.lookupDomain(domain);
      
      res.json({
        success: true,
        type: 'whois',
        data: result,
        timestamp: new Date()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'WHOIS lookup failed'
      });
    }
  }

  static async dnsLookup(req: Request, res: Response) {
    try {
      const { domain, type = 'ANY' } = req.query;
      
      if (!domain || typeof domain !== 'string') {
        return res.status(400).json({ 
          success: false, 
          error: 'Domain name is required' 
        });
      }

      const result = await DNSService.lookupDomain(domain, type as string);
      
      res.json({
        success: true,
        type: 'dns',
        data: result,
        timestamp: new Date()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'DNS lookup failed'
      });
    }
  }

  static async reverseDNS(req: Request, res: Response) {
    try {
      const { ip } = req.query;
      
      if (!ip || typeof ip !== 'string') {
        return res.status(400).json({ 
          success: false, 
          error: 'IP address is required' 
        });
      }

      const hostnames = await DNSService.reverseLookup(ip);
      
      res.json({
        success: true,
        type: 'reverse_dns',
        data: {
          ip,
          hostnames
        },
        timestamp: new Date()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Reverse DNS lookup failed'
      });
    }
  }
}
