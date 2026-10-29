export function addActivity(title, description) {
  const existingActivities =
    JSON.parse(localStorage.getItem("mediassist_activity")) || [];

  const newActivity = {
    id: Date.now(),
    title,
    description,
    time: new Date().toLocaleString(),
  };

  const updatedActivities = [
    newActivity,
    ...existingActivities,
  ].slice(0, 5);

  localStorage.setItem(
    "mediassist_activity",
    JSON.stringify(updatedActivities)
  );
}


export function getActivities() {
  return (
    JSON.parse(
      localStorage.getItem("mediassist_activity")
    ) || []
  );
}


export function clearActivities() {
  localStorage.removeItem("mediassist_activity");
}