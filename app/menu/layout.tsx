import MenuSideBar from "../Components/MenuSidebar"
export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

          <body>
            <MenuSideBar/>
            {children}
            </body>

    </html>
  )
}
