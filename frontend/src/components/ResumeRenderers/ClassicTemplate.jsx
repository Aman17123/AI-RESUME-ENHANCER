"use client";

import React from "react";

export default function ClassicTemplate({ data }) {
  return (
    <div className="font-sans text-slate-800 leading-relaxed px-6 py-8">

      {/* ====== HEADER ====== */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            {data.name || "Your Name"}
          </h1>
          {data.title && (
            <p className="text-slate-600 text-sm">{data.title}</p>
          )}
        </div>

        <div className="text-right text-sm text-slate-700">
          <p>
            {[data.city, data.state, data.country].filter(Boolean).join(", ")}
          </p>
          <p>{data.phone}</p>
          <p>{data.email}</p>

          {data.linkedin && (
            <a
              href={data.linkedin}
              className="text-green-700 underline block mt-1"
            >
              {data.linkedin}
            </a>
          )}

          {data.website && (
            <a href={data.website} className="text-green-700 underline block">
              {data.website}
            </a>
          )}
        </div>
      </div>

      {/* ====== SUMMARY ====== */}
      {data.summary && (
        <div className="bg-slate-100 border border-slate-300 p-4 rounded mb-10 text-sm whitespace-pre-line">
          {data.summary}
        </div>
      )}

      {/* ====== EXPERIENCE ====== */}
      <SectionTitle title="EXPERIENCE" />

      <div className="space-y-8">
        {Array.isArray(data.experience) && data.experience.length > 0 ? (
          data.experience.map((exp, index) => (
            <div
              key={exp.id || `exp-${index}`}
              className="grid grid-cols-3 gap-6"
            >
              {/* LEFT COLUMN */}
              <div className="text-sm">
                <p className="font-bold uppercase">{exp.company}</p>
                <p className="uppercase text-xs">{exp.location}</p>
                <p className="font-semibold">{exp.title}</p>
                <p className="text-xs italic text-slate-600">
                  {exp.startDate || "—"} – {exp.endDate || "Present"}
                </p>
              </div>

              {/* RIGHT COLUMN */}
              <div className="col-span-2 text-sm border-l pl-6 whitespace-pre-line">
                {exp.description}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No experience added.</p>
        )}
      </div>

      {/* ====== EDUCATION ====== */}
      <SectionTitle title="EDUCATION" />

      <div className="space-y-8">
        {Array.isArray(data.education) && data.education.length > 0 ? (
          data.education.map((edu, index) => (
            <div
              key={edu.id || `edu-${index}`}
              className="grid grid-cols-3 gap-6"
            >
              <div className="text-sm">
                <p className="font-bold uppercase">{edu.institution}</p>
                <p className="font-semibold">{edu.degree}</p>
                <p className="italic text-xs text-slate-600">
                  {edu.startDate || "—"} – {edu.endDate || "—"}
                </p>
                <p className="text-xs">{edu.fieldOfStudy}</p>
              </div>

              <div className="col-span-2 text-sm border-l pl-6 whitespace-pre-line">
                {edu.description}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No education added.</p>
        )}
      </div>

      {/* ====== SKILLS & LANGUAGES ====== */}
      <div className="grid grid-cols-2 gap-10 mt-14">

        {/* SKILLS */}
        <div>
          <SectionTitle title="SKILLS" center />
          {Array.isArray(data.skills) && data.skills.length > 0 ? (
            <ul className="list-disc ml-6 text-sm space-y-1">
              {data.skills.map((skill, index) => (
                <li key={skill.id || `skill-${index}`}>
                  {skill.skillName}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No skills added.</p>
          )}
        </div>

        {/* LANGUAGES */}
        <div>
          <SectionTitle title="LANGUAGES" center />
          {Array.isArray(data.languages) && data.languages.length > 0 ? (
            <ul className="list-disc ml-6 text-sm space-y-1">
              {data.languages.map((lang, index) => (
                <li key={lang.id || `lang-${index}`}>
                  <strong>{lang.language}</strong>{" "}
                  {lang.proficiency ? `— ${lang.proficiency}` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No languages added.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- SECTION HEADER COMPONENT ---------------- */
function SectionTitle({ title, center }) {
  return (
    <div className={`mt-10 mb-4 ${center ? "text-center" : ""}`}>
      <div
        className={`${center ? "mx-auto" : ""} w-36 h-2 bg-green-600 rounded`}
      ></div>
      <h2 className="text-green-700 text-xl font-bold mt-1 uppercase">
        {title}
      </h2>
    </div>
  );
}
