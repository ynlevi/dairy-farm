import swell from "swell-node";

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE, process.env.SWELL_SECRET_KEY, {
  cache: false,
  useCamelCase: true,
});

export { swell };
