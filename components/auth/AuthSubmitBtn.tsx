export default function AuthSubmitBtn({
  btnName,
  disable,
}: {
  btnName: string;
  disable: boolean;
}) {
  return (
    <div className="flex">
      <button
        disabled={disable}
        type="submit"
        className="animate-intro relative top-16 ml-auto text-xl text-neutral-300"
      >
        {btnName}
      </button>
    </div>
  );
}
