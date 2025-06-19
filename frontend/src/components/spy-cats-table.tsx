"use client";

import { useState } from "react";
import type { SpyCat } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, DollarSign, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SpyCatsTableProps {
  cats: SpyCat[];
  onUpdateSalary: (id: string, salary: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function SpyCatsTable({
  cats,
  onUpdateSalary,
  onDelete,
  isLoading = false,
}: SpyCatsTableProps) {
  const [editingCat, setEditingCat] = useState<SpyCat | null>(null);
  const [newSalary, setNewSalary] = useState<number>(0);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditClick = (cat: SpyCat) => {
    setEditingCat(cat);
    setNewSalary(cat.salary);
    setIsEditDialogOpen(true);
  };

  const handleSalaryUpdate = async () => {
    if (editingCat && newSalary > 0) {
      await onUpdateSalary(editingCat.id, newSalary);
      setIsEditDialogOpen(false);
      setEditingCat(null);
    }
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(salary);
  };

  const filteredCats = cats.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.breed.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  if (cats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Spy Cats Found</CardTitle>
          <CardDescription>
            Start building your spy cat team by adding your first agent above.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Spy Cats Registry ({filteredCats.length} of {cats.length} agents)
        </CardTitle>
        <CardDescription>
          Manage your elite team of spy cats and their compensation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Breed</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCats.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell>{cat.breed}</TableCell>
                  <TableCell>
                    {cat.years_of_experience}{" "}
                    {cat.years_of_experience === 1 ? "year" : "years"}
                  </TableCell>
                  <TableCell className="font-mono">
                    {formatSalary(cat.salary)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog
                        open={isEditDialogOpen && editingCat?.id === cat.id}
                        onOpenChange={setIsEditDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditClick(cat)}
                            disabled={isLoading}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Salary</DialogTitle>
                            <DialogDescription>
                              Update the salary for {cat.name}. Current salary:{" "}
                              {formatSalary(cat.salary)}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="salary">New Salary ($)</Label>
                              <Input
                                id="salary"
                                type="number"
                                min="1"
                                value={newSalary}
                                onChange={(e) =>
                                  setNewSalary(
                                    Number.parseInt(e.target.value) || 0
                                  )
                                }
                                placeholder="Enter new salary"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsEditDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSalaryUpdate}
                              disabled={newSalary <= 0 || isLoading}
                            >
                              {isLoading ? "Updating..." : "Update Salary"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Spy Cat</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove {cat.name} from
                              the agency? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(cat.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
