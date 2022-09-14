// src/routes/blog/[id]/+page.js
export async function load({ params }){
    const post = await import(`../${params.id}.svx`)
    const { title, date, description } = post.metadata
    const content = post.default
  
    return {
      content,
      title,
      date,
      description,
    }
  }