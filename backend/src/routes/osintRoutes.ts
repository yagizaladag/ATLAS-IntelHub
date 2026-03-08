import { Router } from 'express';
import { OSINTController } from '../controllers/osintController';

const router = Router();

// IP Geolocation
router.get('/ip-lookup', OSINTController.ipLookup);

// WHOIS Lookup
router.get('/whois', OSINTController.whoisLookup);

// DNS Lookup
router.get('/dns', OSINTController.dnsLookup);

// Reverse DNS Lookup
router.get('/reverse-dns', OSINTController.reverseDNS);

export default router;
