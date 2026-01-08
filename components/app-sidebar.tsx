"use client"

import * as React from "react"
import {
  IdCard, SquareLibrary, Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Users
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ThemeToggleFloatLeft } from "./custom/theme-toggle"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Library Manager V1.0",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },   
  ],
  navMain: [
    {
      title: "Library Card",
      url: "#",
      icon: IdCard,
      items: [
        {
          title: "Request",
          url: "/dashboard/idmaker/request",
        },
        {
          title: "Pending",
          url: "/dashboard/idmaker/pending",
        },
        {
          title: "For Print",
          url: "/dashboard/idmaker/forprint",
        },
        {
          title: "Printed",
          url: "/dashboard/idmaker/printed",
        },
        {
          title: "Form",
          url: "/mobile",
        }
      ],
    },
    {
      title: "Catalog",
      url: "#",
      icon: SquareLibrary,
      items: [
        {
          title: "Books",
          url: "/dashboard/catalog/books",
        },
        {
          title: "Thesis",
          url: "#",
        },
        {
          title: "Serials",
          url: "#",
        },
      ],
    },
    {
      title: "Patron Master",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Add New Patron",
          url: "#",
        },
        {
          title: "List Patrons",
          url: "/dashboard/patron/list",
        },        
      ],
    },
    {
      title: "Collection Management",
      url: "#",
      icon: PieChart,
      items:[
        {
          title: "Dashboard",
          url: "/dashboard/collection/dashboard",
        },
        {
          title: "Groupings",
          url: "/dashboard/collection/groupings",
        },
        {
          title: "Classify",
          url: "/dashboard/collection/classify/book"
        }
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/**<NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
      <ThemeToggleFloatLeft />
    </Sidebar>
  )
}
