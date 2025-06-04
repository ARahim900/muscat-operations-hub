"use client";

import React from "react";

// Simple demo page without external dependencies
export function SidebarDemo(): React.JSX.Element {
  return React.createElement(
    "div",
    {
      className: "flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8"
    },
    React.createElement(
      "div",
      {
        className: "max-w-2xl mx-auto text-center space-y-6"
      },
      React.createElement(
        "h1",
        {
          className: "text-4xl font-bold text-slate-800 mb-4"
        },
        "🌊 Sidebar Demo"
      ),
      React.createElement(
        "p",
        {
          className: "text-xl text-slate-600 mb-8"
        },
        "Animated sidebar demo page for Muscat Bay Operations Hub."
      ),
      React.createElement(
        "div",
        {
          className: "bg-white rounded-xl p-6 shadow-lg border"
        },
        React.createElement(
          "h2",
          {
            className: "text-2xl font-semibold text-slate-800 mb-4"
          },
          "✨ Demo Ready"
        ),
        React.createElement(
          "p",
          {
            className: "text-slate-600"
          },
          "This demo page has been simplified to ensure deployment compatibility."
        )
      )
    )
  );
}
