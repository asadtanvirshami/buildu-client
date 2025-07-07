"use client";

import React from "react";
import { Separator } from "../../separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormattedMessage } from "react-intl";

function FAQCard({
  titleId,
  descriptionId,
}: {
  titleId: string;
  descriptionId: string;
}) {
  return (
    <div className="p-4 fade-up">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={titleId}>
          <AccordionTrigger>
            <FormattedMessage id={titleId} />
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p><FormattedMessage id={descriptionId} /></p>
          </AccordionContent>
        </AccordionItem>
        <Separator />
      </Accordion>
    </div>
  );
}

const FAQsSection = () => {
  const faqs = [
    { titleId: "faqs_title01", descriptionId: "faqs_desc01" },
    { titleId: "faqs_title02", descriptionId: "faqs_desc02" },
    { titleId: "faqs_title03", descriptionId: "faqs_desc03" },
    { titleId: "faqs_title04", descriptionId: "faqs_desc04" },
    { titleId: "faqs_title05", descriptionId: "faqs_desc05" },
    { titleId: "faqs_title06", descriptionId: "faqs_desc06" },
    { titleId: "faqs_title07", descriptionId: "faqs_desc07" },
  ];

  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-center md:text-left mb-12">
      <span className="text-4xl space-x-3 flex-none justify-center md:flex lg:flex md:text-5xl font-extrabold tracking-tight">
        <h1>
          <FormattedMessage id="faqs_title_main01" />
        </h1>
        <h1 className="t bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          <FormattedMessage id="team_title02" />
        </h1>
      </span>

      {/* FAQ Cards Section */}
      <div className="mt-12 border bg-card rounded-lg">
        {faqs.map((faq) => (
          <FAQCard key={faq.titleId} {...faq} />
        ))}
      </div>
    </div>
  );
};

export default FAQsSection;
