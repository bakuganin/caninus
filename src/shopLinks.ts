type Language = "et" | "ru" | "fi" | "en";

// UTM tags let the OralBless analytics stream attribute visits to the Caninus site.
export const shopUrl = (placement: string) =>
  `https://shop.vitadent.ee/?utm_source=caninus.ee&utm_medium=referral&utm_campaign=clinic_site&utm_content=${placement}`;

export const shopNavLabel: Record<Language, string> = { et: "E-pood", ru: "Магазин", fi: "Verkkokauppa", en: "Shop" };
