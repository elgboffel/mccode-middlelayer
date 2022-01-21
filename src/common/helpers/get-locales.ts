export const getLocales = (slug: Record<string, string>) => {
  if (!slug) return null;

  return Object.entries(slug)?.reduce((prev, [key]) => {
    if (!key || !slug) return prev;

    prev.push(key);

    return prev;
  }, []);
};
