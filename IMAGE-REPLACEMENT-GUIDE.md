# Image Replacement Guide

All pages now reference branded placeholder images. Replace these with real photography from instasculpting.com or Shari's own photo library for the production launch.

## How to Replace

1. Save the real image to the correct folder in `public/images/`
2. Use the **exact same filename** as the placeholder
3. Recommended format: `.jpg` or `.webp` at 1200px wide max, optimized for web
4. Run `pnpm build` to verify everything still works

---

## Hero Image (Homepage)

| File | Current | Replace With |
|------|---------|-------------|
| `public/images/general/hero-treatment.png` | ChatGPT-generated treatment photo | Professional photo of Shari performing a treatment (body contouring or facial) in the spa. The hero uses a 4:5 portrait crop. |

**Source on instasculpting.com:** Homepage hero slideshow has several treatment-in-progress shots (ultrasonic cavitation on abdomen, facial treatments).

---

## Service Images (16 total)

All in `public/images/services/`. Recommended size: **800×600px** (4:3 aspect).

| Filename | Service | Suggested Photo |
|----------|---------|----------------|
| `instasculpting.jpg` | InstaSculpting Body Contouring | Device in use on client, body contouring treatment in progress |
| `red-light-therapy.jpg` | Red Light Therapy | Client in red light panel or bed |
| `iv-therapy.jpg` | IV Therapy & Vitamin Infusions | IV drip setup, comfortable treatment chair |
| `medical-weight-loss.jpg` | Medical Weight Loss | Consultation or wellness-focused lifestyle shot |
| `hormone-peptide-therapy.jpg` | Hormone & Peptide Therapy | Peptide vials/products (similar to ChatGPT image right side) |
| `microneedling.jpg` | Microneedling with PRP & Exosomes | Microneedling pen on skin or PRP tubes |
| `rf-microneedling.jpg` | RF Microneedling | RF device in use, skin treatment close-up |
| `chemical-organic-peels.jpg` | Chemical & Organic Peels | Peel application on face, glowing skin result |
| `oxygen-jet-peel.jpg` | Oxygen Jet Peel | Jet peel device or facial treatment |
| `microcurrent-therapy.jpg` | Microcurrent Therapy | Microcurrent device on face |
| `hydrafacial.jpg` | HydraFacial | HydraFacial machine or treatment in progress |
| `laser-services.jpg` | Laser Services | Laser device in use |
| `body-massage.jpg` | Therapeutic Body Massage | Massage in spa environment with candles |
| `med-head-spa.jpg` | Japanese Med Head Spa | Head spa treatment, scalp therapy |
| `advanced-facials.jpg` | Advanced Facials | Facial treatment, mask application |
| `injectables.jpg` | Injectables | Injectable treatment (tasteful, not clinical) |

**Source on instasculpting.com:** Homepage has treatment photos in the slideshow. The "Learn More" page may have additional device and treatment images. The product pages show the InstaSculpting device itself.

---

## Blog Featured Images (4 total)

All in `public/images/blog/`. Recommended size: **1200×675px** (16:9 aspect).

| Filename | Blog Post | Suggested Photo |
|----------|-----------|----------------|
| `hydration-rituals.jpg` | Daily Hydration Rituals | Water, skincare products, dewy skin |
| `healing-nutrition.jpg` | Healing from Within: Nutrition | Fresh fruits, vegetables, colorful healthy food |
| `restoring-wellness.jpg` | The Science of Anti-Aging | Peaceful meditation, wellness ritual, serene environment |
| `morning-wellness.jpg` | Morning Mindfulness | Sunrise, morning routine, yoga/meditation |

**Tip:** These can be stock photos from Unsplash, Pexels, or similar — they don't need to be from instasculpting.com. Look for images matching the brand aesthetic (warm, luxurious, natural).

---

## Gallery Before/After Pairs (4 pairs, 8 images total)

All in `public/images/gallery/`. Recommended size: **600×800px** (3:4 portrait).

| Before | After | Gallery Item | Suggested Source |
|--------|-------|-------------|-----------------|
| `radiance-before.jpg` | `radiance-after.jpg` | Radiance Restoration (Facials) | Facial treatment before/after |
| `wellness-before.jpg` | `wellness-after.jpg` | Wellness Transformation (Holistic Wellness) | Overall wellness transformation |
| `age-defying-before.jpg` | `age-defying-after.jpg` | Age-Defying Refresh (Injectables) | Skin rejuvenation before/after |
| `sculpting-before.jpg` | `sculpting-after.jpg` | Holistic Sculpting (Body Contouring) | Body contouring before/after |

**Source on instasculpting.com:** The Transformations page (`instasculpting.com/pages/transformations`) has multiple before/after pairs:
- Buttocks contouring (2 sets)
- Thigh/cellulite reduction
- Arm toning
- Male abdomen sculpting

These are ideal for the "Holistic Sculpting" gallery item. Shari may also have her own client before/after photos.

---

## Additional General Images

| Filename | Location | Purpose |
|----------|----------|---------|
| `hero-branded.jpg` | `public/images/general/` | Branded fallback hero (currently unused, available if needed) |
| `about-placeholder.jpg` | `public/images/general/` | About page image (currently unused, available for About section enhancement) |

---

## Notes

- All placeholder images use the brand colors (Turquoise #00c2a2, Gold #C9A961, Dark #0f2320) so the site looks cohesive even before real photos are added
- The components already handle images gracefully — if an image path is set but the file is missing, the `<img>` tag will show a broken image. Keep the placeholders until real photos are ready.
- For InstaSculpting-specific images, Shari likely has usage rights as an authorized provider. Verify with her before using manufacturer marketing photos.
- Consider hiring a photographer for original spa photography — it makes a significant difference for a luxury brand.
