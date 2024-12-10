import React from "react";
import { JobForm, type JobFormData } from "@/components/JobForm";
import { JobCard } from "@/components/JobCard";
import { Stats } from "@/components/Stats";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [jobs, setJobs] = React.useState<JobFormData[]>(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = React.useState("");
  const [stageFilter, setStageFilter] = React.useState("all");
  const { toast } = useToast();

  React.useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = (job: JobFormData) => {
    setJobs((prev) => [...prev, job]);
    toast({
      title: "Success",
      description: "Job application added successfully",
    });
  };

  const handleEditJob = (index: number, updatedJob: JobFormData) => {
    setJobs((prev) => {
      const newJobs = [...prev];
      newJobs[index] = updatedJob;
      return newJobs;
    });
    toast({
      title: "Success",
      description: "Job application updated successfully",
    });
  };

  const handleDeleteJob = (index: number) => {
    if (window.confirm("Are you sure you want to delete this job application?")) {
      setJobs((prev) => prev.filter((_, i) => i !== index));
      toast({
        title: "Success",
        description: "Job application deleted successfully",
      });
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stageFilter === "all" || job.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="min-h-screen bg-transparent">
      <div className="container py-8 space-y-8 px-4 md:px-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#6a6ae2]">
            Punds Application Tracker
          </h1>
          <p className="text-gray-300">
            Track and organize your job applications in one place
          </p>
        </div>

        <Stats jobs={jobs} />

        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6 text-white">Add New Application</h2>
          <JobForm onSubmit={handleAddJob} />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="md:w-1/2 input-field"
            />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="md:w-1/2 input-field"
            >
              <option value="all">All Stages</option>
              <option value="applied">Applied</option>
              <option value="screening">Phone Screen</option>
              <option value="interview">Interview</option>
              <option value="technical">Technical Round</option>
              <option value="negotiation">Offer Negotiation</option>
              <option value="offer">Offer Received</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <JobCard
                key={index}
                job={job}
                onEdit={() => handleEditJob(index, job)}
                onDelete={() => handleDeleteJob(index)}
              />
            ))}
            {filteredJobs.length === 0 && (
              <p className="text-gray-400 col-span-full text-center py-8">
                No job applications found. Start by adding your first application!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;