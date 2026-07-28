"use client";

import React from "react";

export default function AdaTemplate({ data }) {
  /* ========= AUTO-GENERATE LINKS (NO MUTATION) ========= */
  const resolvedLinks = [];

  if (data?.websiteOrGithub) {
    if (data.websiteOrGithub.includes("github.com")) {
      resolvedLinks.push({ label: "GitHub", url: data.websiteOrGithub });
    } else {
      resolvedLinks.push({ label: "Website", url: data.websiteOrGithub });
    }
  }

  if (data?.linkedin) {
    resolvedLinks.push({ label: "LinkedIn", url: data.linkedin });
  }

  return (
    <div className="w-full font-serif text-black px-10 py-10 text-[15px] leading-[1.25]">

      {/* ============ HEADER ============ */}
      <h1 className="text-2xl font-bold text-center tracking-wide">
        {data?.name || "Ada Lovelace"}
      </h1>

      <p className="text-center text-[10px] mt-1">
        {[data?.phone, data?.email].filter(Boolean).join(" | ")}

        {resolvedLinks.length > 0 && (
          <>
            {" | "}
            {resolvedLinks.map((lnk, i) => (
              <span key={i}>
                <a
                  href={lnk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {lnk.label}
                </a>
                {i < resolvedLinks.length - 1 && " | "}
              </span>
            ))}
          </>
        )}
      </p>

      {/* ============ EDUCATION ============ */}
      <SectionHeader title="EDUCATION" />
      {(data?.education || []).map((edu, i) => (
        <div key={i} className="mb-4">
          <div className="grid grid-cols-[1fr_auto] w-full">
            <p className="font-bold text-[12px]">{edu.institution}</p>
            <p className="text-[10px] whitespace-nowrap">
              {edu.startDate} – {edu.endDate}
            </p>
          </div>

          <p className="italic text-[10px]">
            {edu.degree}, {edu.fieldOfStudy} | GPA: {edu.cgpa}
          </p>

          <p className="text-[10px] whitespace-pre-line">
            {edu.description}
          </p>
        </div>
      ))}

      {/* ============ TECHNICAL SKILLS ============ */}
      <SectionHeader title="TECHNICAL SKILLS" />
      <div className="space-y-1 mt-1">
        {(data?.skills || []).map((skill, i) => {
          const name =
            skill.category ||
            skill.skillName ||
            (typeof skill === "string" ? skill : "");

          const items = skill.items || skill.description || "";

          if (!name) return null;

          return (
            <p key={i} className="text-[10px]">
              <span className="font-bold">{name}:</span> {items}
            </p>
          );
        })}
      </div>

      {/* ============ EXPERIENCE ============ */}
      <SectionHeader title="RELEVANT EXPERIENCE" />
      {(data?.experience || []).map((exp, i) => (
        <div key={i} className="mb-4">
          <div className="grid grid-cols-[1fr_auto] w-full">
            <p className="font-bold text-[12px]">
              {exp.company} | {exp.location}
            </p>
            <p className="text-[10px] whitespace-nowrap">
              {exp.startDate || "—"} – {exp.endDate || "Present"}
            </p>
          </div>

          <p className="italic text-[10px]">{exp.title}</p>

          {exp.description && (
            <p className="text-[8px] whitespace-pre-line">
              {exp.description}
            </p>
          )}
        </div>
      ))}

      {/* ============ PROJECTS ============ */}
      <SectionHeader title="PROJECTS" />
      {(data?.projects || []).map((proj, i) => (
        <div key={i} className="mb-4">
          <div className="grid grid-cols-[1fr_auto] w-full items-start">
            <div className="flex items-center gap-1">
              <p className="font-bold text-[12px]">{proj.projectName}</p>

              {proj.projectUrl && (
                <a
                  href={proj.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <path d="M9 9h6v6" />
                    <path d="M15 9L9 15" />
                  </svg>
                </a>
              )}
            </div>

            <p className="text-[10px] whitespace-nowrap text-right">
              {proj.startDate} – {proj.endDate}
            </p>
          </div>

          <p className="italic font-bold text-[10px]">
            {proj.technologies}
          </p>

          {proj.description && (
            <p className="text-[8px] whitespace-pre-line">
              {proj.description}
            </p>
          )}
        </div>
      ))}

      {/* ============ LEADERSHIP ============ */}
      <SectionHeader title="LEADERSHIP EXPERIENCE" />
      {(data?.leadership || []).map((lead, i) => (
        <div key={i} className="mb-3">
          <div className="grid grid-cols-[1fr_auto] w-full">
            <p className="font-bold text-[12px]">{lead.organization}</p>
            <p className="text-[10px] whitespace-nowrap">
              {lead.dateRange}
            </p>
          </div>

          <p className="italic text-[10px]">{lead.role}</p>

          {lead.description?.map((d, idx) => (
            <p key={idx} className="text-[9px] ml-4">
              • {d}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="mt-6 mb-2">
      <p className="font-bold text-[12px] tracking-wide">{title}</p>
      <hr className="border-black" />
    </div>
  );
}
