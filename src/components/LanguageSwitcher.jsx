"use client";

import { useState } from "react";
import { languages } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState("en");

  return (
    <div className="fixed bottom-20 right-5 z-40">
      <select
        value={lang}
        onChange={(e) => {
          setLang(e.target.value);
          // Store in localStorage for persistence
          localStorage.setItem("filefast-lang", e.target.value);
          // Reload page to apply language
          window.location.reload();
        }}
        className="rounded-sm border border-silver/70 bg-white px-3 py-2 text-sm font-semibold text-navy shadow-lg"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
