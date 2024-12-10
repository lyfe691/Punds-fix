import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { JobFormData } from "./JobForm";

interface JobCardProps {
  job: JobFormData;
  onEdit: () => void;
  onDelete: () => void;
}

const stageColors = {
  applied: "bg-muted text-muted-foreground",
  screening: "bg-warning-light text-warning",
  interview: "bg-primary/20 text-primary",
  technical: "bg-primary/20 text-primary",
  negotiation: "bg-success-light text-success",
  offer: "bg-success-light text-success",
  rejected: "bg-error-light text-error",
};

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning-light text-warning",
  high: "bg-error-light text-error",
};

export const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete }) => {
  return (
    <Card className="p-6 space-y-4 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-muted-foreground">{job.company}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="hover:bg-primary/10"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="hover:bg-error-light text-error"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className={`stage-chip ${stageColors[job.stage as keyof typeof stageColors]}`}>
          {job.stage.charAt(0).toUpperCase() + job.stage.slice(1)}
        </span>
        <span className={`stage-chip ${priorityColors[job.priority as keyof typeof priorityColors]}`}>
          {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)} Priority
        </span>
      </div>

      {job.location && (
        <p className="text-sm text-muted-foreground">
          📍 {job.location}
        </p>
      )}

      {job.jobLink && (
        <a
          href={job.jobLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline block"
        >
          View Job Posting
        </a>
      )}

      {job.notes && (
        <p className="text-sm text-muted-foreground border-t pt-4 mt-4">
          {job.notes}
        </p>
      )}
    </Card>
  );
};