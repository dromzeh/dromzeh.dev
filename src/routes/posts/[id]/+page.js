// src/routes/blog/[id]/+page.js
export async function load({ params }) {
  const post = await import(`../${params.id}.svx`);
  const { title, date, description, tags } = post.metadata;
  const content = post.default;

  return {
    content,
    tags,
    title,
    date,
    description,
  };
}
