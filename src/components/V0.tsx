/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kccabzGVSoe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"

export default function Component() {
  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr_280px] bg-gray-100 dark:bg-gray-950">
      <div className="border-r bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-[60px] items-center justify-between">
            <a className="flex items-center gap-2 font-semibold text-gray-50" href="#">
              <FileTextIcon className="h-6 w-6" />
              <span>Notes</span>
            </a>
            
            <Button size="icon" variant="ghost">
              <PlusIcon className="h-5 w-5" />
              <span className="sr-only">New Note</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto">
            <nav className="grid gap-2">
              <a
                className="flex items-center gap-3 rounded-md bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
                href="#"
              >
                <FileTextIcon className="h-4 w-4" />
                <span>Meeting Notes</span>
              </a>
              <a
                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileTextIcon className="h-4 w-4" />
                <span>Project Roadmap</span>
              </a>
              <a
                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileTextIcon className="h-4 w-4" />
                <span>Grocery List</span>
              </a>
              <a
                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileTextIcon className="h-4 w-4" />
                <span>Travel Plans</span>
              </a>
              <a
                className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <FileTextIcon className="h-4 w-4" />
                <span>Brainstorming</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex h-[60px] items-center justify-between border-b bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-lg font-medium">Meeting Notes</h1>
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost">
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button size="icon" variant="ghost">
              <SettingsIcon className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-gray dark:prose-invert">
              <h2>Meeting Agenda</h2>
              <ul>
                <li>Review Q3 performance</li>
                <li>Discuss new product roadmap</li>
                <li>Assign action items</li>
              </ul>
              <h2>Meeting Notes</h2>
              <p>
                The team discussed the Q3 performance and highlighted the key metrics that exceeded the targets. We also
                reviewed the new product roadmap and assigned action items to the respective team members. Overall, it
                was a productive meeting and we're on track to achieve our goals for the year.
              </p>
              <h2>Action Items</h2>
              <ul>
                <li>
                  <strong>John:</strong>
                  Prepare a detailed Q3 performance report by next week.
                </li>
                <li>
                  <strong>Sarah:</strong>
                  Finalize the new product roadmap and share with the team by the end of the week.
                </li>
                <li>
                  <strong>Michael:</strong>
                  Schedule a follow-up meeting to discuss the action items.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-l bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-[60px] items-center justify-between">
            <h2 className="text-lg font-medium">AI Insights</h2>
            <Button size="icon" variant="ghost">
              <XIcon className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    This meeting note covers the discussion of Q3 performance, new product roadmap, and assignment of
                    action items. The key highlights include exceeding targets, finalizing the roadmap, and scheduling a
                    follow-up meeting.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Similar Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <a
                      className="flex items-center gap-3 rounded-md bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
                      href="#"
                    >
                      <FileTextIcon className="h-4 w-4" />
                      <span>Q2 Performance Review</span>
                    </a>
                    <a
                      className="flex items-center gap-3 rounded-md bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
                      href="#"
                    >
                      <FileTextIcon className="h-4 w-4" />
                      <span>Product Roadmap 2023</span>
                    </a>
                    <a
                      className="flex items-center gap-3 rounded-md bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
                      href="#"
                    >
                      <FileTextIcon className="h-4 w-4" />
                      <span>Team Offsite Agenda</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50">Meeting</Badge>
                    <Badge className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50">Performance</Badge>
                    <Badge className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50">Roadmap</Badge>
                    <Badge className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50">Action Items</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FileTextIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  )
}


function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
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


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}