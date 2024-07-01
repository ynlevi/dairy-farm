export default function NameField({ required = false }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="email">First Name</label>
      <input
        className="p-2 text-black"
        type="text"
        id="fname"
        name="fname"
        required={required}
        autoCapitalize="on"
        placeholder="How should we call you?"
      />
    </div>
  );
}
