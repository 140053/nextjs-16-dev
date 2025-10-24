import { Button } from "@/components/ui/button";

type DeleteProps = {
  sid: number;
  onDelete: () => void; // Required callback after deletion
};

export default function DeleteEntryByID({ sid, onDelete }: DeleteProps) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/db/patron/idrequest/delete/${sid}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the entry.");
      }

      alert("Entry deleted successfully!");

      // Trigger the callback to refresh the user list
      onDelete();
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("Failed to delete entry. Please try again.");
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}
