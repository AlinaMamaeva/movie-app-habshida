"use client";

import { Pagination } from "antd";
import { useRouter } from "next/navigation";

interface Props {
  currentPage: number;
  total: number;
  className?: string;
}

export default function PaginationClient({ currentPage, total }: Props) {
  const router = useRouter();

  return (
    <Pagination
      current={currentPage}
      total={total}
      pageSize={6}
      onChange={(page) => router.push(`?page=${page}`)}
      showSizeChanger={false}
      className="pagination"
    />
  );
}
