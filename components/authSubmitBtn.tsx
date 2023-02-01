export default function AushSubmitBtn({ btnName }: { btnName: string }) {
  return (
    <button
      type="submit"
      className="relative top-16 left-[27rem] text-xl text-neutral-300"
    >
      {btnName}
    </button>
  );
}
