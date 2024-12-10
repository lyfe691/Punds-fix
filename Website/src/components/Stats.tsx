import React from "react";
import { Card } from "./ui/card";
import type { JobFormData } from "./JobForm";

interface StatsProps {
  jobs: JobFormData[];
}

export const Stats: React.FC<StatsProps> = ({ jobs }) => {
  const totalJobs = jobs.length;
  const interviewJobs = jobs.filter((job) =>
    ["interview", "technical", "negotiation"].includes(job.stage)
  ).length;
  const offerJobs = jobs.filter((job) => job.stage === "offer").length;

  const stats = [
    {
      label: "Total Applications",
      value: totalJobs,
    },
    {
      label: "Interview Rate",
      value: totalJobs > 0 ? `${((interviewJobs / totalJobs) * 100).toFixed(1)}%` : "0%",
    },
    {
      label: "Offer Rate",
      value: totalJobs > 0 ? `${((offerJobs / totalJobs) * 100).toFixed(1)}%` : "0%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6 text-center animate-fade-in">
          <h3 className="text-lg font-semibold">{stat.value}</h3>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
};