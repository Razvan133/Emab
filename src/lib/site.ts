/** Single source of truth for the venue's contact details. */
export const site = {
  name: 'Emab Bowling',
  city: 'Bacău',
  phone: '0746 996 666',
  phoneHref: 'tel:0746996666',
  address: 'Str. Republicii 194bis, 600303 Bacău',
  /* The exact embed URL supplied in the brief. Note its pb payload resolves to
     the generic Bacău city marker rather than the street address; swapping in
     `?q=Str.+Republicii+194bis,+600303+Bacău&output=embed&hl=ro` pins the real
     door if that is ever wanted. */
  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2729.0963385617066!2d26.9069351!3d46.5441549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b57116cb7de0eb%3A0xbcfed04705bd9f9e!2sBacău!5e0!3m2!1sro!2sro!4v1700000000000!5m2!1sro!2sro',
  // TODO: replace with the venue's real profile URLs.
  social: {
    facebook: '#',
    instagram: '#',
  },
} as const

export const navLinks = [
  { href: '#activitati', label: 'Activități' },
  { href: '#echipa', label: 'Echipa' },
  { href: '#contact', label: 'Contact' },
] as const
