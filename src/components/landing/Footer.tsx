import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="text-white text-xl font-bold tracking-tight">SevaSetu</p>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-green mt-2">Need se Seva Tak</p>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            India&apos;s intelligent social impact operating system connecting needs to verified action.
          </p>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Quick Links</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-brand-green transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded px-1 -mx-1">Home</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-brand-green transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded px-1 -mx-1">Platform</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-brand-green transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded px-1 -mx-1">Solutions</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-brand-green transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded px-1 -mx-1">Role-Based Login</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Resources</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-brand-green transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded px-1 -mx-1">Case Studies</a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-green transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded px-1 -mx-1">Reports</a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-green transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded px-1 -mx-1">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-green transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded px-1 -mx-1">Terms &amp; Governance</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Support</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-brand-green transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded px-1 -mx-1">Support Center</a>
            </li>
            <li>
              <a href="mailto:contact@sevasetu.org" className="hover:text-brand-green transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded px-1 -mx-1">contact@sevasetu.org</a>
            </li>
            <li>
              <a href="tel:+919000000000" className="hover:text-brand-green transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green rounded px-1 -mx-1">+91 90000 00000</a>
            </li>
            <li>
              <span className="text-slate-400">Follow: </span>
              <a href="#" aria-label="LinkedIn" className="hover:text-brand-green transition-colors ml-1">LinkedIn</a>
              <span className="mx-1">•</span>
              <a href="#" aria-label="X (Twitter)" className="hover:text-brand-green transition-colors">X</a>
              <span className="mx-1">•</span>
              <a href="#" aria-label="YouTube" className="hover:text-brand-green transition-colors">YouTube</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SevaSetu. All rights reserved.
      </div>
    </footer>
  );
}
