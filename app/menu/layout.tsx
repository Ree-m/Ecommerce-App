import MenuSideBar from "../Components/MenuSidebar"
import Header from "../Components/Header"
export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-2 bg-greyBackground bg-contain pt-14 pb-20 xl:pt-18 xl:pb-24 2xl:pt-20 2xl:pb-26 3xl:pt-22 3xl:pb-28 px-3 lg:px-6 xl:px-8 2xl:px-10 3xl:px-12">
      <MenuSideBar />
      <div className="flex-grow">{children}</div>
    </div>

  )
}
