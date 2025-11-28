"use client";

import React from "react";

export default function MinimalTemplate({ data }) {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        display: "flex",
        minHeight: "100vh",
        color: "#2b2b2b",
      }}
    >
      {/* LEFT COLUMN */}
      <div
        style={{
          width: "30%",
          background: "#2b2f38",
          padding: "40px 30px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* IMAGE PLACEHOLDER */}
        <div
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "#cbd5e1",
            overflow: "hidden",
            marginBottom: "35px",
          }}
        >
          {data.photo ? (
            <img
              src={data.photo}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "repeating-linear-gradient(45deg,#ccc 0,#ccc 10px,#eee 10px,#eee 20px)",
              }}
            />
          )}
        </div>

        {/* CONTACTS */}
        <LeftSection title="CONTACTS">
          {data.phone && (
            <LeftItem icon="📞" text={data.phone} />
          )}
          {data.email && (
            <LeftItem icon="📧" text={data.email} />
          )}
          {data.website && (
            <LeftItem icon="🌐" text={data.website} />
          )}
          {data.location && (
            <LeftItem icon="📍" text={data.location} />
          )}
        </LeftSection>

        {/* LANGUAGES */}
        {Array.isArray(data.languages) && data.languages.length > 0 && (
          <LeftSection title="LANGUAGES">
            {data.languages.map((lang, i) => (
              <LeftBullet key={i} text={`${lang.language} (${lang.level})`} />
            ))}
          </LeftSection>
        )}

        {/* SKILLS */}
        {Array.isArray(data.skills) && data.skills.length > 0 && (
          <LeftSection title="SKILLS">
            {data.skills.map((skill, i) => (
              <LeftBullet key={i} text={skill.skillName} />
            ))}
          </LeftSection>
        )}

        {/* INTERESTS */}
        {Array.isArray(data.interests) && data.interests.length > 0 && (
          <LeftSection title="INTERESTS">
            {data.interests.map((interest, i) => (
              <LeftBullet key={i} text={interest} />
            ))}
          </LeftSection>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div
        style={{
          width: "70%",
          background: "#ffffff",
          padding: "50px 60px",
        }}
      >
        {/* NAME */}
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "700",
            letterSpacing: "1px",
            marginBottom: "4px",
          }}
        >
          {data.name || "RONY AHMED"}
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#555",
            marginBottom: "25px",
          }}
        >
          {data.title || "GRAPHIC DESIGNER"}
        </p>

        <hr style={{ borderTop: "2px solid #2b2f38", marginBottom: "40px" }} />

        {/* ABOUT ME */}
        {data.summary && (
          <RightSection title="ABOUT ME">
            <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.7" }}>
              {data.summary}
            </p>
          </RightSection>
        )}

        {/* EDUCATION */}
        {Array.isArray(data.education) && data.education.length > 0 && (
          <RightSection title="EDUCATION">
            {data.education.map((edu, i) => (
              <TimelineItem
                key={i}
                title={edu.institution}
                subtitle={edu.degree}
                body={edu.description}
              />
            ))}
          </RightSection>
        )}

        {/* EXPERIENCE */}
        {Array.isArray(data.experience) && data.experience.length > 0 && (
          <RightSection title="EXPERIENCE">
            {data.experience.map((exp, i) => (
              <TimelineItem
                key={i}
                title={exp.company}
                subtitle={exp.title}
                body={exp.description}
              />
            ))}
          </RightSection>
        )}
      </div>
    </div>
  );
}

/* -------------------------------
   LEFT COLUMN COMPONENTS
-------------------------------- */

function LeftSection({ title, children }) {
  return (
    <div style={{ width: "100%", marginBottom: "40px" }}>
      <div
        style={{
          background: "#fbbf24",
          padding: "6px 12px",
          borderRadius: "6px",
          color: "#2b2f38",
          fontWeight: "bold",
          display: "inline-block",
          marginBottom: "15px",
          textTransform: "uppercase",
          fontSize: "14px",
        }}
      >
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

function LeftItem({ icon, text }) {
  return (
    <p style={{ marginBottom: "12px", fontSize: "14px" }}>
      <span style={{ marginRight: "8px" }}>{icon}</span>
      {text}
    </p>
  );
}

function LeftBullet({ text }) {
  return (
    <p style={{ fontSize: "14px", marginBottom: "8px" }}>• {text}</p>
  );
}

/* -------------------------------
   RIGHT COLUMN COMPONENTS
-------------------------------- */

function RightSection({ title, children }) {
  return (
    <div style={{ marginBottom: "45px" }}>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "700",
          marginBottom: "25px",
          color: "#333",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function TimelineItem({ title, subtitle, body }) {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "30px",
        gap: "15px",
      }}
    >
      {/* Yellow dot */}
      <div
        style={{
          width: "12px",
          height: "12px",
          background: "#fbbf24",
          borderRadius: "50%",
          marginTop: "6px",
        }}
      ></div>

      <div>
        <h3 style={{ fontWeight: "600", fontSize: "16px" }}>{title}</h3>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
          {subtitle}
        </p>
        <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.6" }}>
          {body}
        </p>
      </div>
    </div>
  );
}
