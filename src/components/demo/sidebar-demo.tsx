"use client";

import React from "react";
import { SessionNavBar } from "@/components/ui/session-sidebar";

export function SidebarDemo() {
  return (
    <div className="flex h-screen w-screen flex-row">
      <SessionNavBar />
      <main className="flex h-screen grow flex-col overflow-auto ml-12">
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-50 to-slate-100 p-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              🌊 Animated Sidebar Demo
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Hover over the sidebar to see the smooth animation and expanded navigation menu.
            </p>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                ✨ Features Showcased:
              </h2>
              <ul className="text-left space-y-3 text-slate-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <strong>Smooth Animations:</strong> Powered by Framer Motion
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <strong>Hover Expansion:</strong> Sidebar expands on mouse enter
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <strong>Muscat Bay Branding:</strong> Customized for your operations hub
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <strong>Active States:</strong> Current page highlighting
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <strong>Dropdown Menus:</strong> Organization and user actions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <strong>Badge Support:</strong> AI badge on Anomaly Detection
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                🚀 Ready for Integration
              </h3>
              <p className="text-blue-700">
                This animated sidebar is now ready to replace your existing navigation. 
                Just import and use <code className="bg-blue-100 px-2 py-1 rounded">SessionNavBar</code> in your layout!
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
