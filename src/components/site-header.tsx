import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const manager = pathname === "/manager";

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand" aria-label="Pitchside home">
          <span className="brand-mark"><span /></span>
          <span>pitchside<span className="brand-dot">.</span></span>
        </Link>
        <nav className="header-nav" aria-label="Main navigation">
          <Link to="/" className={`nav-link ${!manager ? "nav-link-active" : ""}`}>Find a turf</Link>
          <Link to="/manager" className={`nav-link ${manager ? "nav-link-active" : ""}`}>Manager view</Link>
        </nav>
        <div className="header-actions">
          <Button variant="outline" size="sm" asChild className="manager-shortcut">
            <Link to={manager ? "/" : "/manager"}>{manager ? <ArrowUpRight /> : <LayoutDashboard />}{manager ? "Explore turfs" : "Manager view"}</Link>
          </Button>
          <div className="profile-avatar" aria-label="Demo profile avatar">AK</div>
        </div>
      </div>
    </header>
  );
}