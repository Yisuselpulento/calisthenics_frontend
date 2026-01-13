export default function Pagination({
  page,
  totalPages,
  onPageChange,
  maxVisible = 5,
}) {
  if (totalPages <= 1) return null;

  const half = Math.floor(maxVisible / 2);

  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {/* PREV */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 rounded ${
          page === 1
            ? "bg-stone-800 text-gray-500 cursor-not-allowed"
            : "bg-stone-700 hover:bg-stone-600 text-white"
        }`}
      >
        ←
      </button>

      {/* PAGE NUMBERS */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded bg-stone-700 hover:bg-stone-600 text-white"
          >
            1
          </button>
          {start > 2 && <span className="text-gray-500">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${
            p === page
              ? "bg-yellow-500 text-black font-bold"
              : "bg-stone-700 hover:bg-stone-600 text-white"
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="text-gray-500">…</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded bg-stone-700 hover:bg-stone-600 text-white"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* NEXT */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded ${
          page === totalPages
            ? "bg-stone-800 text-gray-500 cursor-not-allowed"
            : "bg-stone-700 hover:bg-stone-600 text-white"
        }`}
      >
        →
      </button>
    </div>
  );
}
