"use client";

import React from "react";

export default function ModernTemplate({ data }) {
  const {
    name = "Aaron RESUMGO",
    title = "Job Title",
    summary = "Lorem ipsum dolor sit amet, amet morbi scelerisque, mollis ullamcorper, porttitor sodales auctor. Posuere eget senectus. Nunc porttitor ligula, vivamus arcu auctor. Ut scelerisque consequat, ante dolor, leo dui vel. Vitae tempor, in erat.\n\nArcu vestibulum in. Egestas tristique nibh. Et vitae amet. Nullam lacinia mi, ac vitae, nunc sociis. Mattis pulvinar sed. Laboriosam justo, cras ultricies turpis, ullamcorper.",
    contact = {
      address: "City, State ZIP Code",
      phone: "M (123) 456-7890",
      email: "email@address.com",
      linkedin: "linkedin.com/in/yourname"
    },
    workExperience = [
      {
        jobTitle: "JOB TITLE, COMPANY NAME",
        location: "City, ST",
        period: "Dec 2022—Present",
        description: "Ut enim ad minim veniam, quis nostrud exerc. Irure dolor in reprehend incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerci es.",
        accomplishments: [
          "Ut enim ad minim veniam, quis nostrud exerc.",
          "Exercitation ullamco laboris nisi ut aliquid ex ea co mmodo consequat.",
          "Ut enim ad minim veniam, quis nostrud exerc."
        ]
      },
      {
        jobTitle: "JOB TITLE, COMPANY NAME",
        location: "City, State",
        period: "Feb 2018—Nov 2022",
        description: "Ut enim ad minim veniam, quis nostrud exerc. Irure dolor in reprehend incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerci es.",
        accomplishments: [
          "Ut enim ad minim veniam, quis nostrud exerc.",
          "Exercitation ullamco laboris nisi ut aliquid ex ea co mmodo consequat.",
          "Ut enim ad minim veniam, quis nostrud exerc."
        ]
      }
    ],
    education = [
      {
        degree: "DEGREE, MAJOR",
        school: "School Name — School Name, City, ST",
        period: "2015–2017",
        description: "Ut enim ad minim veniam, quis nostrud exerc. Irure dolor in reprehend incididunt ut labore et dolore magna aliqua."
      },
      {
        degree: "DIPLOMA OR CERTIFICATION",
        school: "School/Issuer, City, ST",
        period: "2012–2015",
        description: "Ut enim ad minim veniam, quis nostrud exerc. Irure dolor in reprehend incididunt ut labore et dolore magna aliqua."
      }
    ],
    skills = {
      professional: ["Skill #1", "Skill #2", "Skill #3", "Skill #4", "Skill #5"],
      software: ["Skill #1", "Skill #2", "Skill #3", "Skill #4", "Skill #5"],
      languages: ["Language #1", "Language #2", "Language #3"]
    }
  } = data || {};

  // Handle summary - convert to array if it's a string
  const summaryArray = Array.isArray(summary) 
    ? summary 
    : typeof summary === 'string' 
      ? summary.split('\n\n').filter(p => p.trim()) 
      : [];

  return (
    <div className="w-full min-h-screen flex font-sans text-slate-700">
      {/* LEFT SIDEBAR */}
      <div className="w-[33%] bg-slate-100 px-10 py-12 flex flex-col">
        
        {/* Profile Image Placeholder */}
        <div className="w-40 h-40 bg-slate-300 rounded-full mx-auto flex items-center justify-center text-sm text-slate-600">
          Upload Photo
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold text-center mt-5 text-slate-900">
          {name}
        </h1>

        <p className="text-center text-slate-600 text-base">
          {title}
        </p>

        {/* Summary */}
        <div className="mt-8">
          {summaryArray.length > 0 ? (
            summaryArray.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed mb-4">
                {paragraph}
              </p>
            ))
          ) : (
            // Fallback content if no summary provided
            <>
              <p className="text-sm leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, amet morbi scelerisque, mollis ullamcorper, porttitor sodales auctor. Posuere eget senectus. Nunc porttitor ligula, vivamus arcu auctor. Ut scelerisque consequat, ante dolor, leo dui vel. Vitae tempor, in erat.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                Arcu vestibulum in. Egestas tristique nibh. Et vitae amet. Nullam lacinia mi, ac vitae, nunc sociis. Mattis pulvinar sed. Laboriosam justo, cras ultricies turpis, ullamcorper.
              </p>
            </>
          )}
        </div>

        {/* Contact */}
        <div className="mt-10 text-sm space-y-1">
          <p>{contact.address}</p>
          <p>{contact.phone}</p>
          <p className="mt-3">{contact.email}</p>
          <p>{contact.linkedin}</p>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          References available upon request
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[67%] px-10 py-12">

        {/* WORK EXPERIENCE */}
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm">
            💼
          </span>
          WORK EXPERIENCE
        </h2>

        <div className="mt-4 space-y-8">
          {workExperience && workExperience.map((job, index) => (
            <div key={index}>
              <p className="font-bold text-sm">{job.jobTitle}</p>
              <p className="text-xs text-slate-500">{job.location} | {job.period}</p>

              <p className="text-sm mt-2">
                {job.description}
              </p>

              {job.accomplishments && job.accomplishments.length > 0 && (
                <>
                  <p className="font-bold text-sm mt-3">Accomplishments:</p>
                  <ul className="list-disc ml-6 text-sm space-y-1 mt-1">
                    {job.accomplishments.map((accomplishment, accIndex) => (
                      <li key={accIndex}>{accomplishment}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>

        {/* EDUCATION */}
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3 mt-10">
          <span className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm">
            🎓
          </span>
          EDUCATION
        </h2>

        <div className="mt-4 space-y-6">
          {education && education.map((edu, index) => (
            <div key={index}>
              <p className="font-bold text-sm">{edu.degree}</p>
              <p className="text-xs text-slate-500">{edu.school} | {edu.period}</p>
              <p className="text-sm mt-2">
                {edu.description}
              </p>
            </div>
          ))}
        </div>

        {/* SKILLS SECTION */}
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3 mt-10">
          <span className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm">
            🛠️
          </span>
          SKILLS
        </h2>

        <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
          {/* Professional Skills */}
          <div>
            {skills?.professional?.map((skill, index) => (
              <p key={index}>{skill}</p>
            )) || (
              <>
                <p>Skill #1</p>
                <p>Skill #2</p>
                <p>Skill #3</p>
                <p>Skill #4</p>
                <p>Skill #5</p>
              </>
            )}
            <p className="font-bold mt-2">Professional</p>
          </div>

          {/* Software Skills */}
          <div>
            {skills?.software?.map((skill, index) => (
              <p key={index}>{skill}</p>
            )) || (
              <>
                <p>Skill #1</p>
                <p>Skill #2</p>
                <p>Skill #3</p>
                <p>Skill #4</p>
                <p>Skill #5</p>
              </>
            )}
            <p className="font-bold mt-2">Software</p>
          </div>

          {/* Languages */}
          <div>
            {skills?.languages?.map((language, index) => (
              <p key={index}>{language}</p>
            )) || (
              <>
                <p>Language #1</p>
                <p>Language #2</p>
                <p>Language #3</p>
              </>
            )}
            <p className="font-bold mt-2">Languages</p>
          </div>
        </div>

      </div>
    </div>
  );
}