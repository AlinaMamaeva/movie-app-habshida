"use client";
import { Alert, Button } from "antd";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <Alert
        style={{
          margin: "50px",
        }}
        title="Something went wrong"
        description={error.message}
        type="error"
        showIcon
        action={<Button onClick={reset}>Try again</Button>}
      />
    </div>
  );
}
