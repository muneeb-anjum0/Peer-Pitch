import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Super() {
  const user = useAuth((s) => s.user);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/post");
  }, [user, navigate]);

  if (!id) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center text-gray-500">
        No pitch selected. Please go back and select a pitch.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-24">
      <div className="mb-8 flex items-center gap-3">
        <h2 className="text-4xl font-black text-gray-900">Super Area</h2>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>
      <div className="rounded-2xl border border-brand-200 bg-white p-6 shadow-md">
        <h3 className="text-xl font-bold text-brand-700 mb-4">Super Tools for Pitch Owners</h3>
        <ul className="space-y-4 text-gray-700">
          <li>View super analytics for this pitch</li>
          <li>Edit or delete the post</li>
          <li>Edit or delete comments</li>
          <li>Access advanced moderation and management tools</li>
        </ul>
        <div className="mt-8 flex gap-4">
          <Button variant="primary" size="md">Edit Pitch</Button>
          <Button variant="neutral" size="md">Delete Pitch</Button>
        </div>
        <div className="mt-8 text-xs text-gray-500">
          Only the person who posted this pitch will have access to these super tools.
        </div>
      </div>
    </div>
  );
}
