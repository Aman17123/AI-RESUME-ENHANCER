"use client";

import React from "react";

export default function ProfessionalTemplate({ data }) {
  const styles = {
    container: {
      fontFamily: 'Georgia, serif',
      color: '#374151',
      lineHeight: '1.6',
      padding: '50px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      borderBottom: '2px solid #1f2937',
      paddingBottom: '20px'
    },
    name: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px',
      letterSpacing: '1px'
    },
    title: {
      fontSize: '18px',
      color: '#6b7280',
      marginBottom: '20px',
      fontStyle: 'italic'
    },
    contactInfo: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      fontSize: '14px'
    },
    section: {
      marginBottom: '30px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '16px',
      borderBottom: '1px solid #d1d5db',
      paddingBottom: '8px'
    },
    twoColumn: {
      display: 'flex',
      gap: '40px'
    },
    leftColumn: {
      flex: '1'
    },
    rightColumn: {
      flex: '1'
    },
    experienceItem: {
      marginBottom: '20px'
    },
    jobTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '4px'
    },
    company: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#4b5563',
      marginBottom: '4px'
    },
    date: {
      fontSize: '14px',
      color: '#6b7280',
      fontStyle: 'italic',
      marginBottom: '8px'
    },
    description: {
      fontSize: '14px',
      lineHeight: '1.5'
    },
    skillsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px'
    },
    skillTag: {
      backgroundColor: '#f3f4f6',
      padding: '4px 12px',
      borderRadius: '4px',
      fontSize: '13px',
      border: '1px solid #d1d5db'
    }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.name}>{data.name || "Your Name"}</h1>
        <p style={styles.title}>{data.title}</p>
        <div style={styles.contactInfo}>
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
      </div>

      {/* SUMMARY */}
      {data.summary && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={styles.description}>{data.summary}</p>
        </div>
      )}

      {/* EXPERIENCE */}
      {Array.isArray(data.experience) && data.experience.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={styles.experienceItem}>
              <h3 style={styles.jobTitle}>{exp.title}</h3>
              <p style={styles.company}>{exp.company}, {exp.location}</p>
              <p style={styles.date}>
                {exp.startDate} - {exp.endDate || "Present"}
              </p>
              <p style={styles.description}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION */}
      {Array.isArray(data.education) && data.education.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={styles.experienceItem}>
              <h3 style={styles.jobTitle}>{edu.degree}</h3>
              <p style={styles.company}>{edu.school}</p>
              <p style={styles.date}>
                {edu.startDate} - {edu.endDate}
              </p>
              <p style={styles.description}>{edu.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* SKILLS & LANGUAGES */}
      <div style={styles.twoColumn}>
        {Array.isArray(data.skills) && data.skills.length > 0 && (
          <div style={styles.leftColumn}>
            <h2 style={styles.sectionTitle}>Professional Skills</h2>
            <div style={styles.skillsList}>
              {data.skills.map((skill, i) => (
                <span key={i} style={styles.skillTag}>
                  {skill.skillName}
                </span>
              ))}
            </div>
          </div>
        )}

        {Array.isArray(data.languages) && data.languages.length > 0 && (
          <div style={styles.rightColumn}>
            <h2 style={styles.sectionTitle}>Languages</h2>
            {data.languages.map((lang, i) => (
              <p key={i} style={{ fontSize: '14px', marginBottom: '6px' }}>
                <strong>{lang.language}:</strong> {lang.level}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}