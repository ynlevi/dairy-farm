import swell from "swell-node";

swell.init(process.env.NEXT_PUBLIC_SWELL_STORE, process.env.SWELL_API_SECRET, {
  cache: false,
  useCamelCase: true,
});

export { swell };
