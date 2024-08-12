// utils/transformBooksChart.js
export const transformData = (books) => {
  const categoryCount = {};

  books.forEach((book) => {
    const category = book.Category.name;
    if (categoryCount[category]) {
      categoryCount[category]++;
    } else {
      categoryCount[category] = 1;
    }
  });

  return Object.keys(categoryCount).map((category) => ({
    category,
    count: categoryCount[category],
  }));
};
