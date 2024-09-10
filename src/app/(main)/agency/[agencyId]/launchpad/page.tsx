import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type Props = {};

const LaunchPadPage = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="
    w-full h-full max-w-[800px]"
      >
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Lets get started!</CardTitle>
            <CardDescription>
              Follow the steps below to get your account setup.
            </CardDescription>
            <CardContent className="flex flex-col gap-4 "></CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default LaunchPadPage;
