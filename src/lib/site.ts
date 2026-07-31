/** Single source of truth for the venue's contact details. */
export const site = {
  name: 'Emab Bowling',
  city: 'Bacău',
  phone: '0746 996 666',
  phoneHref: 'tel:0746996666',
  address: 'Str. Republicii 194bis, 600303 Bacău',
  /* Pins the actual venue address. The originally supplied pb-encoded embed
     centred on the generic Bacău city marker, not the street address. */
  mapEmbedSrc:
    'https://www.google.com/maps?q=Str.+Republicii+194bis,+600303+Bac%C4%83u&output=embed&hl=ro',
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
