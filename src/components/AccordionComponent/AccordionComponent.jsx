import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "./AccordionComponent.css";

export default function AccordionComponent({
  accordionTitle,
  accordionDescription,
}) {
  return (
    <Accordion allowZeroExpanded>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>{accordionTitle}</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div>{accordionDescription}</div>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
}
