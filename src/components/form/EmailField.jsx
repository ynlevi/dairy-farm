export default function EmailField() {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="email">Email</label>
      <input
        className="p-2 text-black"
        type="email"
        id="email"
        name="email"
        required
        placeholder="example@gmail.com"
      />
    </div>
  );
}
