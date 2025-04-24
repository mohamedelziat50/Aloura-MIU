export const getFragrancesPage = (req, res) => {
  res.render("fragrances-page");
};
export const getunisex_fragrance = (req, res) => {
  res.render("funisex-fragrances");
};
export const getfragrances_for_women = (req, res) => {
  res.render("fragrances-for-women");
};
export const getfragrances_for_men = (req, res) => {
  res.render("fragrances-for-men");
};
export const getcollections = (req, res) => {
  res.render("collections");
};

export const getour_story = (req, res) => {
  res.render("our-story");
};
export const getallFragrancesPage = (req, res) => {
  res.render("all-fragrances");
};


export default {
  getFragrancesPage,
  getunisex_fragrance,
  getfragrances_for_women,
  getfragrances_for_men,
  getcollections,
  getour_story,
  getallFragrancesPage,

};
