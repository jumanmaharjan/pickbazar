export const menuData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Categories",
    path: "/categories",
    children: [
      { label: "Fresh Vegetables", path: "/categories/fresh-vegetables" },
      { label: "Diet Nutrition", path: "/categories/diet-nutrition" },
      { label: "Healthy Foods", path: "/categories/healthy-foods" },
      { label: "Grocery Items", path: "/categories/grocery-items" },
      { label: "Beef Steak", path: "/categories/beef-steak" },
    ],
  },
  {
    label: "Dietary",
    path: "/dietary",
    children: [
      { label: "Vegetarian", path: "/dietary/vegetarian" },
      { label: "Organic", path: "/dietary/organic" },
      { label: "Kakogenic", path: "/dietary/kakogenic" },
      { label: "Mediterranean", path: "/dietary/mediterranean" },
    ],
  },
  {
    label: "Pages",
    path: "/pages",
    children: [
      { label: "sign in", path: "/signin" },
      { label: "sign up", path: "/signup" },
      { label: "Search", path: "/search" },
    ],
  },
  {
    label: "Shops",
    path: "/shops",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];
