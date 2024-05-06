// Import necessary dependencies and icons
import { Button } from "@/components/ui/button";
import { FileSearch,  } from "@phosphor-icons/react"; // Assuming icons are stored in a separate file
import { SVGProps } from "react";

// Navbar component
function Navbar(props: {title: string | null}) {


  return (
    <div className="flex h-[60px] items-center justify-between border-b bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
      {/* Navbar title */}
      <h1 className="text-lg font-medium">{props.title}</h1>
      {/* Navbar buttons */}
      <div className="flex items-center gap-4">
        {/* Button for searching */}
        <Button size="icon" variant="ghost">
          <FileSearch className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        {/* Button for settings */}
        <Button size="icon" variant="ghost">
          <SettingsIcon className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>
    </div>
  );
}



function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
// Export Navbar component
export default Navbar;


