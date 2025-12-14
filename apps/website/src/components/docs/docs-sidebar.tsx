import { 
  FileText, 
  Home, 
  Layers, 
  Settings, 
  Wrench,
  CheckCircle2,
  Palette,
  Rocket,
  Box,
  Code2
} from "lucide-react";
import Link from "next/link";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", icon: Home },
      { title: "Installation", href: "/docs/installation", icon: Box },
      { title: "Quick Start", href: "/docs/quick-start", icon: Rocket },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Overview", href: "/docs/components", icon: Layers },
      { title: "Form Builder", href: "/docs/components/form-builder", icon: Wrench },
      { title: "Field Types", href: "/docs/components/field-types", icon: Code2 },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Configuration", href: "/docs/api/configuration", icon: Settings },
      { title: "Validation", href: "/docs/api/validation", icon: CheckCircle2 },
    ],
  },
  {
    title: "Customization",
    items: [
      { title: "Theming", href: "/docs/theming", icon: Palette },
    ],
  },
];

export function DocsSidebar() {
  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r md:sticky md:block">
      <div className="py-6 pr-6 lg:py-8">
        <nav className="space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h4 className="mb-2 px-4 text-sm font-semibold">{section.title}</h4>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 rounded-md px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
