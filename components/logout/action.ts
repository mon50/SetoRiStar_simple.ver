export async function logout() {
  try {
    const response = await fetch("/auth/logout", {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to log out");
    }
    window.location.href = "/login"; // Redirect to login page after logging out
  } catch (error) {
    console.error("Error logging out:", error);
    alert("Failed to log out. Please try again.");
  }
}
