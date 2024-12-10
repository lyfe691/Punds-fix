import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  jobLink: string;
  stage: string;
  priority: string;
  applicationDate: string;
  notes: string;
}

interface JobFormProps {
  onSubmit: (data: JobFormData) => void;
  initialData?: Partial<JobFormData>;
}

export const JobForm: React.FC<JobFormProps> = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = React.useState<JobFormData>({
    title: initialData.title || "",
    company: initialData.company || "",
    location: initialData.location || "",
    jobLink: initialData.jobLink || "",
    stage: initialData.stage || "applied",
    priority: initialData.priority || "medium",
    applicationDate: initialData.applicationDate || new Date().toISOString().split("T")[0],
    notes: initialData.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData.title) {
      setFormData({
        title: "",
        company: "",
        location: "",
        jobLink: "",
        stage: "applied",
        priority: "medium",
        applicationDate: new Date().toISOString().split("T")[0],
        notes: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Job Title</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Software Engineer"
            required
            className="input-field"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Company</label>
          <Input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g., Apple"
            required
            className="input-field"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Location</label>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., San Francisco, CA"
            className="input-field"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Job URL</label>
          <Input
            name="jobLink"
            value={formData.jobLink}
            onChange={handleChange}
            placeholder="https://..."
            type="url"
            className="input-field"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Stage</label>
          <Select
            value={formData.stage}
            onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}
          >
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="screening">Phone Screen</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="technical">Technical Round</SelectItem>
              <SelectItem value="negotiation">Offer Negotiation</SelectItem>
              <SelectItem value="offer">Offer Received</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Priority</label>
          <Select
            value={formData.priority}
            onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
          >
            <SelectTrigger className="input-field">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Application Date</label>
          <Input
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            type="date"
            className="input-field"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-black">Notes</label>
        <Textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any notes about the application..."
          className="input-field min-h-[100px]"
        />
      </div>
      <Button type="submit" className="btn-primary w-full">
        {initialData.title ? "Update Job Application" : "Add Job Application"}
      </Button>
    </form>
  );
};