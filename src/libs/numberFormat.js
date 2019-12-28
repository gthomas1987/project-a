export const USDFormat = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);

export const ThousandsFormat = (value) =>
  new Intl.NumberFormat('en-US', {}).format(value);