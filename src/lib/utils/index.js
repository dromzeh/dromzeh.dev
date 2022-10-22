export const fetchMarkdownPosts = async () => {
    const allPostFiles =
        import.meta.glob('/src/routes/posts/*.svx')
    const iterablePostFiles = Object.entries(allPostFiles)

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const {
                metadata
            } = await resolver()
            const postPath = path.slice(11, -4)

            return {
                meta: metadata,
                path: postPath,
            }
        })
    )

    return allPosts
}