{
  perSystem =
    { lib, inputs', ... }:
    let
      bun2nix = inputs'.bun2nix.packages.default;
    in
    {
      packages.quiz-site = bun2nix.mkDerivation (finalAttrs: {
        packageJson = ../quiz-app/package.json;
        src = lib.cleanSource ../quiz-app;

        bunDeps = bun2nix.fetchBunDeps {
          bunNix = "${finalAttrs.src}/bun.nix";
        };

        buildPhase = ''
          bun run build
        '';

        installPhase = ''
          cp -r dist $out
        '';
      });
    };
}
