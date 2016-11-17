// -- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
// ++

import {TimelineViewParameters, timelineElementCssClass, RenderInfo} from "./wp-timeline";
import {todayLine} from "./wp-timeline.today-line";

const cssClassTableBody = ".generic-table--results-container";
const cssClassHeader = ".wp-timeline-header";

export type GlobalElement = (viewParams: TimelineViewParameters, elem: HTMLDivElement) => any;
type GlobalElementsRegistry = {[name: string]: GlobalElement};

export class WpTimelineHeader {

  private globalElementsRegistry: GlobalElementsRegistry = {};

  private globalElements: {[type: string]: HTMLDivElement} = {};

  private headerCell: HTMLElement;

  private marginTop: number;

  private height: number;

  constructor() {
    this.addElement("todayline", todayLine);
  }

  init() {
    if (this.headerCell === undefined) {
      this.headerCell = jQuery(cssClassHeader)[0];
    }

    this.marginTop = jQuery(this.headerCell).outerHeight();
    this.height = jQuery(cssClassTableBody).outerHeight();
  }

  refreshView(vp: TimelineViewParameters) {
    const enabledGlobalElements = _.keys(this.globalElementsRegistry);
    const createdGlobalElements = _.keys(this.globalElements);

    const newGlobalElements = _.difference(enabledGlobalElements, createdGlobalElements);
    const removedGlobalElements = _.difference(createdGlobalElements, enabledGlobalElements);

    // new elements
    for (const newElem of newGlobalElements) {
      const elem = document.createElement("div");
      elem.className = timelineElementCssClass + " wp-timeline-global-element-" + name;
      elem.style.position = "absolute";
      elem.style.top = this.marginTop + "px";
      elem.style.height = this.height + "px";
      elem.style.zIndex = "10";
      this.headerCell.appendChild(elem);
      this.globalElements[newElem] = elem;
    }

    // removed elements
    for (const removedElem of removedGlobalElements) {
      this.globalElements[removedElem].remove();
    }

    // update elements
    for (const elemType of _.keys(this.globalElements)) {
      const elem = this.globalElements[elemType];
      // const cellHeight = jQuery(this.timelineCell).outerHeight();
      // elem.style.top = "0px";
      // elem.style.height = (cellHeight + 1) + "px";
      this.globalElementsRegistry[elemType](vp, elem);
    }
  }

  addElement(name: string, renderer: GlobalElement) {
    this.globalElementsRegistry[name] = renderer;

    // const elem = document.createElement("div");
    // elem.className = timelineElementCssClass + " wp-timeline-globalelement-" + name;
    // elem.style.position = "absolute";
    // elem.style.top = this.marginTop + "px";
    // elem.style.left = "0px";
    // elem.style.height = this.height + "px";
    // elem.style.width = "10px";
    // elem.style.zIndex = "10";
    // elem.style.backgroundColor = "red";
    //
    // this.headerCell.appendChild(elem);
  }

  private clear() {
  }

  private renderLabels() {
  }

  private renderGlobalElements() {
  }


}
