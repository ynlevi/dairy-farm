import swell from "swell-js";

const options = {
  cache: true,
  useCamelCase: true,
};

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE,
  process.env.NEXT_PUBLIC_SWELL_PUBLIC_API_KEY,
  options
);
export { swell };
