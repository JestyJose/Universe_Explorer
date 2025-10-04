import { ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <button
            onClick={() => navigate(item.path)}
            className={`transition-colors ${
              index === items.length - 1
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {item.label}
          </button>
        </div>
      ))}
    </nav>
  );
};
