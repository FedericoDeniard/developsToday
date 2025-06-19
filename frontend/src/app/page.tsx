"use client";

import { useState, useEffect } from "react";
import type { SpyCat, CreateSpyCatRequest } from "@/lib/types";
import { apiClient } from "@/lib/api";
import { SpyCatForm } from "@/components/spy-cat-form";
import { SpyCatsTable } from "@/components/spy-cats-table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Cat } from "lucide-react";
import { StatsCards } from "@/components/stats-cards";
import { ExportData } from "@/components/export-data";
import { ThemeToggle } from "@/components/theme-toggle";
import { MissionTracker } from "@/components/mission-tracker";
import { toast } from "sonner";

export default function Dashboard() {
  const [cats, setCats] = useState<SpyCat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCats = async () => {
    try {
      setError(null);
      const data = await apiClient.getSpyCats();
      console.log(data);
      setCats(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch spy cats";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCat = async (data: CreateSpyCatRequest) => {
    try {
      setIsSubmitting(true);
      const newCat = await apiClient.createSpyCat(data);
      setCats((prev) => [...prev, newCat]);
      toast.success(`${newCat.name} has been added to the agency!`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to add spy cat";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSalary = async (id: string, salary: number) => {
    try {
      const updatedCat = await apiClient.updateSpyCat(id, { salary });
      setCats((prev) => prev.map((cat) => (cat.id === id ? updatedCat : cat)));
      toast.success(`Salary updated for ${updatedCat.name}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update salary";
      toast.error(errorMessage);
    }
  };

  const handleDeleteCat = async (id: string) => {
    try {
      const catToDelete = cats.find((cat) => cat.id === id);
      await apiClient.deleteSpyCat(id);
      setCats((prev) => prev.filter((cat) => cat.id !== id));
      toast.success(
        `${catToDelete?.name || "Spy cat"} has been removed from the agency`
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete spy cat";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <Cat className="h-6 w-6" />
              <h1 className="text-lg font-semibold">
                Spy Cats Management Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ExportData cats={cats} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && <StatsCards cats={cats} />}

        <div id="add-cat">
          <SpyCatForm onSubmit={handleAddCat} isLoading={isSubmitting} />
        </div>

        <div>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading spy cats...</p>
              </div>
            </div>
          ) : (
            <SpyCatsTable
              cats={cats}
              onUpdateSalary={handleUpdateSalary}
              onDelete={handleDeleteCat}
              isLoading={isSubmitting}
            />
          )}
        </div>
        <div id="missions">
          <MissionTracker cats={cats} />
        </div>
      </div>
    </div>
  );
}
