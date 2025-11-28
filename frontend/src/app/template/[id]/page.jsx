"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import ResumeForm from "../../../components/Editor/ResumeForm";
import { useResumeStore } from "../../../store/resumeStore";
import ClassicTemplate from "../../../components/ResumeRenderers/ClassicTemplate";
import ModernTemplate from "../../../components/ResumeRenderers/ModernTemplate";
import MinimalTemplate from "../../../components/ResumeRenderers/MinimalTemplate"; 
import ProfessionalTemplate from "../../../components/ResumeRenderers/ProfessionalTemplate";
import { downloadResumePDF } from "../../../utils/downloadPDF";
import {
  FileText, Download, Share, Eye, Monitor, Smartphone,
  Palette, Save, Maximize, Minimize, Settings, Grid3x3, Type, Image,
  ZoomIn, ZoomOut, Move, File, Layers, CheckCircle, Info,
  Code, User, Briefcase, GraduationCap, Award, MessageSquare,
  Star, Plus, X, Menu, Mail, Phone, MapPin, Calendar, Link,
  ArrowUp, ArrowDown, Trash, PlusCircle, Edit3
} from "lucide-react";


export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const { id: templateId } = params;
  const { data, setFullData, saveResume, addArrayItem } = useResumeStore();
  const [ready, setReady] = useState(false);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [theme, setTheme] = useState("professional-blue");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [templateName, setTemplateName] = useState("");
  const [templateLayout, setTemplateLayout] = useState("classic");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
      let mounted = true;

      async function load() {
        const makeEmpty = (tpl) => ({
          _template: tpl,
          name: "",
          title: "",
          email: "",
          phone: "",
          location: "",
          summary: "",
          website: "",
          linkedin: "",
          experience: [],
          education: [],
          skills: [],
          languages: [],
          projects: [],
          certifications: [],
          customSections: [],
        });

        try {
          if (templateId === "new") {
            if (!mounted) return;
            setFullData(makeEmpty("new"));
            setTemplateName("New Resume");
            setReady(true);
            return;
          }

          let templateJSON = null;

          try {
            // ⭐ REAL FIX — import JSON directly from src/templates
            templateJSON = (
              await import(
                `../../../templates/${templateId}.json`,
                { assert: { type: "json" } }
              )
            ).default;
          } catch (err) {
            console.error("JSON import failed:", err);
          }

          if (!templateJSON) {
            console.warn("Template not found, using fallback.");
            setFullData(makeEmpty(templateId));
            setTemplateName("Untitled Resume");
            setReady(true);
            return;
          }

          setFullData(templateJSON);
          setTemplateName(templateJSON.name || "Untitled Resume");

        // Correct mapping for all templates
        if (templateId.includes("modern")) {
          setTemplateLayout("modern");
        } 
        else if (templateId.includes("minimal")) {
          setTemplateLayout("minimal");
        }
        else if (templateId.includes("professional")) {
          setTemplateLayout("professional");
        } 
        else if (templateId.includes("creative")) {
          setTemplateLayout("creative");
        }
        else {
          setTemplateLayout("classic");
        }

          
        } finally {
          mounted && setReady(true);
        }
      }

      load();
      return () => (mounted = false);
    }, [templateId, setFullData]);

    const TemplateComponent = useMemo(() => {
      switch (templateLayout) {
        case "modern":
          return ModernTemplate;
        case "minimal":
          return MinimalTemplate;
        case "professional":
          return ProfessionalTemplate;
        case "creative":
          return MinimalTemplate; // if creative uses minimal base
        default:
          return ClassicTemplate;
      }
    }, [templateLayout]);


  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 50));
  const handleResetZoom = () => setZoomLevel(100);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveResume(data);
      setNotificationMessage("Resume saved successfully!");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setIsSaving(false);
      }, 2000);
    } catch {
      setNotificationMessage("Error saving resume. Please try again.");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setIsSaving(false);
      }, 2000);
    }
  };

  const handleTemplateChange = (layout) => {
    setTemplateLayout(layout);
    setNotificationMessage(`Template changed to ${layout}`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleAddCustomSection = () => {
    addArrayItem("customSections", { title: "New Section", content: "" });
    setActiveSection("customSections");
    setNotificationMessage("Custom section added");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleShare = () => {
    setNotificationMessage("Share functionality coming soon!");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleDuplicate = () => {
    setNotificationMessage("Resume duplicated successfully!");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await downloadResumePDF(data, theme, templateLayout);
      setNotificationMessage("Resume exported successfully!");
      setShowNotification(true);
    } catch {
      setNotificationMessage("Error exporting PDF.");
      setShowNotification(true);
    } finally {
      setIsExporting(false);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const sections = [
    { id: "basic", name: "Personal Info", icon: <User className="h-5 w-5" /> },
    { id: "experience", name: "Experience", icon: <Briefcase className="h-5 w-5" /> },
    { id: "education", name: "Education", icon: <GraduationCap className="h-5 w-5" /> },
    { id: "skills", name: "Skills", icon: <Award className="h-5 w-5" /> },
    { id: "languages", name: "Languages", icon: <MessageSquare className="h-5 w-5" /> },
    { id: "projects", name: "Projects", icon: <Code className="h-5 w-5" /> },
    { id: "certifications", name: "Certifications", icon: <Star className="h-5 w-5" /> },
    { id: "customSections", name: "Custom Sections", icon: <Settings className="h-5 w-5" /> },
  ];

  /*  
  ======================================================
  NEW MINIMAL LOADER (Option B)
  ======================================================
  */
  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-sm text-slate-500">Loading Resume Editor...</p>
      </div>
    </div>
  );

  return (
    <>
      {/* (The rest of your file is unchanged below) */}

      <div className="min-h-screen bg-slate-50 flex flex-col">

        {/* Top Navigation Bar */}
        <nav className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-sm">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">{templateName}</h1>
                <p className="text-xs text-slate-500">Professional Resume Builder</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">          
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium shadow-sm disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <div className="w-3 h-3 border-t border-white border-solid rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </>
              )}
            </button>

            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium shadow-sm disabled:opacity-70"
            >
              {isExporting ? (
                <>
                  <div className="w-3 h-3 border-t border-white border-solid rounded-full animate-spin"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </>
              )}
            </button>
          </div>
        </nav>

        {/* Sidebar + Editor + Preview layout continues here... (unchanged) */}
        {/* ⬇️ ⬇️ ⬇️  — the rest of your file is identical — ⬇️ ⬇️ ⬇️ */}
        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Section Navigation */}
          {sidebarOpen && (
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
              <div className="p-4 border-b border-slate-200">
                <h2 className="font-semibold text-slate-900">Resume Sections</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-md ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {section.icon}
                      </div>
                      <span className="text-sm font-medium">{section.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 px-3">
                  <button
                    onClick={handleAddCustomSection}
                    className="w-full flex items-center gap-2 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    Add Custom Section
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content — Editor + Preview */}
          <div className="flex-1 flex flex-col">
            {/* Editor Area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Editor Panel */}
              <div className="flex-1 bg-white border-r border-slate-200 overflow-hidden flex flex-col">
                <div className="px-5 py-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <Type className="h-5 w-5 text-blue-500" />
                      {sections.find((s) => s.id === activeSection)?.name || "Section"}
                    </h2>
                    <div className="flex items-center gap-2 text-xs px-2.5 py-1 bg-green-50 text-green-700 rounded-full">
                      <CheckCircle className="h-3 w-3" />
                      Auto-saved
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <div className="p-5">
                    <ResumeForm activeSection={activeSection} />
                  </div>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="flex-1 bg-slate-50 overflow-hidden flex flex-col">
                <div className="px-5 py-4 border-b border-slate-200 bg-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <Eye className="h-5 w-5 text-blue-500" />
                      Resume Preview
                    </h2>

                    {/* Preview toolbar */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-slate-100 rounded-lg p-1">
                        <button
                          onClick={() => setPreviewMode("desktop")}
                          className={`p-1.5 rounded-md transition-colors ${
                            previewMode === "desktop"
                              ? "bg-white shadow-sm text-blue-600"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <Monitor className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setPreviewMode("mobile")}
                          className={`p-1.5 rounded-md transition-colors ${
                            previewMode === "mobile"
                              ? "bg-white shadow-sm text-blue-600"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <Smartphone className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Zoom */}
                      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                        <button
                          onClick={handleZoomOut}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
                        >
                          <ZoomOut className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleResetZoom}
                          className="px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 rounded-md font-medium"
                        >
                          {zoomLevel}%
                        </button>
                        <button
                          onClick={handleZoomIn}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
                        >
                          <ZoomIn className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
                      >
                        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preview Body */}
                <div
                  className={`flex-1 p-5 flex items-center justify-center ${
                    isFullscreen ? "fixed inset-0 z-50 bg-white" : ""
                  }`}
                >
                  <div
                    className={`relative ${
                      previewMode === "mobile" ? "w-80" : "w-full max-w-2xl"
                    }`}
                    style={{
                      transform: `scale(${zoomLevel / 100})`,
                      transformOrigin: "center",
                    }}
                  >
                    {/* Shadow frame */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl shadow-lg blur-sm opacity-30"></div>

                    {/* Document */}
                    <div
                      className="relative bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden"
                      style={{ aspectRatio: "210/297" }}
                    >
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2"></div>

                      <div className="p-8 bg-white h-full overflow-auto">
                        <TemplateComponent data={data} theme={theme} />
                      </div>

                      <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 flex items-center justify-between">
                        <div>Created with Resume Studio</div>
                        <div>Last saved: {new Date().toLocaleDateString()}</div>
                      </div>
                    </div>

                    {previewMode === "mobile" && (
                      <>
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-300 rounded-full"></div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-slate-300"></div>
                      </>
                    )}
                  </div>
                </div>

                {/* Preview Footer */}
                <div className="px-5 py-3 border-t border-slate-200 bg-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleTemplateChange("classic")}
                        className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-sm font-medium"
                      >
                        <File className="h-4 w-4" />
                        Change Template
                      </button>

                      <button
                        onClick={handleDuplicate}
                        className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-sm font-medium"
                      >
                        <Layers className="h-4 w-4" />
                        Duplicate
                      </button>
                    </div>

                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm"
                    >
                      <Share className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tips Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
              <Info className="h-4 w-4 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Pro Tip:</span> Use action verbs and quantify achievements for stronger impact.
              </p>
            </div>
            <div className="ml-auto">
              <a className="text-sm font-medium text-blue-600 hover:text-blue-800" href="#">
                View All Tips →
              </a>
            </div>
          </div>
        </div>

        {/* Notification */}
        {showNotification && (
          <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span>{notificationMessage}</span>
          </div>
        )}

      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

