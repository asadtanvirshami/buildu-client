"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

// import paolo_img from "../../../../../public/assets/team/paolo.jpg";
// import dani_img from "../../../../../public/assets/team/dani.jpg";
// import pereso_img from "../../../../../public/assets/team/pereso.jpg";
// import marcos_img from "../../../../../public/assets/team/marcos.jpg";
import { FormattedMessage } from "react-intl";

const teamMembers = [
  {
    id: "1",
    name: "Paolo",
    image: "paolo_img",
  },
  {
    id: "2",
    name: "Perseo",
    image: "pereso_img",
  },
  {
    id: "3",
    name: "Marcos",
    image: "marcos_img",
  },
  {
    id: "4",
    name: "Dani",
    image: "dani_img",
  },
];

export default function TeamSection() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12">
      <span className="text-4xl space-x-3 flex justify-center md:flex lg:flex md:text-5xl font-extrabold tracking-tight">
        <h1><FormattedMessage id="team_title01" /></h1>
        <h1 className="t bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          <FormattedMessage id="team_title02" />
        </h1>
      </span>
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {teamMembers.map((member) => (
            <CarouselItem
              key={member.id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3"
            >
              <Card className="h-full">
                <CardHeader>
                  {/* <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-92 object-cover rounded-md mb-2"
                  /> */}
                  <CardTitle className="text-base">{member.name}</CardTitle>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
