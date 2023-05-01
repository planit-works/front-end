export default function AuthSubmitBtn({
  btnName,
  disable,
}: {
  btnName: string;
  disable: boolean;
}) {
  return (
    <div className="flex mt-9">
      <button
        disabled={disable}
        type="submit"
        className="relative ml-auto text-2xl text-neutral-300
        md:text-xl"
      >
        {btnName}
      </button>
    </div>
  );
}
