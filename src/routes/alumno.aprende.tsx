import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/alumno/aprende")({
  component: () => <Outlet />,
});
