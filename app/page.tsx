"use client";

import { useState } from "react";
import { RhythmStackView } from "@/components/views/RhythmStackView";
import { CalendarView } from "@/components/views/CalendarView";
import { PipelineView } from "@/components/views/PipelineView";
import { EntityView } from "@/components/views/EntityView";
import { EntityDetailView } from "@/components/views/EntityDetailView";
import { ConvertView } from "@/components/views/ConvertView";
import { CanvasView } from "@/components/views/CanvasView";
import { SettingsView } from "@/components/views/SettingsView";
import { ViewContext } from "@/components/providers/ViewContext";

export default function Home() {
  const [activeView, setActiveView] = useState("rhythm");
  const [viewParams, setViewParams] = useState<any>(null);

  const renderView = () => {
    switch (activeView) {
      case "rhythm": return <RhythmStackView />;
      case "calendar": return <CalendarView />;
      case "pipeline": return <PipelineView />;
      case "entities": return <EntityView />;
      case "entity-detail": return <EntityDetailView />;
      case "convert": return <ConvertView />;
      case "canvas": return <CanvasView />;
      case "settings": return <SettingsView />;
      default: return <RhythmStackView />;
    }
  };

  return (
    <ViewContext.Provider value={{ activeView, setActiveView, viewParams, setViewParams }}>
      {renderView()}
    </ViewContext.Provider>
  );
}