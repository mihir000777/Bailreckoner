'use client';

import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Building, ExternalLink, ShieldAlert } from 'lucide-react';

interface DlsaClinic {
  district: string;
  state: string;
  officeName: string;
  address: string;
  secretaryName: string;
  phone: string;
  email: string;
  workingHours: string;
}

const MOCK_CLINICS: DlsaClinic[] = [
  {
    district: 'Patna',
    state: 'Bihar',
    officeName: 'District Legal Services Authority (DLSA) Patna',
    address: 'Civil Court Premises, Near Kargil Chowk, Patna - 800004',
    secretaryName: 'Shri R. K. Srivastava (Sub-Judge I)',
    phone: '0612-2204910 / +91 94310 12345',
    email: 'dlsa-patna@bihar.gov.in',
    workingHours: '10:00 AM - 5:00 PM (Mon-Sat)',
  },
  {
    district: 'Greater Mumbai',
    state: 'Maharashtra',
    officeName: 'District Legal Services Authority, Mumbai City',
    address: 'City Civil & Sessions Court, Old Secretariat Building, Fort, Mumbai - 400032',
    secretaryName: 'Smt. Anjali Deshmukh (Addl. Sessions Judge)',
    phone: '022-22673412 / +91 98200 98765',
    email: 'dlsa.mumbai@maharashtra.gov.in',
    workingHours: '10:30 AM - 5:30 PM (Mon-Sat)',
  },
  {
    district: 'Central Delhi',
    state: 'Delhi (UT)',
    officeName: 'Central District Legal Services Authority (DSLSA)',
    address: 'Tis Hazari Courts Complex, Court Room No. 28, Delhi - 110054',
    secretaryName: 'Shri Navdeep Gupta (DHJS)',
    phone: '011-23968012 / 15100',
    email: 'central-dlsa@delhi.gov.in',
    workingHours: '10:00 AM - 5:00 PM (Mon-Sat)',
  },
  {
    district: 'Chennai',
    state: 'Tamil Nadu',
    officeName: 'District Legal Services Authority Chennai',
    address: 'High Court Buildings, George Town, Chennai - 600104',
    secretaryName: 'Thiru M. K. Subramanian (Senior Civil Judge)',
    phone: '044-25342810',
    email: 'dlsa-chennai@tn.gov.in',
    workingHours: '10:00 AM - 5:00 PM (Mon-Sat)',
  },
  {
    district: 'Hyderabad',
    state: 'Telangana',
    officeName: 'District Legal Services Authority Hyderabad',
    address: 'City Civil Court Complex, Purani Haveli, Hyderabad - 500002',
    secretaryName: 'Smt. K. V. L. Hima Bindu',
    phone: '040-24521098',
    email: 'dlsa-hyd@telangana.gov.in',
    workingHours: '10:30 AM - 5:00 PM (Mon-Sat)',
  },
];

export const DlsaClinicFinder: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = MOCK_CLINICS.filter(
    (c) =>
      c.district.toLowerCase().includes(query.toLowerCase()) ||
      c.state.toLowerCase().includes(query.toLowerCase()) ||
      c.officeName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="border border-border bg-folder p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent font-bold block mb-1">
            NALSA Pan-India Network Locator
          </span>
          <h3 className="font-display text-xl italic text-foreground">
            Find Nearby DLSA Legal Aid Clinic
          </h3>
        </div>

        {/* NALSA Helpline Badge */}
        <div className="flex items-center gap-3 border border-amber-500/40 bg-amber-500/10 px-4 py-2 rounded">
          <Phone className="size-4 text-amber-400 shrink-0" />
          <div className="font-mono text-[10px]">
            <span className="text-muted-foreground block uppercase">NALSA Toll-Free Helpline</span>
            <span className="font-bold text-amber-300 text-sm">15100 (24x7 Free Call)</span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by District or State (e.g., Patna, Mumbai, Delhi, Chennai, Hyderabad)..."
          className="w-full pl-11 pr-4 py-3 bg-background border border-border text-foreground font-mono text-xs focus:outline-none focus:border-accent"
        />
      </div>

      {/* Clinic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((clinic, i) => (
          <div
            key={i}
            className="border border-border bg-background p-5 space-y-3 rounded-sm hover:border-accent/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-2">
              <div>
                <span className="font-mono text-[9px] font-bold text-accent uppercase tracking-widest block">
                  {clinic.state} • {clinic.district} District
                </span>
                <h4 className="font-sans text-sm font-semibold text-foreground mt-0.5">
                  {clinic.officeName}
                </h4>
              </div>
              <Building className="size-4 text-muted-foreground shrink-0 mt-1" />
            </div>

            <div className="space-y-2 font-mono text-[11px] text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="size-3.5 text-accent shrink-0 mt-0.5" />
                <span className="text-foreground">{clinic.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-bold">{clinic.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-amber-400 shrink-0" />
                <span>{clinic.email}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border/60 flex items-center justify-between font-mono text-[9px] text-muted-foreground">
              <span>Secretary: {clinic.secretaryName}</span>
              <span>{clinic.workingHours}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
