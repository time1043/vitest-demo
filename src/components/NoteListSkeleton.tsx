export default function NoteListSkeleton() {
  // <progress> with custom styles which are conflict with current styles
  return (
    <div role="progressbar" className="mx-auto mt-8 flex w-full flex-col items-center gap-4">
      <div className="h-8 w-4/5 skeleton"></div>
      <div className="h-8 w-4/5 skeleton"></div>
      <div className="h-8 w-4/5 skeleton"></div>
    </div>
  )
}
