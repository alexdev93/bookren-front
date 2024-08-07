export const transformData = (books) => {
  const categoryCount = books.reduce((acc, book) => {
    const categoryName = book.category.name;
    if (categoryName) {
      acc[categoryName] = (acc[categoryName] || 0) + 1;
    }
    return acc;
  }, {});

  return Object.entries(categoryCount).map(([category, count]) => ({
    category,
    count,
  }));
};
