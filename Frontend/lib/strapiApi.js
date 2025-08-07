// lib/strapi.js
import qs from "qs";

export async function fetchStrapi(
  endpoint,
  { populate, tag, revalidate } = {}
) {
  const queryString = populate
    ? "?" + qs.stringify({ populate }, { encodeValuesOnly: true })
    : "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${endpoint}${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        next: {
          tags: tag ? [tag] : undefined,
          revalidate: revalidate || undefined,
        },
      }
    );

    if (!res.ok) {
      console.error(`Failed loading ${endpoint}:`, res.status);
      return null; // Or return [] depending on expected type
    }

    const json = await res.json();

    if (!json || !json.data) {
      console.warn(`No data received from ${endpoint}`);
      return null; // Or [] or {} as a fallback
    }

    return json.data;
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return null; // Prevents crash
  }
}
