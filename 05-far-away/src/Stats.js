export default function Stats({ items }) {
  if (!items.length) {
    <footer className="stats">
      👜 Start Adding Items to Your Packing List 🚀
    </footer>;
  }
  const NoofItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / NoofItems) * 100);

  return (
    <footer className="stats">
      {percentage === 100
        ? "Now your are all Completed And ready to go🛩"
        : `👜 You have ${NoofItems} items in your list, and you already packed
        ${packedItems} (${percentage}%) items`}
    </footer>
  );
}
