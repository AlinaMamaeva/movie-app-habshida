"use client";

import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  total: number;
  className?: string;
}

export default function PaginationClient({ currentPage, total }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Pagination
      current={currentPage}
      total={total}
      pageSize={6}
      onChange={(page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.push(`?${params.toString()}`);
      }}
      showSizeChanger={false}
      className="pagination"
    />
  );
}
