const adjectives = ["Yellow", "Agressive", "Cheerful", "Charmful", "Tiny"];
const nouns = ["Rock", "Beaver", "Door", "Lamp", "Ink"];

export const funNameGenerator = (name: string) => {
  return (
    adjectives[Math.floor(Math.random() * adjectives.length)] +
    " " +
    name +
    " " +
    nouns[Math.floor(Math.random() * adjectives.length)]
  );
};
