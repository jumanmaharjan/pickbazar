import { useState } from "react";
import { supabase } from "../../SupabaseClient";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      alert("Password updated successfully!");
      navigate("/signin"); // redirect to login
    } catch (err) {
      console.error(err);
      alert("Error updating password: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}

export default UpdatePassword;
