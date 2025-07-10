"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import {
  ArrowDownUp,
  Calculator,
  Calendar,
  ChartArea,
  ChartBar,
  Link,
} from "lucide-react";
import { FormattedMessage } from "react-intl";

const OfferCard = ({
  titleId,
  descriptionId,
  icon,
}: {
  titleId: string;
  descriptionId: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <FormattedMessage id={titleId} /> {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormattedMessage id={descriptionId} />
      </CardContent>
    </Card>
  );
};

const OfferSection = () => {
  const features = [
    {
      titleId: "features_title01",
      descriptionId: "features_desc01",
      icon: <ChartArea />,
    },
    {
      titleId: "features_title02",
      descriptionId: "features_desc02",
      icon: <ArrowDownUp />,
    },
    {
      titleId: "features_title03",
      descriptionId: "features_desc03",
      icon: <Calendar />,
    },
    {
      titleId: "features_title04",
      descriptionId: "features_desc04",
      icon: <Link />,
    },
    {
      titleId: "features_title05",
      descriptionId: "features_desc05",
      icon: <Calculator />,
    },
    {
      titleId: "features_title06",
      descriptionId: "features_desc06",
      icon: <ChartBar />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 mt-12">
      <span className="text-4xl space-x-3 flex justify-center md:flex lg:flex md:text-5xl font-extrabold tracking-tight">
        <h1 className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          <FormattedMessage id="offers_title" defaultMessage="What We Offer" />
        </h1>
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-3">
        {features.map((feature) => (
          <OfferCard
            key={feature.titleId}
            titleId={feature.titleId}
            descriptionId={feature.descriptionId}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferSection;
