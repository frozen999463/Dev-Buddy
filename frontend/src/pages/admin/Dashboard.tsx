import { useSearchParams } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar"
import CourseEditor from "./CourseEditor";
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import UsersTable from "./components/table"
import AdminCourses from "./AdminCourses";
import NodeEditor from "./NodeEditor";

export default function AdminDashboard() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "users"; // Defaults to 'users' if no param is present

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              {/* Dynamic Content Switching */}
              {view === "users" && (
                <>
                  <SectionCards />
                  <div className="px-4 lg:px-6">
                    <ChartAreaInteractive />
                  </div>
                  <UsersTable />
                </>
              )}

              {view === "courses" && (
                <div className="px-4 lg:px-6">
                  <AdminCourses />
                </div>
              )}

              {view === "edit-course" && (
                <CourseEditor />
              )}

              {view === "node-editor" && (
                <NodeEditor />
              )}

              {view === "analytics" && (
                <div className="p-12 text-center space-y-4">
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <ChartAreaInteractive />
                  </div>
                  <h2 className="text-2xl font-bold">Analytics Coming Soon</h2>
                  <p className="text-muted-foreground">We're building a powerful engine to track student progress and engagement.</p>
                </div>
              )}

              {view === "payments" && (
                <div className="p-12 text-center space-y-4">
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-3xl font-bold">
                    $
                  </div>
                  <h2 className="text-2xl font-bold">Payments Coming Soon</h2>
                  <p className="text-muted-foreground">Revenue tracking and checkout integration is currently under development.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}