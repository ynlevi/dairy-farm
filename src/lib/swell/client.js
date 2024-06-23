import swell from "swell-js";

const options = {
  cache: false,
  useCamelCase: true,
};

swell.init(
  process.env.NEXT_PUBLIC_SWELL_STORE,
  process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY,
  options
);
export { swell };
