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
      {
        label: "Fresh Vegetables",
        path: "/categories/8bd1478c-1ab4-4f4c-9a39-193a0ebebed1",
      },
      {
        label: "drinks",
        path: "/categories/b381e327-234d-4e7c-b9da-2bde6a39d065",
      },
      {
        label: "Fast Foods",
        path: "/categories/b381e327-234d-4e7c-b9da-2bde6a39d065",
      },
      {
        label: "Healthy food",
        path: "/categories/90c31612-8e0e-4bc8-838c-289ba6b004a6",
      },
      {
        label: "Beef Steak",
        path: "/categories/8ff62b5d-7833-47fe-ba43-e98cf7fa3bf2",
      },
    ],
  },
  {
    label: "admin",
    path: "/admin",
    children: [
      { label: "add product", path: "/admin/add-Product" },
      { label: "update product", path: "/admin/update-Product" },
    ],
  },
  {
    label: "Pages",
    path: "/pages",
    children: [
      { label: "sign in", path: "/signin" },
      { label: "sign up", path: "/signup" },
      { label: "sign out", path: "/signout" },
      { label: "reset password", path: "/reset-password" },
      { label: "Search", path: "/search" },
      { label: "checkout", path: "/checkout" },
      { label: "Orders", path: "/allorders" },
    ],
  },
  {
    label: "Cart",
    path: "/cart",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];
