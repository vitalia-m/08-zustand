"use client";
type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="error">
      <p>Could not fetch the list of notes. {error.message}</p>
      <button className="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
