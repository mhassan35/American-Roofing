// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Settings } from "lucide-react"
// import Link from "next/link"

// export default function AdminButton() {
//   const [isVisible, setIsVisible] = useState(false)

//   // Show admin button only when hovering over the page
//   return (
//     <div
//       className="fixed top-4 right-4 z-50"
//       onMouseEnter={() => setIsVisible(true)}
//       onMouseLeave={() => setIsVisible(false)}
//     >
//       {isVisible && (
//         <Link href="/admin">
//           <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white shadow-lg">
//             <Settings className="h-4 w-4 mr-2" />
//             Admin
//           </Button>
//         </Link>
//       )}
//     </div>
//   )
// }
