export type PopupMenuType = {
  children: JSX.Element
}

export function PopupMenu({ children }: PopupMenuType) {
  return (
    <div className="PopupMenu">
      {children}
    </div>
  );
}
