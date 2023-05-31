import { fetchMarkdownPosts } from "$lib/utils";

export const GET = async () => {
  const allPosts = await fetchMarkdownPosts();

  const sortedPosts = allPosts.sort((a, b) => {
    const getDate = (dateStr) => {
      const [day, month, year] = dateStr.split("/").map((x) => parseInt(x, 10));
      return new Date(year, month - 1, day);
    };

    const dateA = getDate(a.meta.date);
    const dateB = getDate(b.meta.date);
    return dateB - dateA;
  });

  return new Response(JSON.stringify(sortedPosts), {
    headers: {
      "content-type": "application/json",
    },
  });
};
