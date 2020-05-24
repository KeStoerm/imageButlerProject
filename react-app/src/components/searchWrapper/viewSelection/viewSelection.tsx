import React from "react";
import "./viewSelection.scss"
import classNames from "classnames";

export type View = "gallery" | "list";

interface ViewSelectionProps {
  onChange(view: View): any,
  currentView: View,
}

const getViewClass = (currentView: View, viewOfSpan: View) => classNames({"is-active": currentView === viewOfSpan});

export const ViewSelection: React.FC<ViewSelectionProps> = ({currentView, onChange}) =>
  <div className="viewport-selection">
    <span className={getViewClass(currentView, "gallery")} onClick={() => onChange("gallery")}>
      <i className="fas fa-th-large"></i>
    </span>
    <span className={getViewClass(currentView, "list")} onClick={() => onChange("list")}>
      <i className="fas fa-list"></i>
    </span>
  </div>