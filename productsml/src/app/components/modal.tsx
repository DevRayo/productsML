export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">{children}</div>
      </div>
    </>
  );
}
