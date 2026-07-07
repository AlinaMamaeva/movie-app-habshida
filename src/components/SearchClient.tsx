"use client";
import { Input } from "antd";
import { useRouter, usePathname } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

interface Props {
  onSearch?: () => void;
}

export default function SearchClient({ onSearch }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((value: string) => {
    onSearch?.();

    if (!value) {
      router.push(pathname);
      return;
    }

    const params = new URLSearchParams();
    params.set("query", value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <Input
      placeholder="Type to search..."
      style={{ height: "40px", marginBottom: "40px" }}
      onChange={(e) => handleSearch(e.target.value)}
      allowClear
    />
  );
}
