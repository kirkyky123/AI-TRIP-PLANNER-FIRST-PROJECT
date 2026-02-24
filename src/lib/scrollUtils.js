const SCROLL_OFFSET = -200;

export const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
