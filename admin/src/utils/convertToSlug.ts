export default function convertToSlug(Text: string) {
  return Text.toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '');
}
