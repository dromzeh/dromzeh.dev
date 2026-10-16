import { SITE_NAME, SITE_URL } from "#shared/site";

type PageSeo = {
  title: MaybeRefOrGetter<string>;
  description: MaybeRefOrGetter<string>;
  type?: "website" | "article";
};

export function usePageSeo({ title, description, type = "website" }: PageSeo) {
  const route = useRoute();
  const url = `${SITE_URL}${route.path === "/" ? "/" : route.path.replace(/\/$/, "")}`;

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogType: type,
    ogSiteName: SITE_NAME,
    twitterCard: "summary",
    twitterTitle: title,
    twitterDescription: description,
  });
  useHead({ link: [{ rel: "canonical", href: url }] });
}
